import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (err) {
      console.error("Load groups failed", err);
    }
  };

  const createGroup = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      await api.post("/groups", { name });
      setName("");
      loadGroups();
    } catch (err) {
      alert("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="dashboard-card">
        <h1>Your Groups</h1>

        <div className="group-create">
          <input
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={createGroup} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

        {groups.length === 0 ? (
          <p className="empty-text">No groups yet</p>
        ) : (
          <ul className="group-list">
            {groups.map((g) => (
              <li
                key={g.id}
                onClick={() => navigate(`/groups/${g.id}`)}
              >
                {g.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
