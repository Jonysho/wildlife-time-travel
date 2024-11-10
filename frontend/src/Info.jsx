import React, { useState } from 'react';

// Info
const Info = ({ currentObject, loading }) => {
    // const [name, setName] = useState(null);
    // const [description, setDescription] = useState('');

    return (
        <div className='vbox'>
            <h2>Animal/Plant Information</h2>
            <div>
                {currentObject != undefined ? <>
                    {/* <p>Object Number: {currentObjectIndex}</p> */}
                    <p style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
                        Identified as: {currentObject.name}
                    </p>
                    <p>Description: {currentObject.desc} </p>
                    <p>Kingdom: {currentObject.species.kingdom || "N/A"}</p>
                    <p>Phylum: {currentObject.species.phylum || "N/A"}</p>
                    <p>Order: {currentObject.species.order || "N/A"}</p>
                    <p>Family: {currentObject.species.family || "N/A"}</p>
                    <p>Genus: {currentObject.species.genus || "N/A"}</p>
                    <p>Species: {currentObject.species.species || "N/A"}</p>
                {/* </> : <p>Please click on one of the objects or upload a different image.</p>} */}
                </> : loading ? <p>Loading...</p>: <p>Please select an object or upload another image.</p>}
            </div>
        </div>
    );
};

export default Info;