import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function GroupExpenses() {
    const { groupId } = useParams();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        loadParticipants();
    }, [groupId]);

    const loadParticipants = async () => {
        try {
            const res = await api.get(`/groups/${groupId}`);
            setParticipants(res.data.participants || []);
        } catch (err) {
            console.error("Failed to load participants");
        }
    };

    const addExpense = async () => {
        if (!description || !amount || !paidBy) return;

        try {
            await api.post(`/groups/${groupId}/expenses`, {
                description,
                amount,
                paidByParticipantId: paidBy,
            });

            setDescription("");
            setAmount("");
            setPaidBy("");
            alert("Expense added");
        } catch (err) {
            alert("Failed to add expense");
        }
    };

    return (
        <div className="center-page">
            <div className="dashboard-card">
                <h2>Add Expense</h2>

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    placeholder="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                >
                    <option value="">Paid by</option>
                    {participants.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <button onClick={addExpense}>Add Expense</button>
            </div>
        </div>
    );
}
