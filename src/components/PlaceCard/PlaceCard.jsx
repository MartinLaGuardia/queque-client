import { ListGroup, ListGroupItem, Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './PlaceCard.css';

const PlaceCard = ({ _id, name, imageURL, description, foodstyle, phone, address }) => {

    return (

        <Container className="allList" >
            <div className="cardsList" >
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={imageURL} />
                    <Card.Body>
                        <Card.Title><strong>{name}</strong></Card.Title>
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
                        <Link to={`/placedetail/${_id}`}>Ver más</Link>
                    </Card.Body>
                </Card>
            </div>
        </Container>

    )

}

export default PlaceCard