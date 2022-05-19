import { ListGroup, ListGroupItem, Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './PlaceCard.css';

const PlaceCard = ({ _id, name, imageURL, description, foodstyle, phone, address }) => {

    return (

        <Container className="cards">
            <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imageURL} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{foodstyle}</ListGroupItem>
                    <ListGroupItem>{phone}</ListGroupItem>
                    <ListGroupItem>{address?.street}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Link to={`/placedetail/${_id}`}>know the place</Link>
                </Card.Body>
            </Card>
            </div>
        </Container>

    )

}

export default PlaceCard