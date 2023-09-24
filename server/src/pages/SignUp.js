import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name:"",
        email:"",
        password:"",
        geolocation:""
    })
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/createUser",
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:credentials.name, email:credentials.email, 
                password:credentials.password, location:credentials.geolocation
               })
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter valid Credentials")
        }
        if (json.success) {
           navigate("/login")
        }
    }
    const onchange=(event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value})
    }

  return (
    <>
    <Navbar/>
      <div className='container' style={{width:"500px", marginTop:"50px"}}>
              <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" id="Inputname" aria-describedby="emailHelp"
                       placeholder="Enter name"
                       name='name'
                       value={credentials.name}
                       onChange={onchange} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email"
                        name='email'
                        value={credentials.email}
                          onChange={onchange}
                       />
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="inputpassword" placeholder="Password"
                      name='password'
                      value={credentials.password}
                        onChange={onchange}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input type="text" className="form-control" id="Inputaddress" aria-describedby="emailHelp"
                          placeholder="Enter address"
                          name='geolocation'
                          value={credentials.geolocation}
                          onChange={onchange} />
                  </div>
                  <button type="submit" className="btn btn-primary">SignUp</button>
                  <Link to='/login' className='m-4 btn btn-danger'>Already a user</Link>
              </form>
      </div>
    </>
  )
}

export default SignUp