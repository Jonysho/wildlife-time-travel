import json
import openai
import requests

def load_api_key():
    with open('backend/api.json') as f:
        api_key = json.load(f)['openai_api_key']
    return api_key

def generate_completion(prompt):
    api_key = load_api_key()

    if not api_key:
        raise ValueError("API key not found in api.json")

    client = openai.OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return completion.choices[0].message.content

def fetch_gbif_info(taxon_id):
    url = f"https://api.gbif.org/v1/species/{taxon_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None
    
def answer_prompt(prompt, context):
    api_key = load_api_key()

    if not api_key:
        raise ValueError("API key not found in api.json")

    openai.api_key = api_key

    # Fetch additional information for each ID in the context
    updated_context = {}
    for key, value in context.items():
        if isinstance(value, str) and value.isdigit():
            gbif_info = fetch_gbif_info(value)
            if gbif_info:
                updated_context[key] = gbif_info
            else:
                updated_context[key] = value
        else:
            updated_context[key] = value

    context_string = ", ".join([f"{key}: {value}" for key, value in updated_context.items()])
    print(context_string)
    
    full_prompt = f"Context:\n{context_string}\n\nQuestion:\n{prompt}"

    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": full_prompt}
        ]
    )

    return completion.choices[0].message['content']
