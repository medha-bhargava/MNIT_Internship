import './StudentCredentials.css';

const StudentCredentials = ({ name, userId, password, onClose }) => {
    return (
        <div className="student-credentials-modal">
            <div className="modal-content">
                <h2>Student Approved ✅</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>User ID (Roll No):</strong> {userId}</p>
                <p><strong>Temporary Password:</strong> {password}</p>
                <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
                    Please share these credentials with the student.
                </p>
                <button onClick={onClose} className="close-btn">Close</button>
            </div>
        </div>
    );
};

export default StudentCredentials;
