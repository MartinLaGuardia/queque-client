import { useNavigate } from "react-router-dom"
import { Button, Container, Form } from 'react-bootstrap'
import commentsService from "../../services/comments.service"
import CommentsByPlace from "../CommentsByPlace/CommentsByPlace"
import btnErase from "./../../assets/img/Buttons/btnErase.png"
import { Row, Col } from 'react-bootstrap'
import './CommentsCard.css'


const CommentsCard = ({ text, rating, _id }) => {

    const navigate = useNavigate()

    const deleteComments = commentId => {

        commentsService
            .deleteComment(commentId)
            .then(() => navigate('/myprofile'))
            .catch(err => console.log(err))

    }


    return (

        <Container lg={4} className="comments1">
            <Row>
                <Col>
                    <h3>Observaciones:</h3>
                </Col>
                <Col> <h5>{text}</h5></Col>
                <Col>  <h4> ⭐  {rating}</h4>
                    <div className='place-button'>
                        <img className="btnErase" src={btnErase} alt="botón de borrar" onClick={() => deleteComments(_id)}></img>
                    </div>
                </Col>
            </Row>
        </Container>

    )


}

export default CommentsCard

