import { Link, Outlet, useParams } from "react-router-dom";

export default function GroupDetails() {
    const { groupId } = useParams();

    return (
        <div className="center-page">
            <div className="dashboard-card">
                {/* Centered title */}
                <h1 className="page-title">Home Trip</h1>

                {/* Tabs with vertical dividers */}
                <div className="tabs">
                    <Link to={`/groups/${groupId}/participants`}>Participants</Link>
                    <div className="tab-divider" />

                    <Link to={`/groups/${groupId}/expenses`}>Expenses</Link>
                    <div className="tab-divider" />

                    <Link to={`/groups/${groupId}/balances`}>Balances</Link>
                    <div className="tab-divider" />

                    <Link to={`/groups/${groupId}/settlements`}>Settlements</Link>
                </div>

                {/* Child pages render here */}
                <Outlet />
            </div>
        </div>
    );
}
