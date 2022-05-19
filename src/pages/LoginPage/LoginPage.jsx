import { Container, Button, Row, Col } from 'react-bootstrap'
//import { Link } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/LoginForm'


const LoginPage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ span: 12, offset: 0 }}>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage

