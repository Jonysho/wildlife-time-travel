import React, { useState } from 'react';

// Info
const Info = ({ data, currentObjectIndex }) => {
    // const [name, setName] = useState(null);
    // const [description, setDescription] = useState('');

    return (
        <div className='vbox'>
            <h2>Animal/Plant Information</h2>
            <div>
                {currentObjectIndex != undefined && data?.objects && data.objects.length > 0 ? <>
                    {/* <p>Object Number: {currentObjectIndex}</p> */}
                    <p style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
                        Identified as: {data.objects[currentObjectIndex].name}
                    </p>
                    <p>Description: {data.objects[currentObjectIndex].desc} </p>
                    <p>Kingdom: {data.objects[currentObjectIndex].species.kingdom || "N/A"}</p>
                    <p>Phylum: {data.objects[currentObjectIndex].species.phylum || "N/A"}</p>
                    <p>Order: {data.objects[currentObjectIndex].species.order || "N/A"}</p>
                    <p>Family: {data.objects[currentObjectIndex].species.family || "N/A"}</p>
                    <p>Genus: {data.objects[currentObjectIndex].species.genus || "N/A"}</p>
                    <p>Species: {data.objects[currentObjectIndex].species.species || "N/A"}</p>
                </> : data?.objects && data.objects.length > 0 ? <p> Please click on one of the objects</p> : <p> No objects detected</p>}
            </div>
        </div>
    );
};

export default Info;