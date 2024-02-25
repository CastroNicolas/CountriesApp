import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '../Pages/Landing/LandingPage';
import { HomePage } from '../Pages/Home/HomePage';
import { CountryDetail } from '../Pages/Detail/CountryDetail';
import { ActivityPage } from '../Pages/Activity/ActivityPage';
import Activities from '../Pages/Activity/Activities';

export const CountriesRouter = () => {
    return (
        <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/country/:id" element={<CountryDetail />} />
                    <Route path="/activity" element={<ActivityPage />} />
                    <Route path="/activities" element={<Activities />} />
                </Routes>

        </div>
    )
}
