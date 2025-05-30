import { useEffect, useState } from 'react';
import './Publications.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';

function Publications() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/publications/all');
        const data = await response.json();
        // console.log("Fetched publications:", data);
        setPublications(data);
      } catch (err) {
        console.error('Failed to fetch publications:', err);
      }
    };

    fetchPublications();
  }, []);

  const filterByType = (type) =>
    publications.filter((pub) => pub.pType === type);

  return (
    <>
      <Navbar />
      <div className="publicationBox">
        <h1>Publications</h1>
        <div className="publications">
          <div className="journal">
            <Dropdown title="Journal">
              {filterByType("Journal").map((pub, index) => (
                <p key={index}>{pub.ieeeCitation}</p>
              ))}
            </Dropdown>
          </div>
          <div className="conference">
            <Dropdown title="Conference">
              {filterByType("Conference").map((pub, index) => (
                <p key={index}>{pub.ieeeCitation}</p>
              ))}
            </Dropdown>
          </div>
          <div className="book-chapter">
            <Dropdown title="Book-Chapter">
              {filterByType("Book-Chapter").map((pub, index) => (
                <p key={index}>{pub.ieeeCitation}</p>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Publications;
