import openai
import json

def load_api_key():
    with open('backend/api.json') as f:
        api_key = json.load(f)['openai_api_key']
    return api_key

# Set up your OpenAI API key
openai.api_key = load_api_key()

# Upload the training data file
response = openai.File.create(
  file=open("backend/wildlife_data.jsonl"),  # Path to your training data file
  purpose='fine-tune'  # Specify purpose as 'fine-tune'
)

# Get the uploaded file ID (you will use this to fine-tune)
file_id = response['id']
print(f"File uploaded successfully. File ID: {file_id}")
