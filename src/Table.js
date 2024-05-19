import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

function DataTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    console.log(`Initial Page: ${currentPage}`);
    const fetchData = async () => {
      try {
        const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        setData(response.data);
        setCurrentPage(1); // Reset current page to 1 when new data is fetched
      } catch (error) {
        console.error("Failed to fetch data", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const HandlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const maxPage = Math.ceil(data.length / rowsPerPage);

  const HandleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={HandlePrevious} disabled={currentPage === 1}>Previous</button>
        <span> {currentPage} </span>
        <button onClick={HandleNext} disabled={currentPage === maxPage}>Next</button>
      </div>
    </div>
  );
}

export default DataTable;
