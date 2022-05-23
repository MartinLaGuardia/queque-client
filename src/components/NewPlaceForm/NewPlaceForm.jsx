import { useContext, useState } from "react"
import placesService from "../../services/places.service"
import { Form, Button, Container, Col } from "react-bootstrap"
import btnCreate from './../../assets/img/Buttons/btnCreate.png'

import './NewPlaceForm.css'

const NewPlaceForm = ({ loadPlaces }) => {

    const [placesData, setPlacesData] = useState({
        name: "",
        foodstyle: "",
        street: "",
        number: "",
        city: "",
        zipCode: "",
        phone: "",
        imageURL: "",
        description: "",
        latitude: "",
        longitude: ""
    })

    const { name, foodstyle, street, number, city, zipCode, phone, imageURL, description, latitude, longitude } = placesData


    const handleInputChange = e => {

        const { value, name } = e.target

        setPlacesData({
            ...placesData,
            [name]: value
        })
    }

    const handleSubmit = e => {

        e.preventDefault()

        placesService
            .createOnePlace(placesData)
            .then(() => {
                console.log('he creado un lugar')
                loadPlaces()
            })
            .catch(err => console.log(err))

    }

    return (

        // <Container >
        <Col lg={5} className="mx-auto">
            <Form className="newplace" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="textPlaceForm">Nombre:</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label className="textPlaceForm">Descripción:</Form.Label>
                    <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="foodstyle">
                    <Form.Label className="textPlaceForm">Tipo de comida:</Form.Label>
                    <Form.Control type="text" value={foodstyle} onChange={handleInputChange} name="foodstyle" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="street">
                    <Form.Label className="textPlaceForm">Street:</Form.Label>
                    <Form.Control type="text" value={street} onChange={handleInputChange} name="street" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="number">
                    <Form.Label className="textPlaceForm">Número:</Form.Label>
                    <Form.Control type="number" value={number} onChange={handleInputChange} name="number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="city">
                    <Form.Label className="textPlaceForm">Ciudad:</Form.Label>
                    <Form.Control type="text" value={city} onChange={handleInputChange} name="city" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="zipCode">
                    <Form.Label className="textPlaceForm">ZipCode</Form.Label>
                    <Form.Control type="number" value={zipCode} onChange={handleInputChange} name="zipCode" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label className="textPlaceForm">Teléfono</Form.Label>
                    <Form.Control type="text" value={phone} onChange={handleInputChange} name="phone" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="number">
                    <Form.Label className="textPlaceForm">Latitud</Form.Label>
                    <Form.Control type="number" value={latitude} onChange={handleInputChange} name="latitude" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="number">
                    <Form.Label className="textPlaceForm">Longitud</Form.Label>
                    <Form.Control type="number" value={longitude} onChange={handleInputChange} name="longitude" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="imageUrl">
                    <Form.Label className="textPlaceForm">Imagen (URL)</Form.Label>
                    <Form.Control type="text" value={imageURL} onChange={handleInputChange} name="imageURL" />
                </Form.Group>

                <button type="submit" className='create'><img className='btnCreate' src={btnCreate}></img></button>

            </Form>
        </Col>
        // </Container>


    )
}


export default NewPlaceForm
