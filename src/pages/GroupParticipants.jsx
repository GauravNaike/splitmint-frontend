import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function GroupParticipants() {
    const { groupId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        loadParticipants();
    }, [groupId]);

    const loadParticipants = async () => {
        try {
            const res = await api.get(`/groups/${groupId}`);
            setParticipants(res.data.participants || []);
        } catch (err) {
            console.error("Failed to load participants", err);
        }
    };

    const addParticipant = async () => {
        if (!name.trim()) return;

        try {
            await api.post(`/groups/${groupId}/participants`, { name });
            setName("");
            loadParticipants();
        } catch (err) {
            alert("Failed to add participant");
        }
    };

    return (
        <div className="center-page">
            <div className="dashboard-card">
                <h2>Participants</h2>

                <div className="group-create">
                    <input
                        placeholder="Participant name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={addParticipant}>Add</button>
                </div>

                {participants.length === 0 ? (
                    <p className="empty-text">No participants yet</p>
                ) : (
                    <ul className="group-list">
                        {participants.map((p) => (
                            <li key={p.id}>{p.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
