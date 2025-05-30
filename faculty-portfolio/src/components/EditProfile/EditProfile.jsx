import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import Navbar from '../Navbar/Navbar';
import AddPublicationForm from '../Publications/AddPublication';
import AddCourseForm from '../Courses/AddCourse';
import AddProjectForm from '../Projects/AddProject';
import AddEventForm from '../Events/AddEvent';
import AddResourceForm from '../Resources/AddResource';

function EditProfile() {
  const [section, setSection] = useState('');
  const [subField, setSubField] = useState('');
  const [info, setInfo] = useState('');

  // Profile fields state
  const [profile, setProfile] = useState({
    name: '',
    contactNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const subOptions = {
    home: ['about', 'news'],
    publications: ['addPublication'],
    // publications: ['add', 'update', 'remove'],
    courses: ['addCourse'],
    // resources: ['addResource', 'previousPapers', 'importantQuestions', 'videoLinks', 'notes'],
    resources: ['addResource'],
    projects: ['addProject'],
    events: ['addEvent'],
  };

  const getSubFieldLabel = (value) => {
    const labels = {
      about: 'About Me',
      news: 'News',
      addPublication: 'Add Publication',
      addCourse: 'Add Course',
      addResource: 'Add Resource',
      addProject: 'Add Project',
      addEvent: 'Add Event',
      // previousPapers: 'Previous Year Papers',
      // importantQuestions: 'Important Questions',
      // videoLinks: 'Video Links',
      // notes: 'Notes',
    };
    return labels[value] || '';
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8083/api/profile');
        const data = await res.json();
        setProfile({
          name: data.name || '',
          contactNumber: data.contactNumber || '',
          email: data.email || '',
        });
        if (subField) setInfo(data[subField] || '');
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [subField]); // re-run when subField changes

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!section || !subField) {
      alert('Please choose both section and sub-field');
      return;
    }
    if (
      !(
        section === 'publications' ||
        section === 'courses' ||
        section === 'resources'
      )
    ) {
      // Update simple text content like name, email, about, etc.
      const payload = {
        ...profile,
        [subField]: info, // e.g., about: info
      };

      // console.log('📦 Payload being sent to backend:', payload);

      try {
        const res = await fetch('http://localhost:8083/api/profile/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Update failed');
        setMessage(`✅ ${getSubFieldLabel(subField)} updated!`);
      } catch (err) {
        setMessage(`❌ Error: ${err.message}`);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="edit-profile-wrapper">
        <h1 className="heading">Edit Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="edit-profile-box">
            <div className="row">
              <div className="input-group">
                <label>Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter name"
                  disabled
                />
              </div>
              <div className="input-group">
                <label>Contact No</label>
                <input
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter contact number"
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <label>Email ID</label>
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <label>Main Section</label>
                <select
                  value={section}
                  onChange={(e) => {
                    setSection(e.target.value);
                    setSubField('');
                  }}
                >
                  <option value="">--Choose--</option>
                  <option value="home">Home</option>
                  <option value="publications">Publications</option>
                  <option value="courses">Courses</option>
                  <option value="projects">Projects</option>
                  <option value="events">Events</option>
                  <option value="resources">Resources</option>
                </select>
              </div>
            </div>

            {section && subOptions[section] && (
              <div className="row">
                <div className="input-group">
                  <label>Sub-Field</label>
                  <select
                    value={subField}
                    onChange={(e) => setSubField(e.target.value)}
                  >
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

            {section === 'home' && (
              <div className="row">
                <div className="input-group">
                  <textarea
                    rows="7"
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
            )}

            {section === 'publications' && subField === 'addPublication' && (
              <div className="row">
                <AddPublicationForm />
              </div>
            )}

            {section === 'courses' && subField === 'addCourse' && (
              <div className="row">
                <AddCourseForm />
              </div>
            )}

            {section === 'projects' && subField === 'addProject' && (
              <div className="row">
                <AddProjectForm />
              </div>
            )}

            {section === 'events' && subField === 'addEvent' && (
              <div className="row">
                <AddEventForm />
              </div>
            )}

            {section === 'resources' && subField === 'addResource' && (
              <div className="row">
                <AddResourceForm />
              </div>
            )}

            {section === 'home' && (
              <div className="row">
                <button className="update-button" onClick={handleUpdate}>
                  Update Profile
                </button>
              </div>
            )}
            {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default EditProfile;
