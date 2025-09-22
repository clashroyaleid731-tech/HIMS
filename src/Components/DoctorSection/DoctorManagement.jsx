import { useState } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import DoctorForm from "./Doctorform";
import DoctorList from "./DoctorList";
import Footer from "./Footer";
import "./DoctorManagement.css";

const DoctorManagement = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const initialFormState = {
    fullName: "",
    specialization: "",
    email: "",
    contactNumber: "",
    emergencyContactNumber: "",
    nic: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "Male",
    profilePicture: null,
    bloodGroup: "",
    country: "",
    city: "",
    yearsOfExperience: "",
    registrationNumber: "",
    qualifications: [{ id: Date.now(), value: "" }],
    address: "",
    aboutYou: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- All handler functions remain here in the parent ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (doctorToEdit) => {
    setFormData(doctorToEdit);
    setEditingDoctorId(doctorToEdit.id);
    setActiveTab("create");
  };

  const handleQualificationChange = (id, value) => {
    const updatedQualifications = formData.qualifications.map((q) =>
      q.id === id ? { ...q, value } : q
    );
    setFormData((prev) => ({ ...prev, qualifications: updatedQualifications }));
  };

  const handleAddQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { id: Date.now(), value: "" }],
    }));
  };

  const handleRemoveQualification = (id) => {
    const updatedQualifications = formData.qualifications.filter(
      (q) => q.id !== id
    );
    setFormData((prev) => ({ ...prev, qualifications: updatedQualifications }));
  };

  const handleSave = () => {
    if (editingDoctorId) {
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === editingDoctorId
            ? { ...formData, id: editingDoctorId }
            : doc
        )
      );
    } else {
      setDoctors((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setFormData(initialFormState);
    setEditingDoctorId(null);
    setActiveTab("list");
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="management-container">
        <Header
          activeTab={activeTab}
          editingDoctorId={editingDoctorId}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="management-panel">
          <Tabs
            activeTab={activeTab}
            editingDoctorId={editingDoctorId}
            onTabClick={setActiveTab}
          />

          <main className="content-area">
            {activeTab === "create" ? (
              <DoctorForm
                formData={formData}
                onInputChange={handleInputChange}
                onQualificationChange={handleQualificationChange}
                onAddQualification={handleAddQualification}
                onRemoveQualification={handleRemoveQualification}
              />
            ) : (
              <DoctorList
                doctors={filteredDoctors}
                onEditClick={handleEditClick}
              />
            )}
          </main>
        </div>
        <Footer
          activeTab={activeTab}
          editingDoctorId={editingDoctorId}
          onSave={handleSave}
        />
        <p className="footer-text">Branding......</p>
      </div>
    </>
  );
};

export default DoctorManagement;
