import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import placesService from "../../services/places.service"
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import btnEdit from './../../assets/img/Buttons/btnEdit.png';
import './EditPlaceForm.css'

const EditPlaceForm = ({ }) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [placeData, setPlaceData] = useState({
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

    const { name, foodstyle, street, number, city, zipCode, phone, imageURL, description, latitude, longitude } = placeData

    const handleInputChange = e => {
        const { name, value } = e.target

        setPlaceData({
            ...placeData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        placesService
            .updateOnePlace(id, { name, foodstyle, street, number, city, zipCode, phone, imageURL, description, latitude, longitude })
            .then(() => navigate('/myprofile'))
            .catch(err => console.log(err))

    }

    return (
        <div >

            <Container className="EditForm" >

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className="EditForm1">

                            <Form.Group className="mb-3" controlId="imageURL">
                                <Form.Label className="text">ImageURL</Form.Label>
                                <Form.Control type="imageURL" onChange={handleInputChange} name="imageURL" value={imageURL} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" value={name} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control type="text" name="description" value={description} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Estilo de comida</Form.Label>
                                <Form.Control type="text" name="foodstyle" value={foodstyle} onChange={handleInputChange} />
                            </Form.Group>

                        </Col>
                    </Row>

                    <Row>
                        <Col className="EditForm2">
                            <Form.Group >
                                <Form.Label>Calle</Form.Label>
                                <Form.Control type="text" name="street" value={street} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Número</Form.Label>
                                <Form.Control type="text" name="number" value={number} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control type="text" name="city" value={city} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control type="text" name="phone" value={phone} onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="EditForm3">
                            <Form.Group >
                                <Form.Label>Código postal</Form.Label>
                                <Form.Control type="Number" name="zipCode" value={zipCode} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Latitud</Form.Label>
                                <Form.Control type="Number" name="latitude" value={latitude} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Longitud</Form.Label>
                                <Form.Control type="Number" name="longitude" value={longitude} onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Form.Group >
                            <button className="btnSubmit" type="submit"><img className="btnEdition" src={btnEdit}></img></button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>

        </div>
    )
}

export default EditPlaceForm
