from google.cloud import vision
import io
import os
import nltk
from nltk.corpus import wordnet

# Download the wordnet data
nltk.download('wordnet')

# Set up the path to your service account key JSON file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'google_vision.json'

# Initialize the Vision API client
client = vision.ImageAnnotatorClient()

# Define a function to check if a name is an animal
def is_animal(name):
    synsets = wordnet.synsets(name)
    for synset in synsets:
        if 'animal' in synset.lexname():
            return True
    return False

def detect_objects_in_image(image_path):
    # Read the image file
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
    
    # Construct the image request
    image = vision.Image(content=content)
    
    # Perform object detection
    response = client.object_localization(image=image)
    print(response)
    objects = response.localized_object_annotations

    label_response = client.label_detection(image=image)
    print(label_response)
    labels = label_response.label_annotations

    # Extract and print the names and bounding boxes of detected objects
    print('Detected animal objects:')
    for obj in objects:
        if is_animal(obj.name):
            print(f"Name: {obj.name}, Score: {obj.score}")
            print('Bounding box:')
            for vertex in obj.bounding_poly.normalized_vertices:
                print(f" - ({vertex.x}, {vertex.y})")

# Example usage
detect_objects_in_image('images/lion.jpeg')