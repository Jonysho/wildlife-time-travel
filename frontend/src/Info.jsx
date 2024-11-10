import React, { useState } from 'react';

// Info
const Info = ({ data, currentObjectIndex }) => {
    // const [name, setName] = useState(null);
    // const [description, setDescription] = useState('');

    return (
        <div className='vbox'>
            <h2>Animal/Plant Information</h2>
            <div>
                {(currentObjectIndex != undefined && data?.objects) ? <>
                    <p>Object Number: {currentObjectIndex}</p>
                    <p>Identified as: {data.objects[currentObjectIndex].name}</p>
                    <p>Kingdom: {data.objects[currentObjectIndex].species.kingdom}</p>
                    <p>Phylum: {data.objects[currentObjectIndex].species.phylum}</p>
                    <p>Order: {data.objects[currentObjectIndex].species.order}</p>
                    <p>Family: {data.objects[currentObjectIndex].species.family}</p>
                    <p>Genus: {data.objects[currentObjectIndex].species.genus}</p>
                    <p>Species: {data.objects[currentObjectIndex].species.species}</p>
                </> : <p>Please click on one of the objects</p>}
            </div>
        </div>
    );
};

export default Info;