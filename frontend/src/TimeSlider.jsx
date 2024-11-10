// TimeSlider
const TimeSlider = ({ startYear, setStartYear, endYear, setEndYear }) => {
    return (
        <div style={{ display: "flex", backgroundColor: "hsl(193, 100%, 60%)", flex: "0 1 auto", flexDirection: "column", padding: "1.5rem", margin: "1rem", borderRadius: "0.5rem" }}>
            <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "row", }}>
                <input style={{ flex: "1 1 auto" }} onChange={(e) => {
                    setStartYear(e.target.value);
                }} type="range" min="1800" max="2023" step="10" value={startYear} /><span style={{ flex: "0 1 auto", marginLeft: "1rem" }}>Start year: {startYear}</span></div>
            <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "row", }}><input style={{ flex: "1 1 auto" }} onChange={(e) => {
                setEndYear(e.target.value);
            }} type="range" min="1800" max="2023" step="10" value={endYear} /><span style={{ flex: "0 1 auto", marginLeft: "1rem" }}>End year: {endYear}</span></div></div>
    );
};

export default TimeSlider;