import React, { useState } from 'react';
import axios from 'axios';
// EmployeeList.js
import './EmployeeList.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [columns, setColumns] = useState({
    EID: true,
    FIRSTNAME: true,
    LASTNAME: true,
    DESIGNATION: true,
    DOB: false,
    EMAIL: true,
    PHONE: true
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employee details');
    }
  };

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <button onClick={fetchEmployees}>View Employees</button>

      <div>
        <h3>Select Columns to Display</h3>
        {Object.keys(columns).map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={columns[col]}
              onChange={() => handleColumnToggle(col)}
            />
            {col}
          </label>
        ))}
      </div>

      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            {Object.keys(columns).map(
              (col) =>
                columns[col] && <th key={col}>{col.replace('_', ' ')}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EID}>
              {Object.keys(columns).map(
                (col) =>
                  columns[col] && <td key={col}>{employee[col] || 'N/A'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;
