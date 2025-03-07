# Wildlife Time Travel

Wildlife Time Travel is a web application that allows users to upload images and analyze them to detect wildlife species. The application uses machine learning models to identify species and provides detailed information about them using the GBIF API.

## Key Features  
- Dynamic map and time-slider for visualizing historical wildlife distribution and migration patterns.  
- Google Vision AI for wildlife detection in user-uploaded images.  
- Filtering and bounding boxes
- Flask backend for routing, API integration
- Session Storage Caching
- S3

## Running Instructions

1. Navigate to the backend directory and install the required Python packages:
```sh
cd backend
pip install -r requirements.txt
cd ..
cd frontend
npm install
cd ..
./frontend.sh
./backend.sh
```

[DevPost (GreatUniHack 2024)](https://devpost.com/software/wildlife-time-travel)
