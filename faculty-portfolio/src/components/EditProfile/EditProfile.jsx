import React, { useState } from 'react';
import axios from 'axios';
import './EditProfile.css';
import Navbar from '../Navbar/Navbar';

function EditProfile() {
  const [section, setSection] = useState('');
  const [subField, setSubField] = useState('');
  const [info, setInfo] = useState('');

  const subOptions = {
    home: ['about', 'news'],
    publications: ['journal', 'conference', 'bookChapter'],
    courses: ['currentlyTeaching', 'previouslyTaught'],
    resources: ['previousPapers', 'importantQuestions', 'videoLinks', 'notes'],
  };

  const getSubFieldLabel = (value) => {
    const labels = {
      about: 'About Me',
      news: 'News',
      journal: 'Journal',
      conference: 'Conference',
      bookChapter: 'Book Chapter',
      currentlyTeaching: 'Currently Teaching',
      previouslyTaught: 'Previously Taught',
      previousPapers: 'Previous Year Papers',
      importantQuestions: 'Important Questions',
      videoLinks: 'Video Links',
      notes: 'Notes',
    };
    return labels[value] || '';
  };

  const handleUpdate = async () => {
    if (!section || !subField || !info) {
      alert('Please fill out all fields before updating.');
      return;
    }

    const updateData = {
      section,
      subField,
      info,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/update-profile', updateData);
      alert(`Updated ${getSubFieldLabel(subField)} successfully!`);
      setInfo('');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-wrapper">
        <h1 className="heading">Edit Profile</h1>
        <div className="edit-profile-box">
          <div className="row">
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="input-group">
              <label>Contact_No</label>
              <input type="text" placeholder="Enter contact number" />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Email_Id</label>
              <input type="email" placeholder="Enter email" />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Main Section</label>
              <select value={section} onChange={(e) => {
                setSection(e.target.value);
                setSubField('');
              }}>
                <option value="">--Choose--</option>
                <option value="home">Home</option>
                <option value="publications">Publications</option>
                <option value="courses">Courses</option>
                <option value="resources">Resources</option>
              </select>
            </div>
          </div>

          {section && subOptions[section] && (
            <div className="row">
              <div className="input-group">
                <label>Sub-Field</label>
                <select value={subField} onChange={(e) => setSubField(e.target.value)}>
                  <option value="">--Select Sub-Field--</option>
                  {subOptions[section].map((item) => (
                    <option key={item} value={item}>
                      {getSubFieldLabel(item)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="row">
            <div className="input-group">
              <textarea
                rows="6"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder={
                  subField
                    ? `Add information for ${getSubFieldLabel(subField)}`
                    : 'Add Information'
                }
              />
            </div>
          </div>

          <div className="row">
            <button className="update-button" onClick={handleUpdate}>
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
