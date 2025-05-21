import './AdminLogin.css'
import Navbar from '../Navbar/Navbar'

function AdminLogin() {

  return (
    <>
      <Navbar/>
      <div>
        <h1>Admin Login</h1>
      </div>
      <div className="loginBox">
        <label htmlFor="adminid">Admin_ID</label>
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

export default AdminLogin
