import { Container, Button, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'


const LoginPage = () => {

    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ span: 12, offset: 0 }}>
                        <LoginForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginPage

