import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSettlements } from "../api/settlements";
import api from "../api/axios";

export default function GroupSettlements() {
    const { groupId } = useParams();

    const [settlements, setSettlements] = useState([]);
    const [participantsMap, setParticipantsMap] = useState({});

    useEffect(() => {
        loadParticipants();
        loadSettlements();
        // eslint-disable-next-line
    }, [groupId]);

    // 🔹 Load participants and create id -> name map
    const loadParticipants = async () => {
        try {
            const res = await api.get(`/groups/${groupId}`);
            const map = {};

            (res.data.participants || []).forEach((p) => {
                map[p.id] = p.name;
            });

            setParticipantsMap(map);
        } catch (err) {
            console.error("Failed to load participants", err);
        }
    };

    // 🔹 Load settlements
    const loadSettlements = async () => {
        try {
            const res = await getSettlements(groupId);
            setSettlements(res.data || []);
        } catch (err) {
            console.error("Failed to load settlements", err);
        }
    };

    return (
        <div className="page-center">
            <div className="card">
                <h2 className="section-title">Settlements</h2>

                {settlements.length === 0 ? (
                    <p className="muted-text">No settlements yet</p>
                ) : (
                    <ul className="list">
                        {settlements.map((s, index) => {
                            // ✅ SAFE ID RESOLUTION (NO CRASH POSSIBLE)
                            const fromId =
                                s.fromParticipantId ||
                                s.fromId ||
                                s.payerId ||
                                s.from;

                            const toId =
                                s.toParticipantId ||
                                s.toId ||
                                s.receiverId ||
                                s.to;

                            return (
                                <li key={index} className="list-item">
                                    <strong>
                                        {participantsMap[fromId] ?? "Unknown"}
                                    </strong>{" "}
                                    pays{" "}
                                    <strong>
                                        {participantsMap[toId] ?? "Unknown"}
                                    </strong>{" "}
                                    ₹{s.amount}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <button
                    className="primary-btn"
                    style={{ marginTop: "16px" }}
                >
                    Settle All
                </button>
            </div>
        </div>
    );
}
