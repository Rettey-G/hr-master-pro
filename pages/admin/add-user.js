import { useState } from 'react';
import { useRouter } from 'next/router';

const AddUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'employee',
    employeeId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="department_head">Department Head</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;