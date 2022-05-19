import { Col, Row } from 'react-bootstrap'
import PlaceCard from './../PlaceCard/PlaceCard'
import './PlaceList.css'



const PlaceList = ({ places }) => {

    return (
        <Row>
            {places.map(place => {
                return (
                    <Col md={4} key={place._id}>
                        < PlaceCard {...place} />
                    </Col>

                )
            })}
        </Row>

    )
}

export default PlaceList

