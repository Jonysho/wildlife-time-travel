from flask import Flask, request, jsonify
from image_detection import detect_objects_in_image_base64
from gbif import get_species

app = Flask(__name__)

# API endpoint for GET and POST requests
@app.route("/analyse-image", methods=["POST"])
def analyse_image():
    # if request.method == "GET":
    #     # Respond to GET request
    #     response = {"message": "GET request received at /api/data"}
    #     return jsonify(response)
    
    # elif request.method == "POST":
        # Get JSON data from request body
    
    data = request.get_json()
    # Log received data
    print("Received POST data:", data)

    if "image" not in data:
        print("image not in data")
        response = {
            "error": "image not in data",
        }
    
    objects = detect_objects_in_image_base64(data["image"])
    for o in objects:
        o["species"] = get_species(o["name"])
    
    # Respond to POST request
    response = {
        "obejcts": objects,
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(host="localhost", port=5000)
