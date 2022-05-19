import axios from 'axios'

class PlacesService {

    constructor() {
        this.app = axios.create({ baseURL: 'http://localhost:5005/api/places' })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createOnePlace = (data) => {
        return this.app.post('/create-place', data)
    }

    getOnePlace = (id) => {
        return this.app.get(`/detail-place/${id}`)
    }

    getAllPlaces = () => {
        return this.app.get('/all-places')
    }

    addFavPlaces = (id) => {
        return this.app.put(`/${id}/save-fav-place`)
    }

    deleteFavPlace = (id) => {
        return this.app.put(`/${id}/delete-fav-place`)
    }


    getThreeRandomPlace = () => {
        return this.app.get('/random-places')
    }

    updateOnePlace = (id, placeData) => {
        return this.app.put(`/${id}/edit-place`, placeData)
    }

    deleteOnePlace = (id) => {
        return this.app.delete(`/${id}/delete-place`)
    }
}


const placesService = new PlacesService()

export default placesService