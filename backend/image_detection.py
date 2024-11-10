from google.cloud import vision
import io
import os
from open_ai import generate_completion

# Set up the path to your service account key JSON file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'backend/google_vision.json'

# Initialize the Vision API client
client = vision.ImageAnnotatorClient()

# Define a function to check if a name is an animal
def is_category(name):
    if "yes" in x.lower():
        print(name + " is True")
        return True
    print(name + " is False")
    return False

def detect_objects_in_image_file(image_path):
    # Read the image file
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    return detect_objects_in_image(image)

def detect_objects_in_image_base64(image_base64):
    # Construct the image request
    image_base64 = image_base64.split(",")[1]
    image = vision.Image(content=image_base64)
    return detect_objects_in_image(image)

def detect_objects_in_image(image):
    # Perform object detection
    response = client.object_localization(image=image)
    objects = response.localized_object_annotations

    # Extract and print the names and bounding boxes of detected objects
    print('Detected animal objects:')
    relevant_objects = []
    obj_names = [obj.name for obj in objects]
    relevant_names = generate_completion(prompt="For each of these objects, if it is an animal, plant, mushroom, insect or a species, add it to a comma-seperated list and return it to me. Here are the list of names: " + ", ".join(obj_names))
    for obj in objects:
        if obj.name in relevant_names:
            obj_dict = {
            'name': obj.name,
            'bounding_box': [(vertex.x, vertex.y) for vertex in obj.bounding_poly.normalized_vertices]
            }
            relevant_objects.append(obj_dict)
    # print(relevant_objects)
    return relevant_objects

# Example usage
# detect_objects_in_image('images/bird.jpeg')