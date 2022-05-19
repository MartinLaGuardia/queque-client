import axios from 'axios'

class CommentsService {

    constructor() {
        this.app = axios.create({ baseURL: 'http://localhost:5005/api/comments' })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createComment = (idPlace, commentData) => {
        return this.app.post(`/${idPlace}/create-comment`, commentData)
    }

    updateOneComment = id => {
        return this.app.put(`/${id}/edit-comment`)
    }

    deleteComment = id => {
        return this.app.delete(`/${id}/delete-comment`)
    }

    getAllComments = () => {
        return this.app.get('/all-comments')
    }

    getCommentsByPlace = id => {
        return this.app.get(`/${id}/commentsByPlace`)
    }


}

const commentsService = new CommentsService()

export default commentsService