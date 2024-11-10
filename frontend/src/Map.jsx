import React, { useEffect, useState } from 'react'
import TimeSlider from './TimeSlider'

function getImageBase64(url) {
    // Check if the image is already cached in sessionStorage
    const cachedImage = sessionStorage.getItem(url);
    if (cachedImage) {
        // If the image is cached, return it immediately
        console.log('Image fetched from sessionStorage');
        return Promise.resolve(cachedImage);
    }
    // return Promise.resolve(undefined);

    // If the image is not cached, fetch it and cache it
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                // This will fire when the Blob is read successfully
                reader.onloadend = () => {
                    const base64String = reader.result;

                    // Cache the base64 string in sessionStorage
                    sessionStorage.setItem(url, base64String);

                    resolve(base64String);  // Return the base64 string
                };

                // This will fire if the Blob fails to be read
                reader.onerror = () => {
                    reject('Error reading the Blob as base64');
                };

                // Read the Blob as a data URL (base64)
                reader.readAsDataURL(blob);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the image:', error);
        });
}


const Map = ({ currentObject }) => {
    // const [taxonKey, setTaxonKey] = useState();
    const [imageBase64, setImageBase64] = useState();
    const [startYear, setStartYear] = useState(1950);
    const [endYear, setEndYear] = useState(2020);
    const [hintText, setHintText] = useState(undefined);

    function setStartYearWrapper(y) {
        if (y < endYear) {
            setStartYear(y);
        }
    }

    function setEndYearWrapper(y) {
        if (y > startYear) {
            setEndYear(y);
        }
    }
    // useEffect(() => {
    //     if (data?.objects) {
    //         console.log(data);
    //         for (const r of data.objects[0].species.results) {
    //             for (const n of r.vernacularNames) {
    //                 console.log(n.vernacularName);
    //             }
    //             console.log("---");
    //         }
    //     }
    // }, [data]);

    useEffect(() => {

        console.log(currentObject);

        // function hintText() {
        if (currentObject == undefined) {
            setHintText("Currently displaying map of all species records as no object is selected.");
        } else {
            setHintText("Loading...");
        }

        // }
        const url = currentObject != undefined ?
            `https://api.gbif.org/v2/map/occurrence/density/0/0/0@4x.png?style=classic.point&year=${startYear},${endYear}&taxonKey=${currentObject.key}` :
            `https://api.gbif.org/v2/map/occurrence/density/0/0/0@4x.png?style=classic.point&year=${startYear},${endYear}`;
        getImageBase64(url)
            .then(imageBase64 => {
                setImageBase64(imageBase64);
                if (currentObject != undefined) {
                    setHintText(undefined);
                }
            });
    }, [startYear, endYear, currentObject]);

    return (
        <div style={{
            flex: "1 1 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%"
        }}>
            {hintText != undefined && <div style={{ flex: "0 1 auto", height: "1rem", marginLeft: "1rem" }}>
                {hintText}
            </div>}
            <div style={{
                flex: "1 1 auto",
                maxHeight: "100%",
                overflow: "hidden",
                border: "0.2rem solid hsl(193, 100%, 60%)",
                borderRadius: "0.5rem",
                backgroundColor: "hsl(193, 100%, 20%)",
                margin: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative" // Make the parent container relative for absolute positioning inside
            }}>
                <img
                    src="images/epsg3857.jpg"
                    alt="Main Image"
                    style={{
                        objectFit: "contain",
                        maxHeight: "100%",
                        maxWidth: "100%"
                    }}
                />

                {/* Overlay Image */}
                {imageBase64 && (
                    <img
                        src={imageBase64}
                        alt="Overlay Image"
                        style={{
                            position: "absolute", // Position the overlay image on top of the main image
                            top: "0",
                            left: "0",
                            width: "100%", // Adjust the width and height as needed
                            height: "100%",
                            objectFit: "contain", // Maintain aspect ratio
                            pointerEvents: "none" // Ensure the overlay image doesn't block interactions with the underlying image
                        }}
                    />
                )}
            </div>
            <TimeSlider startYear={startYear} endYear={endYear} setStartYear={setStartYearWrapper} setEndYear={setEndYearWrapper} />
        </div>

        // <div style={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
        //     {/* <input type="checkbox" name="map-enabled" id="map-enabled input" /> */}
        //     <div style={{
        //         flex: "1 1 auto",
        //         maxHeight: "100%",
        //         overflow: "hidden",
        //         border: "0.2rem solid hsl(193, 100%, 60%)",
        //         borderRadius: "0.5rem",
        //         backgroundColor: "hsl(193, 100%, 20%)",
        //         margin: "1rem",
        //         display: "flex",
        //         justifyContent: "center", alignItems: "center",
        //     }}>
        //         {imageBase64 && <img src={imageBase64} alt="" style={{
        //             objectFit: "contain",
        //             maxHeight: "100%",
        //             maxWidth: "100%",
        //             // position: "absolute",
        //             // top: "50%",
        //             // left: "50%",
        //             // transform: "translate(-50%, -50%)"

        //             // maxHeight: "100px",
        //         }} />}</div>
        //     <TimeSlider year={year} setYear={setYear} />
        // </div>
    )
}

export default Map