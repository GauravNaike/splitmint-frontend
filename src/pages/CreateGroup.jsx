// src/pages/CreateGroup.jsx
import { useState } from "react";
import { createGroup } from "../api/groups";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createGroup(name);
        navigate("/");
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Create Group</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Group name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button>Create</button>
            </form>
        </div>
    );
}
