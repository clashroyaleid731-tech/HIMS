import { useState } from "react";
import "./FeeSetup.css";

const FeePanel = ({ title, data, onDataChange, isDisabled }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Special handling for checkboxes
    if (type === "checkbox") {
      const currentMethods = data.paymentMethod || [];
      const newMethods = checked
        ? [...currentMethods, name]
        : currentMethods.filter((method) => method !== name);
      onDataChange("paymentMethod", newMethods);
    } else {
      onDataChange(name, value);
    }
  };

  return (
    <div className={`fee-panel ${isDisabled ? "disabled" : ""}`}>
      <h3>{title} Fee Setup</h3>
      <div className="fee-grid">
        <div className="form-group full-span">
          <label>Fee</label>
          <input
            type="number"
            name="fee"
            value={data.fee}
            onChange={handleChange}
            placeholder={`Enter ${title} Fee`}
          />
        </div>
        <div className="form-group">
          <label>Consultation Duration (mins)</label>
          <input
            type="text"
            name="duration"
            value={data.duration}
            onChange={handleChange}
            placeholder="e.g., 30"
          />
        </div>
        <div className="form-group revenue-group">
          <label>Revenue Source</label>
          <div className="revenue-inputs">
            <input
              type="number"
              name="doctorShare"
              value={data.doctorShare}
              onChange={handleChange}
              placeholder="Doctor Share %"
            />
            <input
              type="number"
              name="practiceShare"
              value={data.practiceShare}
              onChange={handleChange}
              placeholder="Practice Share %"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <div className="payment-methods">
            <label>
              <input
                type="checkbox"
                name="Cash"
                checked={data.paymentMethod?.includes("Cash")}
                onChange={handleChange}
              />{" "}
              Cash
            </label>
            <label>
              <input
                type="checkbox"
                name="Online"
                checked={data.paymentMethod?.includes("Online")}
                onChange={handleChange}
              />{" "}
              Online
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component for the entire section
const FeeSetup = ({
  feeData,
  onFeeDataChange,
  visibleSections,
  onVisibilityChange,
}) => {
  const feeTypes = [
    { key: "emergency", label: "Emergency" },
    { key: "opd", label: "OPD" },
    { key: "ipd", label: "IPD" },
    { key: "online", label: "Online" },
  ];

  // Handler for the master checkboxes
  const handleVisibilityChange = (e) => {
    const { name, checked } = e.target;
    onVisibilityChange(name, checked);
  };

  // Handler to update the form data in the parent's state
  const handleSectionDataChange = (sectionKey, fieldName, value) => {
    const updatedSectionData = { ...feeData[sectionKey], [fieldName]: value };
    onFeeDataChange({ ...feeData, [sectionKey]: updatedSectionData });
  };

  return (
    <div className="fee-setup-container">
      <div className="fee-selectors">
        {feeTypes.map((type) => (
          <label key={type.key}>
            <input
              type="checkbox"
              name={type.key}
              checked={visibleSections[type.key]}
              onChange={handleVisibilityChange}
            />
            {type.label}
          </label>
        ))}
      </div>

      <div className="fee-panels-grid">
        {feeTypes.map((type) => (
          <FeePanel
            key={type.key}
            title={type.label}
            data={feeData ? feeData[type.key] : {}}
            onDataChange={(fieldName, value) =>
              handleSectionDataChange(type.key, fieldName, value)
            }
            isDisabled={!visibleSections[type.key]}
          />
        ))}
      </div>
    </div>
  );
};

export default FeeSetup;
