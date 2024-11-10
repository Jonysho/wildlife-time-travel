import './App.css';
import Map from './Map';
import ImageInput from './ImageInput';
import Info from './Info';
import { useState } from 'react';


function App() {
    const [data, setData] = useState({});
    return (
        <div className="App" style={{ height: '100vh', width: '100vw', display: "flex", flexDirection: "row" }}>
            <div style={{flex: "1 1 auto", display: "flex", flexDirection: "column", width: "100%"}}>
            <ImageInput data={data} setData={setData}/>
            <Info />
            </div>
            <Map data={data}/>
        </div>
    );
}

export default App;
