import { Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage } from '../Pages/Landing/LandingPage';
import { HomePage } from '../Pages/Home/HomePage';
import { CountryDetail } from '../Pages/Detail/CountryDetail';
import { ActivityPage } from '../Pages/Activity/ActivityPage';
import { Navbar } from '../Components/NavBar/Navbar';

export const CountriesRouter = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === "/" || location.pathname.includes("/country/");

    return (
        <div>
            {!hideNavbar && <Navbar />}
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/country/:id" element={<CountryDetail />} />
                    <Route path="/Activity" element={<ActivityPage />} />
                </Routes>

        </div>
    )
}
