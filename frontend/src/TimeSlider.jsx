// TimeSlider
const TimeSlider = ({ year, setYear }) => {
    return (
        <div style={{display: "flex", flex:"1 1 auto", width: "100%", flexDirection: "row"}}>
            <input style={{ width: "100%", flex: "1 1 auto" }} onChange={(e) => {
                setYear(e.target.value);
            }} type="range" min="1500" max="2023" value={year} />{year}</div>
    );
};

export default TimeSlider;