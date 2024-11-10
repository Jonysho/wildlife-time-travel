import json
from openai import OpenAI

def generate_completion(prompt):
    # Load API key from open_api.json
    with open('backend/open_api.json') as f:
        api_key = json.load(f)['api_key']

    # Initialize OpenAI client with the API key
    client = OpenAI(api_key=api_key)

    # Create a completion
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    # Return the completion
    return completion.choices[0].message.content

# Example usage
# prompt = "write a haiku about ai"
# print(generate_completion(prompt))
