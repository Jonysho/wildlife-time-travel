from flask import Flask, request, jsonify
from image_detection import detect_objects_in_image_base64
from gbif import get_species
from download_nltk_data import download_synonyms

app = Flask(__name__)
download_synonyms()


@app.route("/api/analyse-image", methods=["POST"])
def analyse_image():
    data = request.get_json()
    print("Received POST data")

    if not data or "image" not in data:
        return jsonify({'error": "missing "image" in data'}), 400

    objects = detect_objects_in_image_base64(data["image"])
    for o in objects:
        o["species"] = get_species(o["name"])

    response = {
        "obejcts": objects,
    }
    print(response)
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host="localhost", port=5000)
