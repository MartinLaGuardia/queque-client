import { useContext, useEffect, useState } from "react"
import { Col, Row, Container } from 'react-bootstrap';
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard"
import usersService from "../../services/users.service"
import { AuthContext } from "../../context/auth.context"
import './UserProfilePage.css'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import valgym from './../../assets/img/valgym.png'
import PlaceCard from "../../components/PlaceCard/PlaceCard";




const ProfilePage = () => {

    const [userInfo, setUserInfo] = useState({})
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            loadUserInfo()
        }
    }, [user])

    const loadUserInfo = () => {

        usersService
            .getOneUser()
            .then(({ data }) => {
                setUserInfo(data)
                console.log(data)
            })
            .catch(err => console.log(err))

    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyC_BVbN4u5QJtcEGxCAvlfc89wIeXcZjsE'
    })


    const containerStyle = {
        width: '500px',
        height: '500px'
    };




    const center = {
        lat: 40.41483,
        lng: -3.71221
    };


    return (

        <div>
            <Container>
                <Row>
                    <Col className="profilePage">

                        <div className='valgym'>
                            <img src={valgym} alt="Valeria en el Mex"></img>
                            <p><strong>Nombre: </strong> {userInfo?.username} Pereira Millán</p>
                            <p><strong>Foodie: </strong>de biberones</p>
                            <p><strong>Comida favorita: </strong> Fórmula Hero2</p>
                        </div>


                        <div className="googlemap">
                            {isLoaded && <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={15}
                            >
                                {userInfo?.favPlaces?.map(favPlace => {
                                    return (
                                        <Marker
                                            position={{
                                                lat: favPlace.address?.location?.coordinates[1],
                                                lng: favPlace?.address?.location?.coordinates[0]
                                            }}
                                        />
                                    )
                                })}

                            </GoogleMap>}

                        </div>
                    </Col>

                    <Container fluid className="cardofplaces" >
                        <Row>


                            <Row className="favPlaces">{userInfo.favPlaces?.map(favPlace => {
                                return <Col key={favPlace._id}> <PlaceCard {...favPlace} /></Col>
                            })
                            }</Row>

                        </Row>

                    </Container>

                </Row>
            </Container>

        </div >



    )


}

export default ProfilePage