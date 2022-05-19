import { useState, useEffect } from "react"
import { Container, Button, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import RandomPlaceCard from "../../components/RandomPlaceCard/RandomPlaceCard"
import placesService from "../../services/places.service"
import logoQQ from "./../../assets/img/logoQQ.png"
import './HomePage.css'



const HomePage = () => {

    const [randomPlaces, setRandomPlaces] = useState([])


    useEffect(() => {
        loadRandomPlaces()
    }, [])

    const loadRandomPlaces = () => {

        placesService
            .getThreeRandomPlace()
            .then(({ data }) => {
                console.log(data)
                setRandomPlaces(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <Container >
            <div >

                <div className='place-button'>
                    {randomPlaces.map(randomPlace => {
                        return <Col md={4} key={randomPlace._id}> <RandomPlaceCard {...randomPlace} /> </Col>

                    })}
                </div>
                <div className="qqbtn">
                <img src={logoQQ} onClick={() => loadRandomPlaces()} />
                </div>

            </div>

        </Container>
    )
}

export default HomePage