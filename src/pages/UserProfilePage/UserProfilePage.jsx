import { useContext, useEffect, useState } from "react"
import { Col, Row, Container, Image } from 'react-bootstrap';
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
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })


    const containerStyle = {
        width: '450px',
        height: '450px'
    };




    const center = {
        lat: 40.41483,
        lng: -3.71221
    };


    return (

        <div className="allPage">
            <Container  >
                <Row>
                    <Col className="profilePage">

                        <div className='valgym'>
                            <Image src={userInfo?.imageURL} alt="valeria" roundedCircle />
                            <div className='textProfile'>
                                <p><strong>Nombre: </strong> {userInfo?.username}</p>
                                <p><strong>Comida favorita: </strong> {userInfo.favFood}</p>
                            </div>
                        </div>


                        <div className="googlemap">
                            <Col>
                                {isLoaded && <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={12}
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
                            </Col>
                        </div>
                    </Col>

                    <h1 className="favs">Lugares favoritos</h1>

                    <Container className="cardofplaces" >
                        <Row className="favPlaces">{userInfo.favPlaces?.map(favPlace => {
                            return <Col lg={4} key={favPlace._id}> <PlaceCard {...favPlace} /></Col>
                        })
                        }</Row>

                    </Container>

                </Row>
            </Container>

        </div >



    )


}

export default ProfilePage