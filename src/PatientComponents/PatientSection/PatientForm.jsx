import CountryCodeInput from "../../Reuseables/CountryCodeInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const patientForm = ({ formData, onInputChange }) => {
  return (
    <Box className="scroller-wrapper">
      <div className="scroller-form-container">
        {/* --- just 1 section here (patient) --- */}
        <section className="form-section">
          <Box className="section-header" mb={1}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Personal Information
            </Typography>
          </Box>

          <Grid className="form-grid-tri" coolumnSpacing={2}>
            <Grid item xs={12} sm={6} md={4} className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={onInputChange}
                placeholder="Enter Full Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <div className="form-group gender-group">
              <label>Gender</label>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={onInputChange}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={onInputChange}
                />
                Female
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
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group">
              <label>Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={onInputChange}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={onInputChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option> <option value="A-">A-</option>
                <option value="B+">B+</option> <option value="B-">B-</option>
                <option value="O+">O+</option> <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="form-group">
              <label>NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={onInputChange}
                placeholder="Enter National ID Card Number"
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <CountryCodeInput
                // type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(value) =>
                  onInputChange({
                    target: { name: "contactNumber", value: value },
                  })
                }
                placeholder="Enter Contact Number"
              />
            </div>
            <div className="form-group">
              <label>Emergency Contact Number</label>
              <CountryCodeInput
                // type="text"
                name="emergencyContactNumber"
                value={formData.emergencyContactNumber}
                onChange={(value) =>
                  onInputChange({
                    target: { name: "emergencyContactNumber", value: value },
                  })
                }
                placeholder="Enter Emergency Contact Number"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label>Area / City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onInputChange}
                placeholder="Enter Area / City"
              />
            </div>
            <div className="form-group full-width-span">
              <div className="address-and-country-grid">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={onInputChange}
                    placeholder="Enter Country"
                  />
                </div>
                <div className="form-group">
                  <label> Current Address</label>
                  <input
                    type="text"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={onInputChange}
                    placeholder="Enter Home Address"
                  />
                </div>
                <div className="form-group">
                  <label>Permanent Address</label>
                  <input
                    type="text"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={onInputChange}
                    placeholder="Enter Permanent Address"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Profile Picture</label>
              <input type="file" name="profilePicture" />
            </div>
          </Grid>
          <div className="form-group full-width">
            <label>About You</label>
            <textarea
              name="aboutYou"
              value={formData.aboutYou}
              onChange={onInputChange}
              placeholder="A brief summary about you..."
            />
          </div>
        </section>
      </div>
    </Box>
  );
};

export default patientForm;
