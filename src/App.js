// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DomesticPaymentForm from "./components/DomesticPaymentForm";
import ReviewPage from "./components/ReviewPage";
import ConfirmationPage from "./components/ConfirmationPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/landing" element={<LandingPage/>} />
                <Route path="/domesticpayment" element={<DomesticPaymentForm/>} />
                <Route path="/review" element={<ReviewPage/>} />
                <Route path="/confirmation" element={<ConfirmationPage/>} />

            </Routes>
        </Router>
    );
}

export default App;