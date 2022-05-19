import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import PlaceListPage from '../pages/PlaceListPage/PlaceListPage'
import PlaceDetailPage from '../pages/PlaceDetailPage/PlaceDetailPage'
import PlaceEditPage from '../pages/PlacesEditPage/PlaceEditPage'
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage'



const AppRoutes = () => {

    return (
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/placelist" element={<PlaceListPage />} />
            <Route path="/placedetail/:idPlace" element={<PlaceDetailPage />} />
            <Route path="/:id/edit-places" element={<PlaceEditPage />} />
            <Route path="/myprofile" element={<UserProfilePage />} />

        </Routes>
    )
}

export default AppRoutes

