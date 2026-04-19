import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function RegisterForm() {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        college: "",
        address: "",
        extra: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/api/register", {
                ...formData,
                eventId: id
            });

            alert("Registered Successfully!");
        } catch (err) {
            console.error(err);
            alert("Error registering");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Event Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-3">

                <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-2 rounded" />

                <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />

                <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2 rounded" />

                <input name="department" placeholder="Department" onChange={handleChange} className="w-full border p-2 rounded" />

                <input name="year" placeholder="Year (e.g. 2nd Year)" onChange={handleChange} className="w-full border p-2 rounded" />

                <input name="college" placeholder="College Name" onChange={handleChange} className="w-full border p-2 rounded" />

                <textarea name="address" placeholder="Address" onChange={handleChange} className="w-full border p-2 rounded" />

                <textarea name="extra" placeholder="Any extra info (optional)" onChange={handleChange} className="w-full border p-2 rounded" />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Submit Registration
                </button>
            </form>
        </div>
    );
}