import './App.css';
import Map from './Map';
import ImageInput from './ImageInput';
import Info from './Info';
import { useEffect, useState } from 'react';


function App() {
    const [data, setData] = useState({});
    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
    useEffect(() => {
        // console.log(JSON.stringify(data));
        console.log(data);
    }, [data]);
    return (
        <div className="App" style={{ height: '100vh', width: '100vw', display: "flex", flexDirection: "row" }}>
            <div style={{flex: "1 1 auto", display: "flex", flexDirection: "column", width: "100%", maxWidth: "40rem"}}>
            <ImageInput data={data} setData={setData} currentObjectIndex={currentObjectIndex} setCurrentObjectIndex={setCurrentObjectIndex}/>
            <Info data={data} currentObjectIndex={currentObjectIndex}/>
            </div>
            <Map data={data}/>
        </div>
    );
}

export default App;
