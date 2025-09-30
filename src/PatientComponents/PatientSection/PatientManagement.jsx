import { useState, useRef, useEffect, useCallback } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import DoctorList from "./PatientList";
import Footer from "./Footer";
import DoctorForm7 from "./PatientForm";
import Modal from "../../Reuseables/Modal";
import "./PatientManagement.css";
import { debounce } from "lodash";

const initialFormState = {
  status: "inactive",
  fullName: "",
  email: "",
  contactNumber: "",
  emergencyContactNumber: "",
  nic: "",
  dateOfBirth: "",
  maritalStatus: "",
  gender: "",
  profilePicture: null,
  bloodGroup: "",
  country: "",
  city: "",
  currentAddress: "",
  permanentAddress: "",
  registrationNumber: "",
  aboutYou: "",
};

const PatientManagement = () => {
  // used for status change
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  // used for generic purposes
  const [activeTab, setActiveTab] = useState("create");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // used for modal pop up
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // used for data and scroll
  const [formData, setFormData] = useState(initialFormState);

  // --- NEW HANDLER for toggling the status ---
  // const handleStatusToggle = (doctor) => {
  //   setDoctorToChangeStatus(doctor);
  //   setStatusModalOpen(true);
  // };

  const confirmStatusChange = () => {
    setPatients((prevDoctors) =>
      prevDoctors.map((doc) => {
        if (doc.id === doctorToChangeStatus.id) {
          // Flip the status
          const newStatus = doc.status === "active" ? "inactive" : "active";
          return { ...doc, status: newStatus };
        }
        return doc;
      })
    );
    // Close the modal and clear the state
    setStatusModalOpen(false);
    setDoctorToChangeStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = (doctor) => {
    setPatientToDelete(doctor);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setPatients((prevDoctors) =>
      prevDoctors.filter((doc) => doc.id !== patientToDelete.id)
    );
    setDeleteModalOpen(false);
    setPatientToDelete(null);
  };

  const handleEditClick = (patientToEdit) => {
    setFormData({ ...initialFormState, ...patientToEdit });
    setEditingPatientId(patientToEdit.id);

    setEditingPatientId(patientToEdit.id);
    setActiveTab("create");

    // setTimeout(() => {
    //   if (scrollerRef.current) {
    //     scrollerRef.current.scrollToSection(0);
    //   }
    // }, 0);
  };

  // UPDATED: Save function now shows a modal instead of redirecting
  const handleSave = () => {
    if (editingPatientId) {
      setPatients((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.id === editingPatientId
            ? { ...formData, id: editingPatientId }
            : doctor
        )
      );
      setSuccessMessage("Patient Updated Successfully!");
    } else {
      setPatients((prevDoctors) => [
        ...prevDoctors,
        { ...formData, id: Date.now(), status: "inactive" },
      ]);
      setSuccessMessage("Patient Added Successfully!");
    }
    setFormData(initialFormState);
    setEditingPatientId(null);
    setSuccessModalOpen(true);
  };

  const debouncedSetSearch = useCallback(
    debounce((nextValue) => setDebouncedSearchTerm(nextValue), 500),
    []
  );
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSetSearch(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = patients.filter((doctor) =>
        (doctor?.fullName ?? "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [debouncedSearchTerm, patients]);

  return (
    <>
      <div className="management-container">
        <Header
          activeTab={activeTab}
          editingPatientId={editingPatientId}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <div className="management-panel">
          <Tabs
            activeTab={activeTab}
            editingPatientId={editingPatientId}
            onTabClick={setActiveTab}
          />

          <main className="content-area">
            {activeTab === "create" ? (
              <DoctorForm7
                formData={formData}
                onInputChange={handleInputChange}
              />
            ) : (
              <div className="list-scroll-container">
                <DoctorList
                  patients={filteredPatients}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  // onStatusChange={handleStatusToggle}
                />
              </div>
            )}

            <Modal
              isOpen={isSuccessModalOpen}
              onClose={() => setSuccessModalOpen(false)}
              title="Success"
              footer={
                <button
                  className="modal-button-primary"
                  onClick={() => setSuccessModalOpen(false)}
                >
                  OK
                </button>
              }
            >
              <p>{successMessage}</p>
            </Modal>

            <Modal
              isOpen={isDeleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              title="Confirm Deletion"
              footer={
                <>
                  <button
                    className="modal-button-secondary"
                    onClick={() => setDeleteModalOpen(false)}
                  >
                    No
                  </button>
                  <button
                    className="modal-button-danger"
                    onClick={confirmDelete}
                  >
                    Yes, Delete
                  </button>
                </>
              }
            >
              <p>
                Are you sure you want to delete the Patient "
                {patientToDelete?.fullName}"? This action cannot be undone.
              </p>
            </Modal>

            {/* --- RENDER THE NEW MODAL --- */}
            <Modal
              isOpen={isStatusModalOpen}
              onClose={() => setStatusModalOpen(false)}
              title="Confirm Status Change"
              footer={
                <>
                  <button
                    className="modal-button-secondary"
                    onClick={() => setStatusModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-button-primary"
                    onClick={confirmStatusChange}
                  >
                    Yes, Change Status
                  </button>
                </>
              }
            >
              {/* <p>
                Are you sure you want to change the status for{" "}
                <strong>{doctorToChangeStatus?.fullName}</strong> to
                <strong>
                  {doctorToChangeStatus?.status === "active"
                    ? " Inactive"
                    : " Active"}
                </strong>
                ?
              </p> */}
            </Modal>
          </main>
        </div>
        <Footer
          activeTab={activeTab}
          editingPatientId={editingPatientId}
          onSave={handleSave}
        />
        <p className="footer-text">Branding......</p>
      </div>
    </>
  );
};

export default PatientManagement;
