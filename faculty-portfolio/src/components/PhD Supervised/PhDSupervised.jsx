import React, { useEffect, useState } from 'react';
import './PhDSupervised.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown'; // Adjust the path as needed

const PhDSupervised = () => {
  const [phdList, setPhdList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhDData = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/phd/all');
        const data = await response.json();
        setPhdList(data);
      } catch (error) {
        console.error('Error fetching PhD data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhDData();
  }, []);

  const groupedByStatus = phdList.reduce((acc, phd) => {
    const status = phd.phdStatus || 'Unknown';
    acc[status] = acc[status] || [];
    acc[status].push(phd);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="phd-supervised-page">
        <h1>PhD Supervised</h1>

        {loading ? (
          <p>Loading...</p>
        ) : phdList.length === 0 ? (
          <p>No PhD supervision records found.</p>
        ) : (
          <>
            {Object.entries(groupedByStatus).map(([status, items]) => (
              <Dropdown key={status} title={`${status}`}>
                <div className="phd-cards-container">
                  {items.map((phd, index) => (
                    <div key={index} className="phd-card">
                      <h3>{phd.scholarName}</h3>
                      <p><strong>Topic:</strong> {phd.researchTopicTitle}</p>
                      <p><strong>Year:</strong> {phd.year}</p>
                      {phd.coSupervisor && <p><strong>Co-Supervisor:</strong> {phd.coSupervisor}</p>}
                      {phd.organization && <p><strong>Organization:</strong> {phd.organization}</p>}
                    </div>
                  ))}
                </div>
              </Dropdown>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PhDSupervised;
