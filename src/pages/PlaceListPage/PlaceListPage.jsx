import './PlaceListPage.css'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceList from '../../components/PlaceList/PlaceList'
import NewPlaceForm from '../../components/NewPlaceForm/NewPlaceForm'
import { useContext, useEffect, useState } from 'react'
import placesService from '../../services/places.service'
import { AuthContext } from '../../context/auth.context'


const PlaceListPage = () => {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        loadPlaces()
    }, [])

    const loadPlaces = () => {

        placesService
            .getAllPlaces()
            .then(({ data }) => setPlaces(data))
            .catch(err => console.log(err))
    }

    const { user } = useContext(AuthContext)

    return (
        <Container fluid className='placecard'>
            <Row>
                {
                    user?.role === 'ADMIN' ?

                        <>
                            <Col lg={8}>

                                <PlaceList places={places} />

                            </Col>

                            <h2 className='text-create'>Crea un lugar</h2>

                            <Col className="newPlaceForm" lg={4}>
                                <NewPlaceForm loadPlaces={loadPlaces} />
                            </Col>
                        </>

                        :
                        <PlaceList places={places} />
                }
            </Row>



        </Container>
    )
}

export default PlaceListPage

