const SECTIONS = [
  "Personal Information",
  "Qualifications",
  "Experience",
  "timigngs",
  "Fee Sturcture",
];

import { useState } from "react";
import FeeSetup from "../../Reuseables/FeeSetup";
import TimingSetup from "../../Reuseables/TimingSetup";

const DoctorForm7 = ({
  formData,
  onInputChange,
  nextSection,
  backSection,
  activeSection,
  sectionRefs,
  onFeeChange,
  onDynamicListChange,
  onAddItem,
  onRemoveItem,
}) => {
  //   State to control which sections are visible
  const [visibleFeeSections, setVisibleFeeSections] = useState({
    emergency: false,
    opd: false,
    ipd: false,
    online: false,
  });
  const onVisibilityChange = (sectionKey, isVisible) => {
    setVisibleFeeSections((prev) => ({
      ...prev,
      [sectionKey]: isVisible,
    }));
  };
  const handleFeeDataChange = (newFeeData) => {
    onFeeChange(newFeeData);
  };
  // --- NEW: Generate the list of years for the dropdowns ---
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 61 }, (_, i) => currentYear - i); // Creates an array from current year to 60 years ago

  return (
    <div className="scroller-wrapper">
      <div className="scroller-form-container">
        {/* --- SECTION 1: PERSONAL --- */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="form-section"
        >
          <h2>Personal Information</h2>
          <div className="form-grid-tri">
            <div className="form-group">
              {" "}
              <label>Full Name</label>{" "}
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onInputChange}
                placeholder="Enter Full Name"
              />{" "}
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
                />{" "}
                Other{" "}
              </div>{" "}
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
                <option value="Widowed">Widowed</option>{" "}
              </select>{" "}
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
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option> <option value="A-">A-</option>
                <option value="B+">B+</option> <option value="B-">B-</option>
                <option value="O+">O+</option> <option value="O-">O-</option>{" "}
                <option value="AB+">AB+</option>{" "}
                <option value="AB-">AB-</option>
              </select>{" "}
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
                placeholder="Enter Emergency Contact Number"
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
              <label>Area / City</label>{" "}
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onInputChange}
                placeholder="Enter Area / City"
              />{" "}
            </div>
            <div className="form-group full-width-span">
              <div className="address-and-country-grid">
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
                  <label> Current Address</label>{" "}
                  <input
                    type="text"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={onInputChange}
                    placeholder="Enter Home Address"
                  />{" "}
                </div>
                <div className="form-group">
                  {" "}
                  <label>Permanent Address</label>{" "}
                  <input
                    type="text"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={onInputChange}
                    placeholder="Enter Permanent Address"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="form-group">
              {" "}
              <label>Profile Picture</label>{" "}
              <input type="file" name="profilePicture" />{" "}
            </div>
          </div>
          <div className="form-group full-width">
            {" "}
            <label>About You</label>{" "}
            <textarea
              name="aboutYou"
              value={formData.aboutYou}
              onChange={onInputChange}
              placeholder="A brief summary about you..."
            />{" "}
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="form-section"
        >
          <h2>Qualifications and Certifications</h2>
          <div>
            {/* --- LEFT COLUMN: QUALIFICATIONS --- */}
            <div className="split-column">
              <h2>Qualifications</h2>
              {formData.qualifications.map((qual) => (
                <div key={qual.id} className="dynamic-entry-horizontal">
                  <div className="form-group">
                    <label>Institute</label>
                    <input
                      type="text"
                      value={qual.institute}
                      onChange={(e) =>
                        onDynamicListChange(
                          "qualifications",
                          qual.id,
                          "institute",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Harvard Medical School"
                    />
                  </div>
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={qual.degree}
                      onChange={(e) =>
                        onDynamicListChange(
                          "qualifications",
                          qual.id,
                          "degree",
                          e.target.value
                        )
                      }
                      placeholder="e.g., MBBS"
                    />
                  </div>
                  <div className="year-inputs">
                    {" "}
                    {/* A new wrapper for side-by-side layout */}
                    <div className="form-group">
                      <label>Start Year</label>
                      <select
                        value={qual.startYear}
                        onChange={(e) =>
                          onDynamicListChange(
                            "qualifications",
                            qual.id,
                            "startYear",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Finish Year</label>
                      <select
                        value={qual.finishYear}
                        onChange={(e) =>
                          onDynamicListChange(
                            "qualifications",
                            qual.id,
                            "finishYear",
                            e.target.value
                          )
                        }
                        // The dropdown is disabled if no start year is selected
                        disabled={!qual.startYear}
                      >
                        <option value="">Select</option>
                        {/* VALIDATION: Only show years >= the selected start year */}
                        {years
                          .filter((year) => year >= qual.startYear)
                          .map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <input
                      type="text"
                      value={qual.specialization}
                      onChange={(e) =>
                        onDynamicListChange(
                          "qualifications",
                          qual.id,
                          "specialization",
                          e.target.value
                        )
                      }
                      placeholder="e.g.,Surgeons or etc."
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      value={qual.country}
                      onChange={(e) =>
                        onDynamicListChange(
                          "qualifications",
                          qual.id,
                          "country",
                          e.target.value
                        )
                      }
                      placeholder="e.g , Pakistan"
                    />
                  </div>
                  <div className="form-group file-input">
                    <label>Upload Qualification</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        onDynamicListChange(
                          "qualifications",
                          qual.id,
                          "file",
                          e.target.files[0]
                        )
                      }
                    />
                  </div>
                  {formData.qualifications.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => onRemoveItem("qualifications", qual.id)}
                    >
                      &ndash;
                    </button>
                  )}
                </div>
              ))}
              {formData.qualifications.length < 5 && (
                <button
                  type="button"
                  className="add-button"
                  onClick={() => onAddItem("qualifications")}
                >
                  + Add Another Qualification
                </button>
              )}
            </div>

            {/* --- RIGHT COLUMN: CERTIFICATIONS --- */}
            <div className="split-column">
              <h2>Certifications</h2>
              {formData.certifications.map((cert) => (
                <div key={cert.id} className="dynamic-entry-horizontal">
                  <div className="form-group">
                    <label>Certified By</label>
                    <input
                      type="text"
                      value={cert.certifiedBy}
                      onChange={(e) =>
                        onDynamicListChange(
                          "certifications",
                          cert.id,
                          "certifiedBy",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Advanced Cardiac Life Support"
                    />
                  </div>
                  <div className="form-group">
                    <label>License Number</label>
                    <input
                      type="text"
                      value={cert.licenseNumber}
                      onChange={(e) =>
                        onDynamicListChange(
                          "certifications",
                          cert.id,
                          "licenseNumber",
                          e.target.value
                        )
                      }
                      placeholder="enter license number"
                    />
                  </div>
                  <div className="form-group">
                    {" "}
                    <label>Issue Date</label>{" "}
                    <input
                      type="date"
                      name="issueDate"
                      value={cert.issueDate}
                      onChange={(e) => {
                        onDynamicListChange(
                          "certifications",
                          cert.id,
                          "issueDate",
                          e.target.value
                        );
                      }}
                    />{" "}
                  </div>
                  <div className="form-group">
                    {" "}
                    <label>Expiry Date (Auto)</label>{" "}
                    <input
                      type="date"
                      name="expiryDate"
                      value={cert.expiryDate}
                      readOnly
                      disabled
                      onChange={(e) => {
                        onDynamicListChange(
                          "certifications",
                          cert.id,
                          "issueDate",
                          e.target.value
                        );
                      }}
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <div className="status-display-wrapper">
                      {cert.status && (
                        <div
                          className={`status-display ${cert.status.toLowerCase()}`}
                        >
                          <span className="status-icon"></span>
                          <span>{cert.status}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Upload Certificate</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        onDynamicListChange(
                          "certifications",
                          cert.id,
                          "file",
                          e.target.files[0]
                        )
                      }
                    />
                  </div>
                  {formData.certifications.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => onRemoveItem("certifications", cert.id)}
                    >
                      &ndash;
                    </button>
                  )}
                </div>
              ))}
              {formData.certifications.length < 5 && (
                <button
                  type="button"
                  className="add-button"
                  onClick={() => onAddItem("certifications")}
                >
                  + Add Another Certificate
                </button>
              )}
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="form-section"
        >
          <div className="section-header">
            <h2>Experience</h2>
            <div className="form-group">
              {" "}
              <label>Employment Type</label>{" "}
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={onInputChange}
              >
                {" "}
                <option value="">Select</option>
                <option value="Full-time employment">
                  Full-time employment
                </option>
                <option value="Part-time employment">
                  Part-time employment
                </option>
                <option value="Temporary employment">
                  Temporary employment
                </option>
                <option value="Fixed-term employment">
                  Fixed-term employment
                </option>
                <option value="Contract employment">Contract employment</option>
                <option value="Freelance/Independent Contractor">
                  Freelance/Independent Contractor
                </option>
                <option value="Internships">Internships</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Casual employment">Casual employment</option>
                <option value="Seasonal employment">Seasonal employment</option>
              </select>
            </div>
          </div>
          {formData.experience.map((exp, id) => (
            <div className="dynamic-entry-horizontal" key={exp.id}>
              <div className="form-group">
                {" "}
                <label>Organization Name</label>{" "}
                <input
                  type="text"
                  value={exp.organizationName}
                  onChange={(e) =>
                    onDynamicListChange(
                      "experience",
                      exp.id,
                      "organizationName",
                      e.target.value
                    )
                  }
                  placeholder="Enter org. name e.g , WONCA"
                />{" "}
              </div>{" "}
              <br />
              <div className="form-group">
                {" "}
                <label>Designation</label>{" "}
                <input
                  type="text"
                  name="designation"
                  value={exp.designation}
                  onChange={(e) =>
                    onDynamicListChange(
                      "experience",
                      exp.id,
                      "designation",
                      e.target.value
                    )
                  }
                  placeholder="Enter specific medical specialty or role"
                />{" "}
              </div>{" "}
              <br />
              <div className="form-group">
                {" "}
                <label>Department</label>{" "}
                <input
                  type="text"
                  value={exp.department}
                  onChange={(e) =>
                    onDynamicListChange(
                      "experience",
                      exp.id,
                      "department",
                      e.target.value
                    )
                  }
                  placeholder="Enter your department."
                />{" "}
              </div>{" "}
              <br />
              <div className="year-inputs">
                {" "}
                <div className="form-group">
                  <label>Start Year</label>
                  <select
                    value={exp.startYear}
                    onChange={(e) =>
                      onDynamicListChange(
                        "experience",
                        exp.id,
                        "startYear",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Finish Year</label>
                  <select
                    value={exp.endYear}
                    onChange={(e) =>
                      onDynamicListChange(
                        "experience",
                        exp.id,
                        "endYear",
                        e.target.value
                      )
                    }
                    disabled={!exp.startYear}
                  >
                    <option value="">Select</option>
                    {/* VALIDATION: Only show years >= the selected start year */}
                    {years
                      .filter((year) => year >= exp.startYear)
                      .map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="form-group">
                {" "}
                <label>Duration</label>{" "}
                <input
                  type="number"
                  min={0}
                  value={exp.duration}
                  onChange={(e) =>
                    onDynamicListChange(
                      "experience",
                      exp.id,
                      "duration",
                      e.target.value
                    )
                  }
                  placeholder="Enter your duration (can't be negative)."
                />{" "}
              </div>
              <br />
              {formData.experience.length > 1 && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => onRemoveItem("experience", exp.id)}
                >
                  &ndash;
                </button>
              )}
            </div>
          ))}
          {formData.experience.length < 5 && (
            <button
              type="button"
              className="add-button"
              onClick={() => onAddItem("experience")}
            >
              + Add Another Experience
            </button>
          )}
        </section>

        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="form-section"
        >
          <h2>Availability & Timings</h2>
          <TimingSetup />
        </section>

        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="form-section"
        >
          <h2>Fees</h2>
          <FeeSetup
            feeData={formData.feeData}
            onFeeDataChange={handleFeeDataChange}
            visibleSections={visibleFeeSections}
            onVisibilityChange={onVisibilityChange}
          />
        </section>
      </div>

      <footer className="scroller-footer">
        {activeSection > 0 && (
          <button className="nav-button" onClick={backSection}>
            Back
          </button>
        )}
        {activeSection < SECTIONS.length - 1 && (
          <button className="nav-button" onClick={nextSection}>
            Next
          </button>
        )}
      </footer>
    </div>
  );
};

export default DoctorForm7;
