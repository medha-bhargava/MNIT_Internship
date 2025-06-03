import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Dropdown from "../Dropdown/Dropdown";
import "./Students.css";

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch("http://localhost:8083/api/students/all");
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setStudents(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchStudents();
    }, []);

    const degrees = ["PhD", "M.Tech", "MS", "B.Tech"];
    const statuses = ["Ongoing", "Completed"];

    // Group students by degree & status for dropdowns
    const groupedData = degrees.map((degree) => {
        return {
            degree,
            statuses: statuses.map((status) => ({
                status,
                students: students.filter(
                    (s) => s.sDegree === degree && s.sStatus === status
                ),
            })),
        };
    });

    return (
        <>
            <Navbar />
            <div className="students-container">
                <h2 className="students-title">Students Supervised</h2>

                {groupedData.map(({ degree, statuses }) => (
                    <Dropdown key={degree} title={degree}>
                        {statuses.map(({ status, students }) => (
                            <Dropdown key={status} title={status}>
                                {students.length > 0 ? (
                                    <ul className=" ul student-list">
                                        {students.map((student, idx) => (
                                            <li key={idx} className="student-item">
                                                <strong>{student.sName}</strong> — {student.sTitle} (
                                                {student.sInstitute}, {student.sYear})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-students">No students found</p>
                                )}
                            </Dropdown>
                        ))}
                    </Dropdown>
                ))}
            </div>
        </>
    );
};

export default Students;
