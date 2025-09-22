// src/components/DoctorManagement/DoctorList.js

const DoctorList = ({ doctors, onEditClick, onDeleteClick }) => {
  return (
    <div className="list-container">
      {doctors.length > 0 ? (
        <table className="doctors-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.fullName}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.email}</td>
                <td>{doctor.contactNumber}</td>
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
