const PatientList = ({
  patients,
  onEditClick,
  onDeleteClick,
  onStatusChange,
}) => {
  return (
    <div className="list-container">
      {patients.length > 0 ? (
        <table className="doctors-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Contact</th>
              {/* <th>Status</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <div className="doctor-name-cell">
                    <span className="doctor-full-name">{patient.fullName}</span>
                  </div>
                </td>
                <td>
                  <div className="doctor-name-cell">
                    <span className="doctor-full-name">
                      {patient.contactNumber}
                    </span>
                    <span className="doctor-specialization">
                      Emergency: {patient.emergencyContactNumber}
                    </span>
                  </div>
                </td>
                {/* <td>
                  <StatusToggle
                    status={patient.status}
                    // Pass a function that calls the parent handler with this specific patient
                    onClick={() => onStatusChange(patient)}
                  />
                </td> */}
                <td>
                  <button
                    className="edit-button"
                    onClick={() => onEditClick(patient)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => onDeleteClick(patient)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Patients have been added yet.</p>
      )}
    </div>
  );
};

export default PatientList;
