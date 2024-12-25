import React, { useState, useEffect } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import "./styles.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  useEffect(() => {
    // Fetch data from the API
    fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  // Get the current projects to display based on pagination
  const indexOfLastProject = currentPage * recordsPerPage;
  const indexOfFirstProject = indexOfLastProject - recordsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>Kickstarter Projects</h1>
      <Table projects={currentProjects} />
      <Pagination
        totalRecords={projects.length}
        recordsPerPage={recordsPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
