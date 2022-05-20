import { ListGroup, ListGroupItem, Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'
import placesService from "../../services/places.service";
import './RandomPlaceCard.css'

const RandomPlaceCard = ({ _id, name, imageURL, description, foodstyle, phone, address }) => {

    return (

        <Container className="cards">
            <Link to={`/placedetail/${_id}`}>
                <Card style={{ width: '19rem' }}>
                    <Card.Img variant="top" src={imageURL} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{description}</ListGroupItem>
                        <ListGroupItem>{foodstyle}</ListGroupItem>
                    </ListGroup>
                </Card>
            </Link>
        </Container>


    )

}

export default RandomPlaceCard