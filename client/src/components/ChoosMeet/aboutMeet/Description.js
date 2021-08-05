
import "./aboutMeet.css";


function Description(props) {
    const { description } = props;



    return (
        <div className="itemallmeet">
            {

                <div>
                    <p className="itemallmeetp">{description}</p>
                </div>


            }
        </div>
    );
}
export default Description;
