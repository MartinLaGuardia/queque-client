import './Navigation.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'


const Navigation = () => {

    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)

    return (
        <>
            <Navbar className='navigation' variant="Dark" expand="lg">
                <Container >
                    <NavLink to="/">
                        <Navbar.Brand className='que'></Navbar.Brand>
                    </NavLink>
                    <Nav>

                        {
                            isLoggedIn
                                ?
                                <NavLink to="/" className='text-currentUser' > ¿Y hoy... qué te apetece, {user.username}?</NavLink>
                                :
                                <NavLink to="/" className='text-currentUser' > ¿Y hoy... qué te apetece?</NavLink>

                        }

                        {
                            isLoggedIn && <NavLink to="/myprofile" className='text-Profile'>Perfil</NavLink>
                        }

                        {
                            user?.role === 'ADMIN' && <NavLink to="/placelist" className='text-List'>Listado</NavLink>

                        }

                        {
                            isLoggedIn
                                ?
                                <div className='text-LogOut' onClick={logOutUser}>Salir</div>
                                :
                                <div >
                                    <NavLink to="/signup" className='signup'> Regístrate</NavLink>
                                    <NavLink to="/login" className='loginNavi'>Loguéate</NavLink>
                                </div>
                        }

                    </Nav>
                </Container>
            </Navbar>
        </>

    )

}

export default Navigation