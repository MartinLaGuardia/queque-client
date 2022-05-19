import commentsService from "../../services/comments.service"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


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
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>What do you want to remember of this place?</Form.Label>
                    <Form.Control as="textarea" name="text" className="form-input" value={text} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Satisfaction level</Form.Label>
                    <Form.Select name="rating" value={rating} onChange={handleInputChange} className="form-input">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Select>
                </Form.Group>
                <Button className="form-button" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default CommentsForm