import React, {useState}from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/loginUser",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         email: credentials.email,
          password: credentials.password,
        })
      });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials")
    }
    if (json.success) {
      localStorage.setItem("username", credentials.name);
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken",json.authToekn);
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  }
  const onchange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
    <Navbar/>
      <div className='container' style={{ width: "500px", marginTop: "50px" }}>
        <form onSubmit={handleSubmit}>          
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
          <button type="submit" className="btn btn-primary mr-4">Login</button>
          <Link to='/login' className='m-4 btn btn-danger'>Register as new user</Link>
        </form>
      </div>

     
    </>
  )
}

export default Login