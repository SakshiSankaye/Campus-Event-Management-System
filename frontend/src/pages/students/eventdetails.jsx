import { useParams, useNavigate } from "react-router-dom";
export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Event Details {id}</h1>
            <p>Full description here</p>
            <button onClick={() => navigate(`/register/${id}`)}>
                Register Now
            </button>
        </div>
    );
}