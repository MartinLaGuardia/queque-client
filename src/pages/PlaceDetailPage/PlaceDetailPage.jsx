import placesService from "../../services/places.service"
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button } from 'react-bootstrap'
import CommentsByPlace from "../../components/CommentsByPlace/CommentsByPlace"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import CommentsForm from "../../components/NewCommentForm/NewCommentForm"
import { AuthContext } from '../../context/auth.context'
import usersService from "../../services/users.service"

const PlaceDetailPage = () => {


    const [placesDetails, setPlacesDetails] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const { isLoggedIn } = useContext(AuthContext)


    const navigate = useNavigate()
    const { idPlace } = useParams()
    const { user } = useContext(AuthContext)
    const { favPlaces } = userInfo

    useEffect(() => {
        loadPlace(idPlace)
        userDetail(user?._id)
    }, [])

    const userDetail = (id) => {
        usersService
            .getOneUser(id)
            .then(({ data }) => {
                setUserInfo(data)
            })
            .catch(err => console.log(err))
    }


    const loadPlace = placeId => {

        placesService
            .getOnePlace(placeId)
            .then(({ data }) => {
                setPlacesDetails(data)
                console.log(data)
            })
            .catch(err => console.log(err))

    }

    const deletePlace = placeId => {

        placesService
            .deleteOnePlace(placeId)
            .then(() => navigate('/placelist'))
            .catch(err => console.log(err))

    }

    const addToFavs = idFavPlace => {

        placesService
            .addFavPlaces(idFavPlace)
            .then(() => navigate('/myprofile'))
            .catch(err => console.log(err))

    }

    const deleteFav = idFavPlace => {

        placesService
            .deleteFavPlace(idFavPlace)
            .then(() => navigate('/myprofile'))
            .catch(err => console.log(err))

    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyC_BVbN4u5QJtcEGxCAvlfc89wIeXcZjsE'
    })

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: placesDetails?.address?.location?.coordinates[1],
        lng: placesDetails?.address?.location?.coordinates[0]
    };


    return (

        <Container className="detail-form">
            <h1>{placesDetails?.name}</h1>
            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <h3>Description</h3>
                    <p>{placesDetails?.description}</p>
                    <h3>Foodstyle</h3>
                    <p>{placesDetails?.foodstyle}</p>
                    <h3>City</h3>
                    <p>{placesDetails?.address?.city}</p>
                    <h3>Street</h3>
                    <p>{placesDetails?.address?.street}</p>
                    <h3>Number</h3>
                    <p>{placesDetails?.address?.number}</p>
                    <h3>zipCode</h3>
                    <p>{placesDetails?.address?.zipCode}</p>
                    <h3>Phone</h3>
                    <p>{placesDetails?.phone}</p>
                    <h3>Location</h3>
                    <p>Longitude: {placesDetails?.longitude}</p>
                    <p>latitude: {placesDetails?.latitude}</p>
                </Col>
                <Col md={{ span: 6 }}>
                    <img style={{ width: '100%' }} src={placesDetails?.imageURL} alt={placesDetails.name} />
                </Col>
                <Link to="/placelist" className="btn">
                    <Button variant="dark">Go back!</Button>
                </Link>

                <Link to={`/${idPlace}/edit-places`} className="btn">
                    {
                        user?.role === 'ADMIN' && <Button variant="dark">Edit place</Button>
                    }
                </Link>


                <div className='place-button'>
                    {
                        user?.role === 'ADMIN' && <Button type="submit" value="Submit" onClick={() => deletePlace(idPlace)}>Delete Place</Button>
                    }
                </div>

                <div className='place-button'>
                    {
                        isLoggedIn && <Button type="submit" value="Submit" onClick={() => addToFavs(idPlace)}>Add to favs</Button>
                    }
                </div>

                <div className='place-button'>
                    {
                        isLoggedIn && <Button type="submit" value="Submit" onClick={() => deleteFav(idPlace)}>Delete fav</Button>

                    }

                </div>

                {favPlaces?.map(place => {
                    if (place._id === idPlace) {
                        return <>
                            <CommentsForm />
                            <CommentsByPlace idPlace={idPlace} />
                        </>
                    }
                })}

                <Col>
                    {isLoaded &&
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                        >
                            <Marker
                                position={{
                                    lat: placesDetails?.address?.location?.coordinates[1],
                                    lng: placesDetails?.address?.location?.coordinates[0]
                                }}
                            />
                        </GoogleMap>

                    }

                </Col>

            </Row>

        </Container >

    )
}

export default PlaceDetailPage