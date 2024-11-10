import React, { useState, useEffect, useRef } from 'react';


const ImageInput = ({ data, setData, currentObjectIndex, setCurrentObjectIndex }) => {
    // const testData = { objects: [{ 'name': 'Flower', 'bounding_box': [[0.0927734375, 0.166015625], [0.94140625, 0.166015625], [0.94140625, 0.65625], [0.0927734375, 0.65625]] }] };
    // const testData = JSON.parse(`{"objects":[{"bounding_box":[[0.0361328125,0.06396484375],[0.72265625,0.06396484375],[0.72265625,0.90234375],[0.0361328125,0.90234375]],"key":"7592486","name":"Lion"},{"bounding_box":[[0.439453125,0.453125],[0.89453125,0.453125],[0.89453125,0.75390625],[0.439453125,0.75390625]],"key":"7592486","name":"Lion"}]}`);
    const testData = JSON.parse(`{"objects":[{"bounding_box":[[0.0361328125,0.06396484375],[0.72265625,0.06396484375],[0.72265625,0.90234375],[0.0361328125,0.90234375]],"key":"2435099","name":"Lion","species":{"authorship":"(Linnaeus, 1771) ","basionym":"Felis concolor Linnaeus, 1771","basionymKey":2435104,"canonicalName":"Puma concolor","class":"Mammalia","classKey":359,"constituentKey":"7ddf754f-d193-4cc9-b351-99906754a03b","datasetKey":"d7dddbf4-2cf0-4f39-9b2a-bb099caae36c","family":"Felidae","familyKey":9703,"genus":"Puma","genusKey":2435098,"issues":[],"key":2435099,"kingdom":"Animalia","kingdomKey":1,"lastCrawled":"2023-08-22T23:20:59.545+00:00","lastInterpreted":"2023-08-22T22:19:08.700+00:00","nameKey":9541887,"nameType":"SCIENTIFIC","nomenclaturalStatus":[],"nubKey":2435099,"numDescendants":7,"order":"Carnivora","orderKey":732,"origin":"SOURCE","parent":"Puma","parentKey":2435098,"phylum":"Chordata","phylumKey":44,"publishedIn":"Mantissa Plantarum vol.2 p.266","rank":"SPECIES","remarks":"","scientificName":"Puma concolor (Linnaeus, 1771)","sourceTaxonKey":172721713,"species":"Puma concolor","speciesKey":2435099,"taxonID":"gbif:2435099","taxonomicStatus":"ACCEPTED","vernacularName":"puma"}},{"bounding_box":[[0.439453125,0.453125],[0.89453125,0.453125],[0.89453125,0.75390625],[0.439453125,0.75390625]],"key":"2435099","name":"Lion","species":{"authorship":"(Linnaeus, 1771) ","basionym":"Felis concolor Linnaeus, 1771","basionymKey":2435104,"canonicalName":"Puma concolor","class":"Mammalia","classKey":359,"constituentKey":"7ddf754f-d193-4cc9-b351-99906754a03b","datasetKey":"d7dddbf4-2cf0-4f39-9b2a-bb099caae36c","family":"Felidae","familyKey":9703,"genus":"Puma","genusKey":2435098,"issues":[],"key":2435099,"kingdom":"Animalia","kingdomKey":1,"lastCrawled":"2023-08-22T23:20:59.545+00:00","lastInterpreted":"2023-08-22T22:19:08.700+00:00","nameKey":9541887,"nameType":"SCIENTIFIC","nomenclaturalStatus":[],"nubKey":2435099,"numDescendants":7,"order":"Carnivora","orderKey":732,"origin":"SOURCE","parent":"Puma","parentKey":2435098,"phylum":"Chordata","phylumKey":44,"publishedIn":"Mantissa Plantarum vol.2 p.266","rank":"SPECIES","remarks":"","scientificName":"Puma concolor (Linnaeus, 1771)","sourceTaxonKey":172721713,"species":"Puma concolor","speciesKey":2435099,"taxonID":"gbif:2435099","taxonomicStatus":"ACCEPTED","vernacularName":"puma"}}]}`);

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Load an image from a URL when the component mounts
        const loadImageFromURL = async () => {
            try {
                const response = await fetch("images/lion.jpg");
                console.log(response);
                const blob = await response.blob();
                const initialFile = new File([blob], "default.jpg", { type: blob.type });
                setFile(initialFile);
            } catch (error) {
                console.error("Failed to load the default image:", error);
            }
        };

        loadImageFromURL();
    }, []);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("File loaded");
                setImage(e.target.result);
                console.log(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    useEffect(() => {
        setData(testData);
        return;
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
                    // console.error(response)
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
        setData({});
    };

    return (
        <div className='vbox'>
            <h2>Upload an Image</h2>
            <label style={{ backgroundColor: "hsl(193, 100%, 60%)", borderRadius: "0.5rem", paddingTop: "1rem", paddingBottom: "1rem", margin: "1rem", width: "100%", cursor: "pointer", flex: "0 1 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Click to select an image
                <input style={{ display: "none" }} type="file" onChange={handleFileChange} />
            </label><br />
            <div style={{ flex: "0 1 auto", position: "relative", display: "inline-block" }}>
                {image && <img src={image} alt="Uploaded" style={{ width: "100%", height: "100%" }} />}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {data.objects && data.objects.map((objectData, i) => {
                        return <div key={i} style={{
                            cursor: "pointer",
                            left: `${objectData.bounding_box[0][0] * 100}%`,
                            top: `${objectData.bounding_box[0][1] * 100}%`,
                            width: `${100.0 * (objectData.bounding_box[2][0] - objectData.bounding_box[0][0])}%`,
                            height: `${100.0 * (objectData.bounding_box[2][1] - objectData.bounding_box[0][1])}%`,
                            position: "absolute",
                            outline: "solid",
                            outlineWidth: currentObjectIndex == i ? "0.5rem": "0.2rem",
                            outlineColor: currentObjectIndex == i ? "lightgreen": "white",
                        }} onClick={() => {
                            setCurrentObjectIndex(i);
                        }}></div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default ImageInput;