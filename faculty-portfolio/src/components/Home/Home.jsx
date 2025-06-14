import './Home.css';
import Navbar from '../Navbar/Navbar';
import profilepic from './profilepic.png';
// import myphoto from './myphoto.png';
import { useEffect, useState } from 'react';
// import { FcDocument } from "react-icons/fc";
import { IoIosDocument } from "react-icons/io";

function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8083/api/profile');
        if (!res.ok) throw new Error('Failed to load profile');

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      {/* <div className="ball-container">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
        <div className="ball ball4"></div>
        <div className="ball ball5"></div>
        <div className="ball ball6"></div>
        <div className="ball ball7"></div>
        <div className="ball ball8"></div>
        <div className="ball ball9"></div>
        <div className="ball ball10"></div>
        <div className="ball ball11"></div>
        <div className="ball ball12"></div>
        <div className="ball ball13"></div>
        <div className="ball ball14"></div>
        <div className="ball ball15"></div>
      </div> */}
      <div className="container">
        <div className="left">
          {loading ? (
            <p className="loading-text">Loading photo...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <img
              src={
                profile.profilePhoto
                  ? `http://localhost:8083/uploads/${profile.profilePhoto}`
                  : profilepic
              }
              alt="Profile"
              className="profile-img"
            />
          )}
          <div className="faculty-info">
            {loading ? (
              <p className="loading-text">Loading profile info...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : (
              <>
                <p>{profile.name}</p>
                <p>{profile.contactNumber}</p>
                <p>{profile.email}</p>
              </>
            )}
          </div>
          <div className="detailedCV">
            <span>
              <IoIosDocument className="cv-icon" />
              {profile && profile.detailedCV ? (
                <a
                  href={`http://localhost:8083/${profile.detailedCV}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Detailed CV
                </a>
              ) : (
                <span style={{ color: 'gray' }}>CV not uploaded</span>
              )}
            </span>
          </div>
        </div>

        <div className="right">
          <section className="section-box">
            <h2>About me</h2>
            <div className="content-box">
              {loading ? (
                <p className="loading-text">Loading about section...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : (
                <p>{profile.about}</p>
              )}
            </div>
          </section>

          <section className="section-box">
            <h2>News (Latest Addition)</h2>
            <div className="news-scroller">
              {loading ? (
                <p className="loading-text">Loading news...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : profile.news ? (
                <ol>
                  {profile.news.split('\n').map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ol>
              ) : (
                <p>No news available.</p>
              )}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

export default Home;
