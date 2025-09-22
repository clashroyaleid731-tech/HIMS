import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import DoctorList from "./DoctorList";
import Footer from "./Footer";
import DoctorForm7 from "./DF7";
import Modal from "../../Reuseables/Modal";
import "./DoctorManagement.css";

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
  currentAddress: "",
  permanentAddress: "",
  registrationNumber: "",
  qualifications: [
    {
      id: Date.now(),
      institute: "",
      degree: "",
      startYear: "",
      finishYear: "",
      specialization: "",
      country: "",
      file: null,
    },
  ],
  certifications: [
    {
      id: Date.now(),
      certifiedBy: "",
      licenseNumber: "",
      issueDate: "",
      expiryDate: "",
      status: "",
      file: null,
    },
  ],
  address: "",
  aboutYou: "",
  feeData: {
    emergency: {
      fee: "",
      duration: "",
      doctorShare: "",
      practiceShare: "",
      paymentMethod: [],
    },
    opd: {
      fee: "",
      duration: "",
      doctorShare: "",
      practiceShare: "",
      paymentMethod: [],
    },
    ipd: {
      fee: "",
      duration: "",
      doctorShare: "",
      practiceShare: "",
      paymentMethod: [],
    },
    online: {
      fee: "",
      duration: "",
      doctorShare: "",
      practiceShare: "",
      paymentMethod: [],
    },
  },
  experience: [
    {
      id: Date.now(),
      experience: "",
      organizationName: "",
      designation: "",
      department: "",
      startYear: "",
      endYear: "",
      duration: "",
      description: "",
    },
  ],
  totalExperience: "",
  employmentType: "",
  timing: [
    {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      shifts: ["Morning", "Evening", "Night"],
    },
  ],
};

