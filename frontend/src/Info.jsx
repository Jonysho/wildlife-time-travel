import React, { useState } from 'react';

// Info
const Info = () => {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState('');

    return (
        <div style={{flex: "1 1 auto"}}>
            <h2>Animal/Plant Information</h2>
            <div>
                <div>
                    {name ? (
                        <>
                            <h3>{name}</h3>
                            <p>{description}</p>
                        </>
                    ) : (
                        <p>Please click on one of the objects</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Info;