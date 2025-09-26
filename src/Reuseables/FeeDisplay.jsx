// src/components/DoctorManagement/FeeDisplay.js
// Use the same CSS file for consistent styling
import "./DoctorList.css";
const FeeDisplay = ({ feeData }) => {
  // 1. Filter out the fee types that have not been filled in.
  const activeFeeTypes = Object.entries(feeData)
    .filter(([key, value]) => value && value.fee) // Only keep fees that have a fee amount
    .map(([key, value]) => ({
      name: key.toUpperCase(), // e.g., 'emergency' -> 'EMERGENCY'
    }));

  // 2. If no fees have been set up, display a message.
  if (activeFeeTypes.length === 0) {
    return <span>No Departments set.</span>;
  }

  // 3. If there are fees, map over them to create a clean display.
  return (
    <div className="fee-display-container">
      {activeFeeTypes.map((fee) => (
        <div key={fee.name} className="fee-item">
          <span className="fee-name">{fee.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FeeDisplay;
