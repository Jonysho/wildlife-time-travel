from flask import Flask, request, jsonify
from image_detection import detect_objects_in_image_base64
from gbif import get_species
from agent import answer_prompt
import requests

app = Flask(__name__)

@app.route("/api/analyse-image", methods=["POST"])
def analyse_image():
    data = request.get_json()
    print("Received POST data")

    if not data or "image" not in data:
        return jsonify({'error": "missing "image" in data'}), 400

    objects = detect_objects_in_image_base64(data["image"])

    for o in objects:
        res = requests.get(f"https://api.inaturalist.org/v1/taxa/autocomplete?q={o["name"]}")
        r = res.json()["results"]
        if len(r) > 0:
            o["sci_name"] = r[0]["name"]
            res2 = requests.get(f"https://api.gbif.org/v1/species/search?q={requests.utils.quote(o["sci_name"])}&limit=5")
            r2 = res2.json()["results"]
            if len(r2) > 0:
                o["species"] = r2[0]

    objects.sort(key=lambda x: x["key"], reverse=True)
    # object = ["name": cat, "key": 1, "bounding_box": [(0.1, 0.1), (0.2, 0.2)]]
    seen_boxes=set()
    return_objects = []
    seen_objects = {}
    for o in objects:
        if o["bounding_box"][0] not in seen_boxes:
            if o["name"] not in seen_objects:
                # o["species"] = get_species(o["key"])
                prompt = """You are an expert in the field of biology with access to comprehensive databases 
                and resources. Give me a description in 30 words max, understandable by people of all ages, for the object: """
                o["desc"] = answer_prompt((prompt+o["name"]), o["species"])
                seen_objects[o["name"]] = o
            else:
                species, desc = seen_objects[o["name"]]["species"], seen_objects[o["name"]]["desc"]
                o["species"] = species
                o["desc"] = desc
            return_objects.append(o)
            seen_boxes.add(o["bounding_box"][0])
    
    response = {
        "objects": return_objects,
    }
    return jsonify(response), 200

@app.route("/api/agent", methods=["POST"])
def agent():
    data = request.get_json()

    if not data or "prompt" not in data:
        return jsonify({'error": "missing "prompt'}), 400

    response = answer_prompt(data["prompt"], data["context"])
    print(response)
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host="localhost")
