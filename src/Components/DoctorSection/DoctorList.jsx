// src/components/DoctorManagement/DoctorList.js

import FeeDisplay from "../../Reuseables/FeeDisplay";
import StatusToggle from "../../Reuseables/StatusToggle";

const DoctorList = ({
  doctors,
  onEditClick,
  onDeleteClick,
  onStatusChange,
}) => {
  return (
    <div className="list-container">
      {doctors.length > 0 ? (
        <table className="doctors-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Contact</th>
              <th>Total Experience</th>
              <th>Departments</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>
                  <div className="doctor-name-cell">
                    <span className="doctor-full-name">{doctor.fullName}</span>
                    <span className="doctor-specialization">
                      {doctor.specialization}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="doctor-name-cell">
                    <span className="doctor-full-name">
                      {doctor.contactNumber}
                    </span>
                    <span className="doctor-specialization">
                      Emergency: {doctor.emergencyContactNumber}
                    </span>
                  </div>
                </td>
                <td>{doctor.totalExperience}</td>
                <td>
                  <FeeDisplay feeData={doctor.feeData} />
                </td>
                <td>
                  <StatusToggle
                    status={doctor.status}
                    // Pass a function that calls the parent handler with this specific doctor
                    onClick={() => onStatusChange(doctor)}
                  />
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => onEditClick(doctor)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => onDeleteClick(doctor)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No doctors have been added yet.</p>
      )}
    </div>
  );
};

export default DoctorList;
