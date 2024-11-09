from google.cloud import vision
import io
import os

# Set up the path to your service account key JSON file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'google_vision.json'

# Initialize the Vision API client
client = vision.ImageAnnotatorClient()

def detect_objects_in_image(image_path):
    # Read the image file
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
    
    # Construct the image request
    image = vision.Image(content=content)
    
    # Perform object detection
    response = client.object_localization(image=image)
    objects = response.localized_object_annotations
    print(response, objects)
    # Extract and print the names of detected objects
    print('Detected objects:')
    for obj in objects:
        print(f"Name: {obj.name}, Score: {obj.score}")

# Example usage
detect_objects_in_image('ca.jpeg')