import React from 'react'

const ApiInput = ({name}) => {
    return <>
            <input type="radio" name="api" id={`api-input${name}`} value={name} /><label htmlFor={`api-input-${name}`}>{name}</label>
    </>
}

const ImageInput = () => {
    const 
    return (
        <div>
            <input type="file" name="image" id="image-input" /><br />
            <ApiInput name="google-vision"/><br />
            <ApiInput name="plantnet"/><br />
            <ApiInput name="plant-id"/><br />
        </div>
    )
}

export default ImageInput