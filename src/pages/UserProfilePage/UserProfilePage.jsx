import { useContext, useEffect, useState } from "react"
import { Col } from 'react-bootstrap';
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard"
import usersService from "../../services/users.service"
import { AuthContext } from "../../context/auth.context"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';




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
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: 40.41483,
        lng: -3.71221
    };


    return (

        <div>
            <h1>Hello again, {userInfo.username}</h1>
            <UserInfoCard userInfo={userInfo} />



            <Col>
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

            </Col>
        </div>



    )


}

export default ProfilePage