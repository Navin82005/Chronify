import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

// import "./Error401.scss";

const Error401 = () => {
    return (
        <div className="error-container">
            <h1>403</h1>
            <p>Access not granted</p>
            <p>Error in Authenticating</p>
            <Link to="/" className="back-to-home-link">
                <FontAwesomeIcon icon={faArrowLeftLong} /> Back To Home
            </Link>
        </div>
    );
};

export default Error401;
