import React, { useState, useEffect, useRef } from 'react';


const ImageInput = () => {
    // const testData = { objects: [{ 'name': 'Flower', 'bounding_box': [[0.0927734375, 0.166015625], [0.94140625, 0.166015625], [0.94140625, 0.65625], [0.0927734375, 0.65625]] }] };

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({});

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    useEffect(() => {
        if (image) {
            fetch("/api/analyse-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "image": image,
                }),
            }).then(response => {
                if (!response.ok) {
                    console.error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
                .then(data => {
                    console.log("Success:", data);
                    setData(data);
                })
                .catch(error => {
                    console.error("Error:", error);
                })
                .finally(() => {
                    console.log("Request completed.");
                });
        }

    }, [image]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            <label>
                <input type="file" onChange={handleFileChange} />
                <span>Click to select an image</span>
            </label>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                {image && <img src={image} alt="Uploaded" style={{ maxWidth: '300px' }} />}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {data.objects && data.objects.map((objectData, i) => {
                        return <div key={i} style={{
                            left: `${objectData.bounding_box[0][0] * 100}%`,
                            top: `${objectData.bounding_box[0][1] * 100}%`,
                            width: `${100.0 * (objectData.bounding_box[2][0] - objectData.bounding_box[0][0])}%`,
                            height: `${100.0 * (objectData.bounding_box[2][1] - objectData.bounding_box[0][1])}%`,
                            position: "absolute",
                            border: "2px solid red",
                        }}></div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default ImageInput;