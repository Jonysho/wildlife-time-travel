import React, { useState, useEffect, useRef } from 'react';


const ImageInput = () => {
    const testData = [{ 'name': 'Flower', 'bounding_box': [[0.0927734375, 0.166015625], [0.94140625, 0.166015625], [0.94140625, 0.65625], [0.0927734375, 0.65625]] }];

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const imgRef = useRef(null);
    const [data, setData] = useState(testData);
    // const containerRef = useRef(null);

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
        if (image && imgRef.current) {
            const imgElement = imgRef.current;
            imgElement.onload = () => {
                // setData(testData);
                // return;
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
                        console.error("Error:", error); // Handle any errors
                    })
                    .finally(() => {
                        console.log("Request completed."); // Runs regardless of success or error
                    });
                // const container = containerRef.current;
                // container.innerHTML = ''; // Clear previous bounding boxes
                // const data = testData;
                // console.log(data);
                // data.forEach(item => {
                //     const boundingBox = item.bounding_box;
                //     const rect = document.createElement('div');
                //     rect.style.position = 'absolute';
                //     rect.style.border = '2px solid red';
                //     rect.style.left = `${boundingBox[0][0] * imgElement.width}px`;
                //     rect.style.top = `${boundingBox[0][1] * imgElement.height}px`;
                //     rect.style.width = `${(boundingBox[2][0] - boundingBox[0][0]) * imgElement.width}px`;
                //     rect.style.height = `${(boundingBox[2][1] - boundingBox[0][1]) * imgElement.height}px`;
                //     console.log(imgElement.width, imgElement.height, boundingBox, rect.style.left, rect.style.top, rect.style.width, rect.style.height);
                //     container.appendChild(rect);
                // });
            };
            imgElement.src = image; // Ensure the image is loaded
        }

    }, [image, testData]);

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
                {image && <img ref={imgRef} src={image} alt="Uploaded" style={{ maxWidth: '300px' }} />}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {imgRef.current && data.map((objectData, i) => {
                        return <div key={i} style={{
                            left: objectData.bounding_box[0][0] * imgRef.current.width,
                            top: objectData.bounding_box[0][1] * imgRef.current.height,
                            width: (objectData.bounding_box[2][0] - objectData.bounding_box[0][0]) * imgRef.current.width,
                            height: (objectData.bounding_box[2][1] - objectData.bounding_box[0][1]) * imgRef.current.width,
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