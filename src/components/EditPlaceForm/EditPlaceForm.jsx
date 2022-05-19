import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import placesService from "../../services/places.service"
import { Row, Col, Form, Button } from 'react-bootstrap'

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

    function handleSubmit(e) {

        e.preventDefault()

        placesService
            .updateOnePlace(id, { name, foodstyle, street, number, city, zipCode, phone, imageURL, description, latitude, longitude })
            .then(() => navigate('/placelist'))
            .catch(err => console.log(err))

    }

    const handleInputChange = e => {
        const { name, value } = e.target

        setPlaceData({
            ...placeData,
            [name]: value
        })
    }

    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <h1>SOY EL FORMULARIO</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={description} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Foodstyle</Form.Label>
                        <Form.Control type="text" name="foodstyle" value={foodstyle} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" name="street" value={street} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Number</Form.Label>
                        <Form.Control type="number" name="number" value={number} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={city} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" name="phone" value={phone} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="number" name="zipCode" value={zipCode} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="number" name="latitude" value={latitude} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="number" name="longitude" value={longitude} onChange={handleInputChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Finished edition
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default EditPlaceForm
