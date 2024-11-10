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
    return Promise.resolve(undefined);

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


const Map = ({ data }) => {
    // const [taxonKey, setTaxonKey] = useState();
    const [imageBase64, setImageBase64] = useState();
    const [year, setYear] = useState(2000);
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
        getImageBase64(`https://api.gbif.org/v2/map/occurrence/density/0/0/0@4x.png?style=classic.point&year=${year}`)
            .then(imageBase64 => {
                setImageBase64(imageBase64);
            });
    }, [year]);

    return (
        <div style={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column" }}>
            {/* <input type="checkbox" name="map-enabled" id="map-enabled input" /> */}
            <div style={{
                flex: "1 1 auto",
            }}>
            {imageBase64 && <img src={imageBase64} alt="" style={{
                objectFit: "contain",
                maxHeight: "100%",
                maxWidth: "100%",
            }} />}</div>
            <TimeSlider year={year} setYear={setYear} />
        </div>
    )
}

export default Map