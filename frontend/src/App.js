import './App.css';
import Map from './Map';
import ImageInput from './ImageInput';
import Info from './Info';


function App() {
    return (
        <div className="App" style={{ height: '100vh', width: '100vw' }}>
            <ImageInput />
            <Info />
            <Map />
        </div>
    );
}

export default App;
