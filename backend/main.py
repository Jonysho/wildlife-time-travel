from flask import Flask, request, jsonify
from image_detection import detect_objects_in_image_base64
from gbif import get_species

app = Flask(__name__)

@app.route("/api/test")
def test():
    return "Hello, World!"

@app.route("/api/analyse-image", methods=["POST"])
def analyse_image():
    data = request.get_json()
    print("Received POST data")

    if not data or "image" not in data:
        return jsonify({'error": "missing "image" in data'}), 400

    objects = detect_objects_in_image_base64(data["image"])
    print(objects)
    # object = ["name": cat, "key": 1, "bounding_box": [(0.1, 0.1), (0.2, 0.2)]]
    for o in objects:
        o["species"] = get_species(o["name"])

    response = {
        "objects": objects,
    }
    # print(response)
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host="localhost")
