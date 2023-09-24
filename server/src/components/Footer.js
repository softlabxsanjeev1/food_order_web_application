import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
              <div className="col-md-4 d-flex align-items-center ms-4">
                  <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    
                  </Link>
          <span className="mb-3 mb-md-0 text-muted">© 2022 <strong className='fs-3'> SK Food</strong>, Inc</span>
              </div>

              <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-4">
          <li className="ms-3"><Link className="text-muted" to="#"><img src='https://cdn.pixabay.com/photo/2017/08/22/11/56/linked-in-2668696_1280.png' alt='fb' style={{height:"25px"}}/>Linked In</Link></li>
          <li className="ms-3"><Link className="text-muted" to="#"><img src='https://pbs.twimg.com/profile_images/1646955748444852231/XGehZ_9v_400x400.jpg' alt='fb' style={{ height: "25px" }} />FaceBook</Link></li>
          <li className="ms-3"><Link className="text-muted" to="#"><img src='https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg' alt='fb' style={{ height: "25px" }} />Instagram</Link></li>
              </ul>
          </footer>
    </>
  )
}

export default Footer