const DoctorForm = ({
  formData,
  onInputChange,
  onQualificationChange,
  onAddQualification,
  onRemoveQualification,
}) => {
  return (
    <div className="form-container">
      {/* --- FORM REMAINS THE SAME, NO CHANGES NEEDED HERE --- */}
      <h2>Personal Information</h2>
      <div className="form-grid-tri">
        <div className="form-group">
          {" "}
          <label>Name</label>{" "}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            placeholder="Enter Full Name"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Specialization</label>{" "}
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={onInputChange}
            placeholder="Enter Specialization"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Email</label>{" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="Enter Email"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Contact Number</label>{" "}
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={onInputChange}
            placeholder="Enter Contact Number"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Emergency Contact Number</label>{" "}
          <input
            type="text"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={onInputChange}
            placeholder="Enter Emergency Contact"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>NIC</label>{" "}
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={onInputChange}
            placeholder="Enter NIC"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Date of Birth</label>{" "}
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={onInputChange}
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Marital Status</label>{" "}
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={onInputChange}
          >
            {" "}
            <option value="">Select Marital Status</option>{" "}
            <option value="Single">Single</option>{" "}
            <option value="Married">Married</option>{" "}
            <option value="Divorced">Divorced</option>{" "}
          </select>{" "}
        </div>
        <div className="form-group gender-group">
          {" "}
          <label>Gender</label>{" "}
          <div>
            {" "}
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={onInputChange}
            />{" "}
            Male{" "}
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={onInputChange}
            />{" "}
            Female{" "}
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={onInputChange}
            />
            Other
          </div>
        </div>
      </div>
      <div className="form-grid-tri">
        <div className="form-group">
          <label>Profile Picture</label>{" "}
          <input type="file" name="profilePicture" onChange={onInputChange} />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Blood Group</label>{" "}
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={onInputChange}
          >
            {" "}
            <option value="">Select</option> <option value="A+">A+</option>{" "}
            <option value="A-">A-</option> <option value="B+">B+</option>{" "}
            <option value="B-">B-</option> <option value="AB+">AB+</option>{" "}
            <option value="AB-">AB-</option> <option value="O+">O+</option>{" "}
            <option value="O-">O-</option>{" "}
          </select>{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Country</label>{" "}
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={onInputChange}
            placeholder="Enter Country"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>City</label>{" "}
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onInputChange}
            placeholder="Enter City"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Years of Experience</label>{" "}
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={onInputChange}
            placeholder="Enter Years of Experience"
          />{" "}
        </div>
        <div className="form-group">
          {" "}
          <label>Registration Number</label>{" "}
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={onInputChange}
            placeholder="Enter Registration Number"
          />{" "}
        </div>
        <div className="form-group">
          <label>Qualification & Certification</label>
          {formData.qualifications.map((qual, index) => (
            <div key={qual.id} className="qualification-row">
              <input
                type="text"
                name={`qualification-${index}`}
                value={qual.value}
                onChange={(e) => onQualificationChange(qual.id, e.target.value)}
                placeholder={`Enter Qualification & Certification ${index + 1}`}
              />
              {/* The remove button only shows if there is more than one item */}
              {formData.qualifications.length > 1 && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => onRemoveQualification(qual.id)}
                >
                  &ndash;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-button"
            onClick={onAddQualification}
          >
            + Add Another
          </button>
        </div>
      </div>
      <div className="form-group">
        {" "}
        <label>Address</label>{" "}
        <textarea
          name="address"
          value={formData.address}
          onChange={onInputChange}
          placeholder="Enter Home Address"
        />
        {"  "}
      </div>
      <div className="form-group">
        {" "}
        <br />
        <label> About You</label>{" "}
        <textarea
          name="aboutYou"
          value={formData.aboutYou}
          onChange={onInputChange}
          placeholder="A brief summary about you..."
        />{" "}
      </div>
    </div>
  );
};

export default DoctorForm;
