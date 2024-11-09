# download_nltk_data.py
import nltk
import ssl
import certifi

def download_synonyms():
    # Configure SSL to use the certifi certificates
    ssl._create_default_https_context = ssl._create_unverified_context

    # Download the wordnet data
    nltk.download('wordnet')