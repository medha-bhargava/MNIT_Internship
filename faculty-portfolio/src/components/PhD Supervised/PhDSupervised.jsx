import React, { useEffect, useState } from 'react';
import './PhDSupervised.css';
import Navbar from '../Navbar/Navbar';

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
                    <div className="phd-cards-container">
                        {phdList.map((phd, index) => (
                            <div key={index} className="phd-card">
                                <h3>{phd.scholarName}</h3>
                                <p><strong>Topic:</strong> {phd.researchTopicTitle}</p>
                                {/* <p><strong>Scholar ID:</strong> {phd.scholarId}</p> */}
                                <p><strong>Status:</strong> {phd.phdStatus}</p>
                                <p><strong>Year:</strong> {phd.year}</p>

                                {phd.coSupervisor && <p><strong>Co-Supervisor:</strong> {phd.coSupervisor}</p>}
                                {/* {phd.currentDesignation && <p><strong>Current Designation:</strong> {phd.currentDesignation}</p>} */}
                                {phd.organization && <p><strong>Organization:</strong> {phd.organization}</p>}
                                {/* {phd.currentEmail && <p><strong>Email:</strong> {phd.currentEmail}</p>} */}
                                {/* {phd.currentMobile && <p><strong>Mobile:</strong> {phd.currentMobile}</p>} */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PhDSupervised;
