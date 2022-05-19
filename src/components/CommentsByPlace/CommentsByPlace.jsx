import { useParams, useNavigate } from "react-router-dom"
import { Col, Card, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import commentsService from "../../services/comments.service"
import CommentsCard from "../CommentsCard/CommentsCard"



const CommentsByPlace = ({ idPlace, comments }) => {

    const navigate = useNavigate()

    // const [comments, setComments] = useState([])

    // useEffect(() => {
    //     loadComments(idPlace)
    // }, [])

    // const loadComments = (id) => {

    //     commentsService
    //         .getCommentsByPlace(id)
    //         .then(({ data }) => setComments(data))
    //         .catch(err => console.log(err))
    // }

    // console.log(comments)

    return (

        <article className="comments" >
            {comments?.map(comment => {
                return <Col md={4} key={comment._id}> < CommentsCard {...comment} /> </Col>
            })}
            
           
        </article>


    )

}


export default CommentsByPlace