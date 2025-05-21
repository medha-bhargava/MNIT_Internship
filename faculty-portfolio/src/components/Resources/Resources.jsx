import './Resources.css'
import Navbar from '../Navbar/Navbar'
import Dropdown from '../Dropdown/Dropdown'

function Resources() {

  return (
    <>
      <Navbar />
      <div className="resourcesBox">
        <h1>Resources for Students</h1>
        <div className="resources">
          <div className="pyqs">
            <Dropdown title="Previous Year Papers">
              <p>PYQ 1</p>
              <p>PYQ 2</p>
            </Dropdown>
          </div>
          <div className="impques">
            <Dropdown title="Important Questions">
              <p>Link 1</p>
              <p>Link 2</p>
              <p>Link 3</p>
              <p>Link 4</p>
            </Dropdown>
          </div>
          <div className="videolinks">
            <Dropdown title="Video Links">
              <p>Link 1</p>
              <p>Link 2</p>
              <p>Link 3</p>
              <p>Link 4</p>
            </Dropdown>
          </div>
          <div className="notes">
            <Dropdown title="Notes">
              <p>Course 1 Notes</p>
              <p>Course 2 Notes</p>
              <p>Course 3 Notes</p>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default Resources
