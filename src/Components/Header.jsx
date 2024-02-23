import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
        <Navbar className="bg-tertiary">
        <Container>
          <Navbar.Brand className='fw-bolder text-light'>
            <Link to={'/'} style={{textDecoration:'none'}} className=''>
            <i class="fa-solid fa-user-group me-2 pt-3"></i>
            EMS-APPLICATION
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header