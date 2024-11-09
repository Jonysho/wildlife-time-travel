import './App.css';
import Map from './Map';
import ImageInput from './ImageInput';
import Info from './Info';

const testData = [{'name': 'Flower', 'bounding_box': [(0.0927734375, 0.166015625), (0.94140625, 0.166015625), (0.94140625, 0.65625), (0.0927734375, 0.65625)]}];

function App() {
    return (
        <div className="App" style={{ height: '100vh', width: '100vw' }}>
            <ImageInput testData={testData}/>
            <Info />
            <Map />
        </div>
    );
}

export default App;
