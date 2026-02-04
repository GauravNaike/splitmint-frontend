import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function GroupBalances() {
    const { groupId } = useParams();

    const [balances, setBalances] = useState([]);
    const [participantsMap, setParticipantsMap] = useState({});

    useEffect(() => {
        loadData();
    }, [groupId]);

    const loadData = async () => {
        try {
            // 1️⃣ Load participants
            const groupRes = await api.get(`/groups/${groupId}`);
            const map = {};
            groupRes.data.participants.forEach((p) => {
                map[p.id] = p.name;
            });
            setParticipantsMap(map);

            // 2️⃣ Load balances
            const balancesRes = await api.get(`/groups/${groupId}/balances`);
            setBalances(balancesRes.data);
        } catch (err) {
            console.error("Failed to load balances", err);
        }
    };

    return (
        <div>
            <h2>Balances</h2>

            {balances.length === 0 ? (
                <p className="empty-text">No balances available</p>
            ) : (
                <ul className="group-list">
                    {balances.map((b, index) => (
                        <li key={index}>
                            <strong>
                                {participantsMap[b.participantId] || "Unknown"}
                            </strong>{" "}
                            : ₹{b.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
