import './Resources.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';
import { useEffect, useState } from 'react';

function Resources() {
  const [resources, setResources] = useState({
    previousPapers: [],
    importantQuestions: [],
    videoLinks: [],
    notes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('http://localhost:8083/api/resources/all');
        if (!res.ok) throw new Error('Failed to fetch resources');

        const data = await res.json();

        const groupedResources = {
          'Previous Year Papers': [],
          'Important Questions': [],
          'Video Links': [],
          'Notes': [],
        };

        data.forEach(resource => {
          if (resource.category && groupedResources[resource.category]) {
            groupedResources[resource.category].push({
              title: resource.title,
              link: resource.link
            });
          }
        });

        setResources(groupedResources);
        console.log(groupedResources);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);
  return (
    <>
      <Navbar />
      <div className="resourcesBox">
        <h1>Resources for Students</h1>

        {/* {loading && <p>Loading resources...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}

        {!loading && !error && (
          <div className="resources">
            <div className="pyqs">
              <Dropdown title="Previous Year Papers">
                {resources['Previous Year Papers'].length > 0 ? (
                  resources['Previous Year Papers'].map((item, index) => (
                    <p key={index}>
                      <strong>{item.title}:</strong>{' '}
                      <a className="alink" href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.link}
                      </a>
                    </p>
                  ))
                ) : (
                  <p>No previous year papers uploaded yet.</p>
                )}
              </Dropdown>
            </div>

            <div className="impques">
              <Dropdown title="Important Questions">
                {resources['Important Questions'].length > 0 ? (
                  resources['Important Questions'].map((item, index) => (
                    <p key={index}>
                      <strong>{item.title}:</strong>{' '}
                      <a className="alink" href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.link}
                      </a>
                    </p>
                  ))
                ) : (
                  <p>No important questions available.</p>
                )}
              </Dropdown>
            </div>

            <div className="videolinks">
              <Dropdown title="Video Links">
                {resources['Video Links'].length > 0 ? (
                  resources['Video Links'].map((item, index) => (
                    <p key={index}>
                      <strong>{item.title}:</strong>{' '}
                      <a className="alink" href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.link}
                      </a>
                    </p>
                  ))
                ) : (
                  <p>No video links uploaded.</p>
                )}
              </Dropdown>
            </div>

            <div className="notes">
              <Dropdown title="Notes">
                {resources['Notes'].length > 0 ? (
                  resources['Notes'].map((item, index) => (
                    <p key={index}>
                      <strong>{item.title}:</strong>{' '}
                      <a className="alink" href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.link}
                      </a>
                    </p>
                  ))
                ) : (
                  <p>No notes available yet.</p>
                )}
              </Dropdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Resources;
