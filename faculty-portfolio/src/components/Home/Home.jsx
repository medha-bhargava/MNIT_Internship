import './Home.css';
import Navbar from '../Navbar/Navbar';
// import profilepic from './profilepic.png';
import myphoto from './myphoto.png';
import { useEffect, useState } from 'react';

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
      <div className="container">
        <div className="left">
          <img src={myphoto} alt="Profile" className="profile-img" />
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
              ) : (
                <div className="news-scroller">
                  {profile.news ? (
                    <ol>
                      {profile.news.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>No news available.</p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
