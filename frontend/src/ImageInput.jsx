import React, { useEffect, useState } from 'react'

const ApiInput = ({ name, apiState: [api, setApi] }) => {
    return <>
        <input type="radio" name="api" id={`api-input${name}`} value={name} checked={api == name} onChange={() => {
            setApi(name);
        }} /><label htmlFor={`api-input-${name}`}>{name}</label>
    </>
}

const ImageInput = () => {
    const [api, setApi] = useState("google-vision");
    const [file, setFile] = useState();
    useEffect(() => {
        console.log(file);
    }, [file]);
    return (
        <div>
            <input type="file" name="image" id="image-input" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    // reader
                }
                console.log(e.target.result);
                if (e.target.files.length > 1) {
                    // assert("you can only upload one image");
                }
                setFile(e.target.files[0]);
            }}/><br />
            <ApiInput name="google-vision" apiState={[api, setApi]} /><br />
            <ApiInput name="plantnet" apiState={[api, setApi]} /><br />
            <ApiInput name="plant-id" apiState={[api, setApi]} /><br />
        </div>
    )
}

export default ImageInput