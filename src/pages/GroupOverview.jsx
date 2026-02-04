import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { addParticipant } from "../api/participants";

export default function GroupOverview() {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        loadGroup();
    }, [groupId]);

    const loadGroup = async () => {
        const res = await api.get(`/groups/${groupId}`);
        setGroup(res.data);
    };

    const add = async () => {
        if (!name.trim()) return;
        await addParticipant(groupId, name);
        setName("");
        loadGroup();
    };

    if (!group) return <p>Loading...</p>;

    return (
        <div style={{ padding: 40 }}>
            <h1>{group.name}</h1>

            <nav style={{ marginBottom: 20 }}>
                <Link to={`/groups/${groupId}/expenses`}>Expenses</Link>{" | "}
                <Link to={`/groups/${groupId}/balances`}>Balances</Link>{" | "}
                <Link to={`/groups/${groupId}/settlements`}>Settlements</Link>
            </nav>

            <h3>Add Participant</h3>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <button onClick={add}>Add</button>

            <h3>Participants</h3>
            <ul>
                {group.participants.map(p => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
        </div>
    );
}
