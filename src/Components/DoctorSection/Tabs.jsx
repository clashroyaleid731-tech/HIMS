const Tabs = ({ activeTab, editingDoctorId, onTabClick }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "create" ? "active" : ""}
        onClick={() => onTabClick("create")}
      >
        {editingDoctorId ? "Edit" : "Create"}
      </button>
      {"|"}
      <button
        className={activeTab === "list" ? "active" : ""}
        onClick={() => onTabClick("list")}
      >
        List
      </button>
    </div>
  );
};

export default Tabs;
