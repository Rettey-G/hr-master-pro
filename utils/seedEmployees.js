const mongoose = require('mongoose');
const User = require('../userModel');
const connectDB = require('../dbConfig');

const nationalities = ['Maldivian', 'Indian', 'Sri Lankan', 'Bangladeshi', 'Nepali'];
const departments = ['HR', 'Finance', 'IT', 'Operations', 'Marketing'];
const cities = ['Male', 'Addu', 'Fuvahmulah', 'Kulhudhuffushi', 'Thinadhoo'];
const worksites = ['Head Office', 'Branch 1', 'Branch 2', 'Warehouse', 'Remote'];

function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seedEmployees() {
  try {
    await connectDB();
    await User.deleteMany({});

    const employees = [];
    for (let i = 1; i <= 100; i++) {
      const employee = {
        username: `user${i}`,
        password: 'password123',
        role: 'employee',
        employeeId: `EMP${String(i).padStart(3, '0')}`,
        empNo: `E${String(i).padStart(4, '0')}`,
        name: `Employee ${i}`,
        idNumber: `A${String(i).padStart(6, '0')}`,
        gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)],
        nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
        dob: generateRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)),
        mobileWork: `+960 ${Math.floor(1000000 + Math.random() * 9000000)}`,
        designation: `Staff ${Math.floor(Math.random() * 5) + 1}`,
        department: departments[Math.floor(Math.random() * departments.length)],
        workSite: worksites[Math.floor(Math.random() * worksites.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        joinedDate: generateRandomDate(new Date(2015, 0, 1), new Date(2023, 0, 1)),
        salaryUSD: Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000,
        salaryMVR: Math.floor(Math.random() * (46000 - 15000 + 1)) + 15000,
        accountUSD: `USD${String(i).padStart(8, '0')}`,
        accountMVR: `MVR${String(i).padStart(8, '0')}`
      };
      employees.push(employee);
    }

    await User.insertMany(employees);
    console.log('Successfully seeded 100 employee records');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding employees:', error);
    process.exit(1);
  }
}

seedEmployees();