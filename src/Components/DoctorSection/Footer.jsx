// src/components/DoctorManagement/Footer.js

const Footer = ({ activeTab, editingDoctorId, onSave }) => {
  return (
    <>
      <footer className="management-footer">
        {activeTab === "create" && (
          <button className="save-button" onClick={onSave}>
            {editingDoctorId ? "Update" : "Save"}
          </button>
        )}
        <p className="footer-text">Footer Branding</p>
      </footer>
    </>
  );
};

export default Footer;
