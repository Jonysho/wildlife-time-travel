import React, { useState, useEffect, useRef } from 'react';

const ImageInput = ({ testData }) => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const imgRef = useRef(null);
    const containerRef = useRef(null);

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
                const container = containerRef.current;
                container.innerHTML = ''; // Clear previous bounding boxes
                const data = testData;
                console.log(data);
                data.forEach(item => {
                    const boundingBox = item.bounding_box;
                    const rect = document.createElement('div');
                    rect.style.position = 'absolute';
                    rect.style.border = '2px solid red';
                    rect.style.left = `${boundingBox[0] * imgElement.width}px`;
                    rect.style.top = `${boundingBox[0][1] * imgElement.height}px`;
                    rect.style.width = `${(boundingBox[2][0] - boundingBox[0][0]) * imgElement.width}px`;
                    rect.style.height = `${(boundingBox[2][1] - boundingBox[0][1]) * imgElement.height}px`;
                    console.log(imgElement.width, imgElement.height, boundingBox, rect.style.left, rect.style.top, rect.style.width, rect.style.height);
                    container.appendChild(rect);
                });
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
                <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
            </div>
        </div>
    );
};

export default ImageInput;