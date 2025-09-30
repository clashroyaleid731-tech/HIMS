const Tabs = ({ activeTab, editingPatientId, onTabClick }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "create" ? "active" : ""}
        onClick={() => onTabClick("create")}
      >
        {editingPatientId ? "Edit" : "Create"}
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
