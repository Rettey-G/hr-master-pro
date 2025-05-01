import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://junior-joy-hr-pro.onrender.com/api/reports');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById('report-content');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  return (
    <div>
      <div id="report-content">
        <h1>Employee Reports</h1>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.salaryUSD}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default Reports;