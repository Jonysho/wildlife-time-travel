from google.cloud import vision
import io
import os
import nltk
from nltk.corpus import wordnet

# Download the wordnet data
nltk.download('wordnet')

# Set up the path to your service account key JSON file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'backend/google_vision.json'

# Initialize the Vision API client
client = vision.ImageAnnotatorClient()

# Define a function to check if a name is an animal
def is_category(name):
    synsets = wordnet.synsets(name)
    words_to_check = ['animal', 'species', 'plant', 'tree', 'insect']
    for synset in synsets:
        for word in words_to_check:
            if word in synset.definition():
                return True
    return False

def detect_objects_in_image_file(image_path):
    # Read the image file
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
    
    # Construct the image request
    image = vision.Image(content=content)

    return detect_objects_in_image(image)

def detect_objects_in_image_base64(image_base64):
    # Construct the image request
    image = vision.Image(content=image_base64)

    return detect_objects_in_image(image)

def detect_objects_in_image(image):
    # Perform object detection
    response = client.object_localization(image=image)
    objects = response.localized_object_annotations

    # Extract and print the names and bounding boxes of detected objects
    print('Detected animal objects:')
    relevant_objects = []
    for obj in objects:
        if is_category(obj.name):
            obj_dict = {
            'name': obj.name,
            'bounding_box': [(vertex.x, vertex.y) for vertex in obj.bounding_poly.normalized_vertices]
            }
            relevant_objects.append(obj_dict)
    # print(relevant_objects)
    return relevant_objects

# Example usage
# detect_objects_in_image('images/bird.jpeg')