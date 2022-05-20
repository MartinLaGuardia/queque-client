import placesService from "../../services/places.service"
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button, Image, ButtonToolbar } from 'react-bootstrap'
import CommentsByPlace from "../../components/CommentsByPlace/CommentsByPlace"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import CommentsForm from "../../components/NewCommentForm/NewCommentForm"
import { AuthContext } from '../../context/auth.context'
import usersService from "../../services/users.service"
import commentsService from "../../services/comments.service"
import btnFav from './../../assets/img/Buttons/btnFav.png'
import btnDesfav from './../../assets/img/Buttons/btnDesfav.png'
import btnEditar from './../../assets/img/Buttons/btnEditar.png'
import btnErase from './../../assets/img/Buttons/btnErase.png'
import btnVolver from './../../assets/img/Buttons/btnVolver.png'
import './PlaceDetailPage.css'


const PlaceDetailPage = () => {


    const [placesDetails, setPlacesDetails] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [comments, setComments] = useState([])

    const { isLoggedIn } = useContext(AuthContext)


    const navigate = useNavigate()
    const { idPlace } = useParams()
    const { user } = useContext(AuthContext)
    const { favPlaces } = userInfo

    useEffect(() => {
        loadPlace(idPlace)
        userDetail(user?._id)
        loadComments(idPlace)
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

    const loadComments = (id) => {

        commentsService
            .getCommentsByPlace(id)
            .then(({ data }) => setComments(data))
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
        width: '600px',
        height: '400px'
    };

    const center = {
        lat: placesDetails?.address?.location?.coordinates[1],
        lng: placesDetails?.address?.location?.coordinates[0]
    };


    return (

        <div>

            <Container className="formFrame">

                <Row>

                    <Col className="text-frame" md={{ span: 4, offset: 1 }}>
                        <h1>{placesDetails?.name}</h1>
                        <h2>Descripción: </h2>
                        <h4>{placesDetails?.description}</h4>
                        <h2>Tipo de comida: </h2>
                        <h4>{placesDetails?.foodstyle}</h4>
                        <h2>Calle: </h2>
                        <h4>{placesDetails?.address?.street}</h4>
                        <h2>Número: </h2>
                        <h4>{placesDetails?.address?.number}</h4>
                        <h2>Ciudad: </h2>
                        <h4>{placesDetails?.address?.city}</h4>
                        <h2>Zip Code: </h2>
                        <h4>{placesDetails?.address?.zipCode}</h4>
                        <h2>Teléfono: </h2>
                        <h4>{placesDetails?.phone}</h4>
                    </Col>

                    <Col className="mapit">
                        {isLoaded &&
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={18}
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

            </Container>

            <Col className="picturePlace" md={{ span: 6, offset: 6 }}>
                <img style={{ width: '600px' }} src={placesDetails?.imageURL} alt={placesDetails.name} />
            </Col>

            <Container className="btnFunction">
                <Row>
                    <Col>
                        <Link to={`/${idPlace}/edit-places`} >
                            {
                                user?.role === 'ADMIN' && <img className="btnEdit" src={btnEditar} alt="botón editar"></img>
                            }
                        </Link>
                    </Col>

                    <Col>
                        <div >
                            {
                                user?.role === 'ADMIN' && <img className="btnBorrar" src={btnErase} alt="Botón borrar" onClick={() => deletePlace(idPlace)}></img>
                            }
                        </div>
                    </Col>

                    <Col>
                        <div >
                            {
                                isLoggedIn && <img className="btnFav" src={btnFav} alt="favorito" onClick={() => addToFavs(idPlace)}></img>//<Button type="submit" value="Submit" onClick={() => addToFavs(idPlace)}>Favoritear</Button>
                            }
                        </div>
                    </Col>
                    <Col>
                        <div >
                            {
                                isLoggedIn && <img className="btnDesfavorito" src={btnDesfav} alt="Botón quitar favorito" onClick={() => deleteFav(idPlace)}></img>

                            }

                        </div>
                    </Col>
                </Row>

            </Container>

            <Col>
                <Link to="/">
                    <img className="btnGoBack" src={btnVolver} alt="botón volver"></img>
                </Link>
            </Col>

            <Container >

                {
                    favPlaces?.map(place => {
                        if (place._id === idPlace) {
                            return <>
                                <CommentsForm loadComments={loadComments} />
                                <CommentsByPlace idPlace={idPlace} comments={comments} />
                            </>
                        }
                    })
                }
            </Container>


        </div >

    )
}

export default PlaceDetailPage