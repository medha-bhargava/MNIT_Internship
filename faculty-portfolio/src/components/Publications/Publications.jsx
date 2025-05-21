import './Publications.css'
import Navbar from '../Navbar/Navbar'
import Dropdown from '../Dropdown/Dropdown'

function Publications() {

  return (
    <>
      <Navbar />
      <div className="publicationBox">
        <h1>Publications</h1>
        <div className="publications">
          <div className="journal">
            <Dropdown title="Journal">
              <p>Journal publication 1</p>
              <p>Journal publication 2</p>
            </Dropdown>
          </div>
          <div className="conference">
            <Dropdown title="Conference">
              <p>Conference paper 1</p>
              <p>Conference paper 2</p>
            </Dropdown>
          </div>
          <div className="book-chapter">
            <Dropdown title="Book-Chapter">
              <p>Book chapter 1</p>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default Publications
