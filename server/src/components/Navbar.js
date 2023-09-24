import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../pages/Cart'
import { useCart } from './ContextReducer'

const Navbar = () => {
    const navigate = useNavigate()
    const [cartView, setCartView] = useState(false)
    let data = useCart();
    // let userName = localStorage.getItem("username");

    const handleLogout = ()=>{        
        localStorage.removeItem("authToken")
        navigate("/")
    }
  return (
    <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-success">
              <Link to="/" className="navbar-brand ms-4 fs-2 fst-italic"><strong>SK food</strong></Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse mx-4" id="navbarSupportedContent" >
                  <ul className="navbar-nav me-auto">
                      <li className="nav-item active">
                          <Link to="/" className="nav-link active fs-4 rounded-pill" > Recipes </Link>
                      </li>                               
                  </ul> 
                  {(!localStorage.getItem('authToken')) ?
                      <div className='d-flex'>                         
                          <Link to="/createuser" className="btn bg-white text-danger mx-2 rounded-pill" >SignUp</Link>
                          <Link to="/login" className="btn bg-white text-danger ms-3 me-4 rounded-pill" >
                              <img src='https://openclipart.org/download/171432/user1.svg' alt='username'
                                  className='me-1' style={{ height: "25px" }} />
                              <span className='me-1'>Log in</span>
                          </Link>
                      </div> :
                      <>
                          <div className=" text-white mx-2 rounded-pill" >
                              <img src='https://openclipart.org/download/171432/user1.svg' alt='username'
                                  className='me-2' style={{ height: "35px" }} />
                              <span className='me-4'>User name</span></div>
                          {(localStorage.getItem('authToken')) ?
                              <div className="nav-item active ">
                                  <Link to="/myorder" className="nav-link active bg-white text-success me-2 rounded-pill" >
                                      <strong>My Orders</strong></Link>
                              </div>
                              : ""
                          }     
                          <div className='btn bg-white text-success mx-2 rounded-pill' onClick={()=>{setCartView(true)}}>
                              My Cart {" "}
                              <span><sup className='fs-5 rounded-circle bg-danger p-2'>{data.length}</sup></span>
                            {cartView? <Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null}
                             
                          </div>
                          <div className='btn bg-white text-danger mx-2 rounded-pill' onClick={handleLogout}>
                              <strong>Log Out</strong>
                          </div>
                      </>                        
                  }                                      
              </div>
          </nav>
    </>
  )
}

export default Navbar