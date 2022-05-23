import './Navigation.css'
import { Navbar, Container, Nav, Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import logoQQ from './../../assets/img/logoQQ.png'

const Navigation = () => {

    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)

    return (
        <>
            <Navbar className='navigation' variant="Dark" expand="lg">
                <Container >
                    <NavLink to={'/'}>
                        <img className='logoQQ' src={logoQQ} />
                    </NavLink>
                    <Nav>

                        {
                            isLoggedIn
                                ?
                                <NavLink to="/" className='text-currentUser2' > ¿Y hoy qué comemos, {user.username}?</NavLink>
                                :
                                <NavLink to="/" className='text-currentUser' > ¿Y hoy qué comemos?</NavLink>

                        }
                        <div className="itemsNav">
                            {
                                isLoggedIn && <NavLink to="/myprofile" className='text-Profile'>Perfil</NavLink>
                            }

                            {
                                user?.role === 'ADMIN' && <NavLink to="/placelist" className='text-List'>Listado</NavLink>

                            }

                            {
                                isLoggedIn
                                    ?
                                    <NavLink to="/login">
                                        <Nav.Link className='LogOutNavi' as="span" onClick={logOutUser}>Salir</Nav.Link>
                                    </NavLink>
                                    :
                                    <div >
                                        <Container>
                                            <NavLink to="/signup" className='signupNavi'> Regístrate</NavLink>
                                            <NavLink to="/login" className='loginNavi'>Loguéate</NavLink>
                                        </Container>
                                    </div>
                            }
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </>

    )

}

export default Navigation