// ConfirmationPage.js
import { useLocation } from "react-router-dom";
import '../App.css';
import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent'


function ConfirmationPage() {
    const { state } = useLocation();
    const { response } = state;

    return (
        <div>
            <h2>Payment Confirmation</h2>
            <p><strong>Reference ID:</strong> {response.paymentReferenceId}</p>
            <p><strong>Status:</strong> {response.paymentStatus}</p>
            {response.paymentStatusReason && (
                <p><strong>Status Reason:</strong> {response.paymentStatusReason}</p>
            )}
        </div>
    );
}

export default ConfirmationPage;