const Footer = ({ activeTab, editingPatientId, onSave }) => {
  return (
    <>
      <footer className="management-footer">
        {activeTab === "create" && (
          <button className="save-button" onClick={onSave}>
            {editingPatientId ? "Update" : "Save"}
          </button>
        )}
        <p className="footer-text">Footer Branding</p>
      </footer>
    </>
  );
};

export default Footer;
