import './Home.css'
import Navbar from '../Navbar/Navbar'
import profilepic from './profilepic.png'

function Home() {

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="left">
          <img src={profilepic} alt="Profile" className="profile-img" />
          <div className="faculty-info">
            <p>&lt;Faculty_Name&gt;</p>
            <p>&lt;Contact_No&gt;</p>
            <p>&lt;Email_ID&gt;</p>
          </div>
        </div>
        <div className="right">
          <section className="section-box">
            <h2>About me</h2>
            <div className="content-box">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil assumenda laboriosam sed voluptatum odit recusandae, suscipit expedita reiciendis veniam eius quod nesciunt nostrum harum itaque? Odit delectus possimus ipsum provident necessitatibus corporis perferendis, sapiente explicabo sunt sint recusandae quos? Reprehenderit id nemo perferendis amet quae ipsa alias eligendi maxime fugiat iste quibusdam, neque sunt dolorum? Eveniet corrupti aut, ullam nemo itaque exercitationem nihil laborum reiciendis culpa accusantium alias deserunt assumenda molestiae odit. Nostrum obcaecati labore totam soluta modi!
            </div>
          </section>

          <section className="section-box">
            <h2>News (Latest Addition)</h2>
            <div className="news-scroller">
              <ol>
                <li>New publication. Check it out in the Publications 🚀</li>
                <li>Workshop on Data Engineering next week 📅</li>
                <li>Updated course materials available 🎓</li>
                <li>Student project showcase on Friday 🎉</li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