const DoctorManagement7 = () => {
  // used for generic purposes
  const [activeTab, setActiveTab] = useState("create");
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  // used for modal pop up
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // used for data and scroll
  const [formData, setFormData] = useState(initialFormState);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const scrollerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setDoctors((prevDoctors) =>
      prevDoctors.filter((doc) => doc.id !== doctorToDelete.id)
    );
    setDeleteModalOpen(false);
    setDoctorToDelete(null);
  };

  const handleEditClick = (doctorToEdit) => {
    setFormData({ ...initialFormState, ...doctorToEdit });
    setEditingDoctorId(doctorToEdit.id);
    setActiveSection(0);
    setActiveTab("create");

    // setTimeout(() => {
    //   if (scrollerRef.current) {
    //     scrollerRef.current.scrollToSection(0);
    //   }
    // }, 0);
  };

  // UPDATED: Save function now shows a modal instead of redirecting
  const handleSave = () => {
    if (editingDoctorId) {
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.id === editingDoctorId
            ? { ...formData, id: editingDoctorId }
            : doctor
        )
      );
      setSuccessMessage("Doctor Updated Successfully!");
    } else {
      setDoctors((prevDoctors) => [
        ...prevDoctors,
        { ...formData, id: Date.now() },
      ]);
      setSuccessMessage("Doctor Added Successfully!");
    }
    setFormData(initialFormState);
    setEditingDoctorId(null);
    setSuccessModalOpen(true);
  };

  const handleFeeDataChange = (newFeeData) => {
    setFormData((prev) => ({
      ...prev,
      feeData: newFeeData,
    }));
  };

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleNext = () => {
    setActiveSection(activeSection + 1);
    scrollToSection(activeSection + 1);
  };

  const handleBack = () => {
    setActiveSection(activeSection - 1);
    scrollToSection(activeSection - 1);
  };

  // ========== THE FIX: USE an IntersectionObserver to sync state with scroll position ==========
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       // The callback runs whenever a section's visibility changes
  //       const intersectingEntry = entries.find((entry) => entry.isIntersecting);
  //       if (intersectingEntry) {
  //         // Get the index from the section's data attribute
  //         const newActiveIndex = parseInt(
  //           intersectingEntry.target.dataset.index,
  //           10
  //         );
  //         // Update the state to match the visible section
  //         setActiveSection(newActiveIndex);
  //       }
  //     },
  //     {
  //       root: scrollerRef.current, // We are watching for intersections inside our scrolling div
  //       threshold: 0.5, // Trigger when at least 50% of the section is visible
  //     }
  //   );

  //   // Tell the observer which elements to watch
  //   const currentRefs = sectionRefs.current;
  //   currentRefs.forEach((ref) => {
  //     if (ref) observer.observe(ref);
  //   });

  //   // Cleanup function: stop watching when the component is unmounted
  //   return () => {
  //     currentRefs.forEach((ref) => {
  //       if (ref) observer.unobserve(ref);
  //     });
  //   };
  // }, [activeTab]);

  const handleDynamicListChange = (listName, id, field, value) => {
    const updatedList = formData[listName].map((item) => {
      // Find the specific item in the list that is being changed
      if (item.id === id) {
        // Create a copy with the direct change
        const updatedItem = { ...item, [field]: value };

        // --- SPECIAL LOGIC: If the changed field was the issueDate ---
        if (field === "issueDate") {
          if (value) {
            // If a date was selected
            const issueDateObj = new Date(value);
            const expiryDateObj = new Date(issueDateObj);
            expiryDateObj.setFullYear(expiryDateObj.getFullYear() + 5);

            // Set the calculated expiryDate
            updatedItem.expiryDate = expiryDateObj.toISOString().split("T")[0];

            // Set the calculated status
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (today >= issueDateObj && today < expiryDateObj) {
              updatedItem.status = "Active";
            } else if (issueDateObj > today) {
              updatedItem.status = "Invalid";
            } else {
              updatedItem.status = "Expired";
            }
          } else {
            // If the date was cleared
            updatedItem.expiryDate = "";
            updatedItem.status = "";
          }
        }
        // if (listName === "experience") {
        //   const start = parseInt(updatedItem.startYear, 10);
        //   const end = parseInt(updatedItem.endYear, 10);

        //   updatedItem.totalExperience = end - start;
        // }
        return updatedItem;
      }
      return item;
    });
    setFormData((prev) => ({ ...prev, [listName]: updatedList }));
  };

  const handleAddItem = (listName) => {
    let newItem;
    if (listName === "qualifications") {
      newItem = {
        id: Date.now(),
        institute: "",
        degree: "",
        startYear: "",
        finishYear: "",
        specialization: "",
        country: "",
        file: null,
      };
    } else if (listName === "certifications") {
      newItem = {
        id: Date.now(),
        certifiedBy: "",
        licenseNumber: "",
        issueDate: "",
        expiryDate: "",
        status: "",
        file: null,
      };
    } else if (listName === "experience") {
      newItem = {
        id: Date.now(),
        experience: "",
        organizationName: "",
        designation: "",
        department: "",
        startYear: "",
        endYear: "",
        duration: "",
        description: "",
      };
    }
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], newItem],
    }));
  };

  const handleRemoveItem = (listName, id) => {
    const updatedList = formData[listName].filter((item) => item.id !== id);
    setFormData((prev) => ({ ...prev, [listName]: updatedList }));
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
              <DoctorForm7
                formData={formData}
                onInputChange={handleInputChange}
                nextSection={handleNext}
                backSection={handleBack}
                activeSection={activeSection}
                ref={scrollerRef}
                onFeeChange={handleFeeDataChange}
                sectionRefs={sectionRefs}
                onSectionChange={setActiveSection}
                onDynamicListChange={handleDynamicListChange}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
              />
            ) : (
              <DoctorList
                doctors={filteredDoctors}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
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
                Are you sure you want to delete the doctor "
                {doctorToDelete?.fullName}"? This action cannot be undone.
              </p>
            </Modal>
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

export default DoctorManagement7;
