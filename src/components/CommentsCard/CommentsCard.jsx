import { useNavigate } from "react-router-dom"
import { Button, Container } from 'react-bootstrap'
import commentsService from "../../services/comments.service"
import CommentsByPlace from "../CommentsByPlace/CommentsByPlace"


const CommentsCard = ({ text, rating, _id }) => {

    const navigate = useNavigate()

    const deleteComments = commentId => {

        commentsService
            .deleteComment(commentId)
            .then(() => navigate('/placelist'))
            .catch(err => console.log(err))

    }


    return (
        
            <Container className="comments">
                <p>COMENTARIO:</p>
                <p>Contenido: {text}</p>
                <p>Rating: {rating}</p>
                <div className='place-button'>
                    <Button type="submit" value="Submit" onClick={() => deleteComments(_id)}>Delete</Button>
                </div>
            </Container>
        
    )


}

export default CommentsCard

