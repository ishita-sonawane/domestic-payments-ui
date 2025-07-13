import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.password) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://fkqhkr418c.execute-api.us-east-1.amazonaws.com/default/create-identity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Login successful:", result);
                navigate("/landing");
            } else {
                const errorData = await response.text();
                setError(`Login failed: ${errorData}`);
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: "1rem" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;