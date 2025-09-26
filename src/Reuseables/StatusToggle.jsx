// src/components/DoctorManagement/StatusToggle.js
import React from "react";
import "./DoctorList.css"; // Use the same CSS for consistent styling

const StatusToggle = ({ status, onClick }) => {
  // Determine the class and text based on the status prop
  const isEnabled = status === "active";
  const statusClassName = isEnabled ? "active" : "inactive";
  const statusText = isEnabled ? "Active" : "Inactive";

  return (
    <button className={`status-toggle ${statusClassName}`} onClick={onClick}>
      <span className="status-dot"></span>
      <span className="status-text">{statusText}</span>
    </button>
  );
};

export default StatusToggle;
