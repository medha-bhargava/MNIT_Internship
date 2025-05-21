import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-item">
      <div className="dropdown-header" onClick={() => setOpen(!open)}>
        <span className="arrow">{open ? '▼' : '▶'}</span>
        {title}
      </div>
      {open && <div className="dropdown-content">{children}</div>}
    </div>
  );
}

export default Dropdown