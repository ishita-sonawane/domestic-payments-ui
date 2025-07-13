import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function DomesticPaymentForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialFormData = location.state?.formData;

    const [form, setForm] = useState({
        paymentReference: "",
        beneficiaryId: "",
        paymentAmount: "",
        customerId: "",
        payeeAccountNumber: "",
        paymentMethod: "",
        paymentType: "",
        paymentScheduleDate: "",
        recurringPaymentDay: "",
        recurringPaymentMonth: "",
        recurringPaymentEndDate: "",
        recurringPaymentNumber: "",
        paymentMode: "IMMEDIATE"
    });

    // Apply pre-filled data on first render
    useEffect(() => {
        if (initialFormData) {
            setForm({ ...form, ...initialFormData });
        }
    }, [initialFormData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePaymentModeChange = (e) => {
        const mode = e.target.value;
        setForm((prev) => ({
            ...prev,
            paymentType: mode,
            paymentMode: mode,
            ...(mode === "IMMEDIATE" && {
                paymentScheduleDate: "",
                recurringPaymentDay: "",
                recurringPaymentMonth: "",
                recurringPaymentEndDate: "",
                recurringPaymentNumber: ""
            }),
            ...(mode === "SCHEDULED" && {
                recurringPaymentDay: "",
                recurringPaymentMonth: "",
                recurringPaymentEndDate: "",
                recurringPaymentNumber: ""
            }),
            ...(mode === "RECURRING" && {
                paymentScheduleDate: ""
            })
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.paymentType === "RECURRING") {
            const hasEndDate = !!form.recurringPaymentEndDate;
            const hasNumber = !!form.recurringPaymentNumber;

            if ((hasEndDate && hasNumber) || (!hasEndDate && !hasNumber)) {
                alert("Please specify either Recurring End Date OR Number of Recurring Payments — not both.");
                return;
            }
        }

        navigate("/review", { state: { formData: form } });
    };

    return (
        <div style={{ maxWidth: 500, margin: "auto" }}>
            <h2>Domestic Payment Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields */}

                <div>
                    <label>Beneficiary ID</label>
                    <input type="text" name="beneficiaryId" value={form.beneficiaryId} onChange={handleChange} required />
                </div>
                <div>
                    <label>Payment Amount</label>
                    <input type="number" name="paymentAmount" value={form.paymentAmount} onChange={handleChange} step="0.01" required />
                </div>
                <div>
                    <label>Customer ID</label>
                    <input type="text" name="customerId" value={form.customerId} onChange={handleChange} required />
                </div>
                <div>
                    <label>Payee Account Number</label>
                    <input type="text" name="payeeAccountNumber" value={form.payeeAccountNumber} onChange={handleChange} required />
                </div>
                <div>
                    <label>Payment Method</label>
                    <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
                        <option value="" disabled>Select method</option>
                        <option value="INTERNET_BANKING">INTERNET_BANKING</option>
                        <option value="UPI">UPI</option>
                        <option value="ONLINE_BANKING">ONLINE_BANKING</option>
                    </select>
                </div>

                {/* Payment Type */}
                <div>
                    <label>Select Payment Type:</label>
                    <div>
                        <label>
                            <input type="radio" name="paymentType" value="IMMEDIATE" checked={form.paymentType === "IMMEDIATE"} onChange={handlePaymentModeChange} />
                            Immediate Payment
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="paymentType" value="SCHEDULED" checked={form.paymentType === "SCHEDULED"} onChange={handlePaymentModeChange} />
                            Scheduled Payment
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="paymentType" value="RECURRING" checked={form.paymentType === "RECURRING"} onChange={handlePaymentModeChange} />
                            Recurring Payment
                        </label>
                    </div>
                </div>

                {/* Conditional Inputs */}
                {form.paymentMode === "SCHEDULED" && (
                    <div>
                        <label>Schedule Date & Time</label>
                        <input type="datetime-local" name="paymentScheduleDate" value={form.paymentScheduleDate} onChange={handleChange} />
                    </div>
                )}

                {form.paymentMode === "RECURRING" && (
                    <>
                        <div>
                            <label>Recurring Day</label>
                            <input type="number" name="recurringPaymentDay" value={form.recurringPaymentDay} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Recurring Month</label>
                            <input type="text" name="recurringPaymentMonth" value={form.recurringPaymentMonth} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Recurring End Date</label>
                            <input type="date" name="recurringPaymentEndDate" value={form.recurringPaymentEndDate} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Number of Recurring Payments</label>
                            <input type="number" name="recurringPaymentNumber" value={form.recurringPaymentNumber} onChange={handleChange} />
                        </div>
                        <div style={{ fontSize: "0.9em", color: "#666", marginTop: 8 }}>
                            <em>Please provide either an End Date or Number of Payments. Not both.</em>
                        </div>

                    </>
                )}
                <div>
                    <label>Payment Reference</label>
                    <input type="text" name="paymentReference" value={form.paymentReference} onChange={handleChange} pattern="^[a-zA-Z0-9]{1,30}$" />
                </div>
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
}

export default DomesticPaymentForm;