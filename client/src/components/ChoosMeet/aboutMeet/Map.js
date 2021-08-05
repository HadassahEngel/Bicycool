import "./aboutMeet.css";


function Map(props) {
    const { map } = props;
    return (
        <div className="itemallmeetmap">
            {
                <div>
                    <iframe
                        className="mapmeet"
                        src={map}
                        alt=""
                    ></iframe>
                </div>

            }
        </div>
    );
}
export default Map;
