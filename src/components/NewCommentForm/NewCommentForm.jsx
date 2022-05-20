import commentsService from "../../services/comments.service"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import btnSend from './../../assets/img/Buttons/btnSend.png'
import './NewCommentForm.css'


const CommentsForm = ({ loadComments }) => {

    const [commentInfo, setCommentInfo] = useState({
        text: "",
        rating: 0
    })

    const { text, rating } = commentInfo
    const navigate = useNavigate()
    const { idPlace } = useParams()



    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setCommentInfo({
            ...commentInfo,
            [name]: value
        })

    }


    function handleSubmit(e) {

        e.preventDefault()

        commentsService
            .createComment(idPlace, commentInfo)
            .then(({ data }) => {
                setCommentInfo(data)
                loadComments(idPlace)
                // closeComment()
            })
            .catch(err => console.log(err))

    }

    return (

        <div className="commentsForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>¿Que es lo que más recuerdas de este sitio?</Form.Label>
                    <Form.Control as="textarea" name="text" value={text} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>¿Cuánto le das?</Form.Label>
                    <Form.Select name="rating" value={rating} onChange={handleInputChange} >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Select>
                </Form.Group>
                <button type="submit" className="commentbtn"><img className="btnSend" src={btnSend}>
                </img></button>

            </Form>
        </div>

    )
}

export default CommentsForm