// TimeSlider
const TimeSlider = ({ year, setYear }) => {
    return (
        <div style={{display: "flex", backgroundColor: "hsl(193, 100%, 60%)", flex:"0 1 auto", flexDirection: "row", padding: "1.5rem", margin: "1rem", borderRadius: "0.5rem"}}>
            <input style={{ flex: "1 1 auto" }} onChange={(e) => {
                setYear(e.target.value);
            }} type="range" min="1800" max="2023" step="10" value={year} /><span style={{ flex: "0 1 auto", marginLeft: "1rem" }}>{year}</span></div>
    );
};

export default TimeSlider;