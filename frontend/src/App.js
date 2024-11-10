import './App.css';
import Map from './Map';
import ImageInput from './ImageInput';
import Info from './Info';
import Agent from './Agent';
import { useEffect, useState } from 'react';

function getCurrentObject(data, currentObjectIndex) {
    if (data == undefined) {
        return undefined;
    }
    if (currentObjectIndex == undefined) {
        return undefined
    }
    if (data.objects == undefined) {
        return undefined;
    }
    if (data.objects.length == undefined) {
        return undefined;
    }
    if (currentObjectIndex >= data.objects.length) {
        return undefined;
    }
    return data.objects[currentObjectIndex];
}

function App() {
    const [data, setData] = useState({});
    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
    const [currentObject, setCurrentObject] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // console.log(JSON.stringify(data));
        // console.log(data);
        setCurrentObject(getCurrentObject(data, currentObjectIndex));
    }, [data, currentObjectIndex]);
    return (
        <div className="App" style={{ height: '100vh', width: '100vw', display: "flex", flexDirection: "row" }}>
            <div style={{flex: "1 1 auto", display: "flex", flexDirection: "column", width: "100%", maxWidth: "40rem"}}>
            <ImageInput data={data} setData={setData} currentObjectIndex={currentObjectIndex} setCurrentObjectIndex={setCurrentObjectIndex} loading={loading} setLoading={setLoading}/>
            <Info currentObject={currentObject} loading={loading}/>
            </div>
            <Map currentObject={currentObject}/>
            <Agent currentObject={currentObject}/>
        </div>
    );
}

export default App;
