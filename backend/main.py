from flask import Flask, request, jsonify
from image_detection import detect_objects_in_image_base64
from gbif import get_species
import download_nltk_data

app = Flask(__name__)
download_nltk_data()


# API endpoint for GET and POST requests
@app.route("/api/analyse-image", methods=["POST"])
def analyse_image():
    # if request.method == "GET":
    #     # Respond to GET request
    #     response = {"message": "GET request received at /api/data"}
    #     return jsonify(response)

    # elif request.method == "POST":
    # Get JSON data from request body

    data = request.get_json()
    print("Received POST data:", data)

    if not data or "image" not in data:
        return jsonify({'error": "missing "image" in data'}), 400

    objects = detect_objects_in_image_base64(data["image"])
    for o in objects:
        o["species"] = get_species(o["name"])

    response = {
        "obejcts": objects,
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host="localhost", port=5000)
