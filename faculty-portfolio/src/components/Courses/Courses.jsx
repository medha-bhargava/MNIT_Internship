import Navbar from '../Navbar/Navbar'
import Dropdown from '../Dropdown/Dropdown'
import './Courses.css'

function Courses() {

  return (
    <>
      <Navbar />
      <div className="coursesBox">
        <h1>Courses Taught</h1>
        <div className="courses">
          <div className="latest">
            <Dropdown title="Currently (2025)">
              <p>Course 1</p>
              <p>Course 2</p>
            </Dropdown>
          </div>
          <div className="till_date">
            <Dropdown title="Previously Taught">
              <p>Course 1</p>
              <p>Course 2</p>
              <p>Course 3</p>
              <p>Course 4</p>
              <p>Course 5</p>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses
