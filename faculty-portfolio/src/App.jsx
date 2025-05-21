import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="login-selection">
        <h1 className="title">Welcome to the Faculty Portal</h1>
        <div className="buttons">
          <button className="btn student" onClick={() => navigate('/student-login')}>
            Login as Student
          </button>
          <button className="btn admin" onClick={() => navigate('/admin-login')}>
            Login as Admin
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

