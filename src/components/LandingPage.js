import React from "react";
import { Link } from "react-router-dom";


function LandingPage() {
    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>Welcome!</h2>
            <p>Select an option:</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
                <Link to="/beneficiaries">🔗 Beneficiaries</Link>
            </div>
        </div>
    );
}

export default LandingPage;