import './StudentLogin.css'
import Navbar from '../Navbar/Navbar'

function StudentLogin() {

  return (
    <>
      <Navbar/>
      <div>
        <h1>Student Login</h1>
      </div>
      <div className="loginBox">
        <label htmlFor="studentid">Student_ID</label>
        <input type="text" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="text" />
        <br />
        <button className="logbtn">Login</button>
      </div>
    </>
  )
}

export default StudentLogin
