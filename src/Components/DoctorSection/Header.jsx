const Header = ({ activeTab, editingDoctorId, searchTerm, onSearchChange }) => {
  return (
    <header className="management-header">
      <h1>{editingDoctorId ? "Edit Doctor" : "Doctor Management"}</h1>
      {activeTab === "list" && (
        <input
          type="search"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={onSearchChange}
        />
      )}
    </header>
  );
};

export default Header;
