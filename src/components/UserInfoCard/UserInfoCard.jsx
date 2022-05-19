import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../../services/users.service'
import PlaceCard from '../PlaceCard/PlaceCard'
import { Col } from 'react-bootstrap'

const UserInfoCard = ({ userInfo }) => {

    console.log(userInfo)
  
    return (
            
        <>
            <h1>soy la card con info del usuario</h1>

            <img src={userInfo.imageURL} alt="userInfo.name"></img>
            <p>{userInfo?.username}</p>

            {userInfo.favPlaces?.map(favPlace => {
                return <Col md={4} key={favPlace._id}> < PlaceCard {...favPlace} /> </Col>

            })
            }
        </>
        

    )
    
}

export default UserInfoCard

