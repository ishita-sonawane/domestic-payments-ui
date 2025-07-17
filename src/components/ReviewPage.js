import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent'

function ReviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData;

    if (!formData) {
        return <div>No payment data available for review.</div>;
    }

    const handleConfirm = async () => {
        console.log("Submitting payment with data:", JSON.stringify(formData));
        try {
            const response = await fetch("http://localhost:8080/api/domestic-payments", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKU1V6STFOaUo5LmV5SnpkV0lpT2lKMWMyVnlMVEV5TXlJc0luVnpaWEp1WVcxbElqb2lZV1J0YVc0aUxDSmxiV0ZwYkNJNkltRmtiV2x1UUdWNFlXMXdiR1V1WTI5dElpd2ljbTlzWlNJNkltRmtiV2x1SWl3aWFXRjBJam94TnpVeU16SXdNVFEzTENKbGVIQWlPakUzTlRJek1qTTNORGQ5LmVKZDFlTXJyd25yWGpuZ0cycm05TUxTZTdqc1hMb2YtTXQzVTVheUlRM181d2x0X09pUHlham5LemJRNXd1MkZQdFVpbDhleEdraFZwR29RblRPVjFKeVU2Wmtkd0ZrRGVUamk0NTVaNUtoTTlQNzRGeHdxRFdjTGpsOGczSWpoT0NLc3E0VWR6alBIMTkzSXRHVEFBWTdOUFJYRHhjSWx3U2NnOEtDeWhNcHgxLVotS1hSN2V4VzUweTJ6UmtwNlV1ZzVUY1oyNlBEMjFxZ1hscGJVcWtGVE42UUkzeVdJdTFyc3QwSmhBTWtuVXNKM204d2RsUmpHdENES0t2aU5uWjR6N0RhUUdYeHJtaXIxRFdBVjR4S3NUNFBNanFWMnpvZWNOd1ZvUEtVcFVaZFpzNUt5bTdydlFiQ3pyVldMV25kYWlaTnhsUHJGdGtBVnZDQ2JwUQ==" },


                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "Payment submission failed");
            }

            const result = await response.json();
            navigate("/confirmation", { state: { response: result } });
        } catch (error) {
            alert("Failed to confirm payment: " + error.message);
        }
    };

    const handleEdit = () => {
        navigate("/", { state: { formData } });
    };

    return (
        <div style={{ maxWidth: 600, margin: "auto" }}>
            <h2>Review Domestic Payment Details</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                {Object.entries(formData).map(([key, value]) => (
                    <tr key={key}>
                        <td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                        </td>
                        <td style={{ padding: "8px", border: "1px solid #ccc" }}>{value || "—"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                    onClick={handleConfirm}
                    style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
                >
                    Confirm Payment
                </button>

                <button
                    onClick={handleEdit}
                    style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", cursor: "pointer" }}
                >
                    Edit Payment
                </button>
            </div>
        </div>
    );
}

export default ReviewPage;