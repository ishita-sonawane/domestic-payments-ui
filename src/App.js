// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DomesticPaymentForm from "./components/DomesticPaymentForm";
import ReviewPage from "./components/ReviewPage";
import ConfirmationPage from "./components/ConfirmationPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent'



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DomesticPaymentForm/>} />

                <Route path="/login" element={<LoginPage/>} />
                <Route path="/landing" element={<LandingPage/>} />

                <Route path="/review" element={<ReviewPage/>} />
                <Route path="/confirmation" element={<ConfirmationPage/>} />

            </Routes>
        </Router>
    );
}

export default App;