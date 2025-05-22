import './EditProfile.css';
import Navbar from '../Navbar/Navbar';

function EditProfile() {

  return (
    <>
      <Navbar />
      <div className="edit-profile-wrapper">
        <h1 className="heading">Edit Profile</h1>
        <div className="edit-profile-box">
          <div className="row">
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="input-group">
              <label>Contact_No</label>
              <input type="text" placeholder="Enter contact number" />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Email_Id</label>
              <input type="email" placeholder="Enter email" />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Select</label>
              <select>
                <option value="">--Choose--</option>
                <option value="home">Home</option>
                <option value="publications">Publications</option>
                <option value="courses">Courses</option>
                <option value="resources">Resources</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <textarea rows="6" placeholder="Add Information"></textarea>
            </div>
          </div>

          <div className="row">
            <button className="update-button">Update Profile</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;