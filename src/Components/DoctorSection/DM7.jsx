import { useState, useRef, useEffect, useCallback } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import DoctorList from "./DoctorList";
import Footer from "./Footer";
import DoctorForm7 from "./DF7";
import Modal from "../../Reuseables/Modal";
import "./DoctorManagement.css";
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
  gender: "Male",
  profilePicture: null,
  bloodGroup: "",
  country: "",
  city: "",
  currentAddress: "",
  permanentAddress: "",
  registrationNumber: "",
  specialization: "",
  qualifications: [
    {
      id: Date.now(),
      institute: "",
      degree: "",
      startYear: "",
      finishYear: "",
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
      startDate: "",
      finishDate: "",
      duration: "",
      durationInMonths: 0,
      description: "",
      employmentType: "",
    },
  ],
  totalExperience: "",
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
  // used for status change
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [doctorToChangeStatus, setDoctorToChangeStatus] = useState(null);
  // used for generic purposes
  const [activeTab, setActiveTab] = useState("create");
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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

  const [timingRows, setTimingRows] = useState([
    { id: Date.now(), days: "", activeShifts: [], times: {} },
  ]);

  // --- NEW HANDLER for toggling the status ---
  const handleStatusToggle = (doctor) => {
    setDoctorToChangeStatus(doctor);
    setStatusModalOpen(true);
  };

  const confirmStatusChange = () => {
    setDoctors((prevDoctors) =>
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
    setTimingRows(
      doctorToEdit.timing && doctorToEdit.timing.length > 0
        ? doctorToEdit.timing
        : [{ id: Date.now(), day: "", activeShifts: [], times: {} }]
    );
    setActiveSection(0);

    setEditingDoctorId(doctorToEdit.id);
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
        { ...formData, id: Date.now(), timing: timingRows, status: "inactive" },
      ]);
      setSuccessMessage("Doctor Added Successfully!");
    }
    setFormData(initialFormState);
    setTimingRows([{ id: Date.now(), days: "", activeShifts: [], times: {} }]);
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // The callback runs whenever a section's visibility changes
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          // Get the index from the section's data attribute
          const newActiveIndex = parseInt(
            intersectingEntry.target.dataset.index,
            10
          );
          // Update the state to match the visible section
          setActiveSection(newActiveIndex);
        }
      },
      {
        root: scrollerRef.current,
        threshold: 0.5, // Trigger when at least 50% of the section is visible
      }
    );

    // Tell the observer which elements to watch
    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup function: stop watching when the component is unmounted
    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeTab]);

  const formatTotalDuration = (totalMonths) => {
    if (totalMonths === 0 || !totalMonths) return "0 months";
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    let result = [];
    if (years > 0) result.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) result.push(`${months} month${months > 1 ? "s" : ""}`);
    return result.join(", ");
  };

  useEffect(() => {
    if (formData.experience && Array.isArray(formData.experience)) {
      // Use reduce to sum up the 'durationInMonths' from each experience item.
      const totalMonths = formData.experience.reduce((sum, exp) => {
        return sum + (Number(exp.durationInMonths) || 0);
      }, 0);

      // Format the final sum and update the state.
      const formattedTotal = formatTotalDuration(totalMonths);
      if (formattedTotal !== formData.totalExperience) {
        setFormData((prev) => ({ ...prev, totalExperience: formattedTotal }));
      }
    }
  }, [formData.experience]);

  const handleDynamicListChange = (listName, id, field, value) => {
    const updatedList = formData[listName].map((item) => {
      // Find the specific item in the list that is being changed
      if (item.id === id) {
        // Create a copy with the direct change
        const updatedItem = { ...item, [field]: value };

        if (
          listName === "certifications" &&
          (field === "issueDate" || field === "expiryDate")
        ) {
          const finalIssueDateStr = updatedItem.issueDate;
          const finalExpiryDateStr = updatedItem.expiryDate;

          if (finalIssueDateStr && finalExpiryDateStr) {
            const issueDateObj = new Date(finalIssueDateStr);
            const expiryDateObj = new Date(finalExpiryDateStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (today >= issueDateObj && today <= expiryDateObj) {
              updatedItem.status = "Active";
            } else if (issueDateObj > today) {
              updatedItem.status = "Invalid";
            } else {
              updatedItem.status = "Expired";
            }
          } else {
            updatedItem.status = "";
          }
        }
        if (
          listName === "experience" &&
          (field === "startDate" || field === "finishDate")
        ) {
          const startDate = new Date(updatedItem.startDate);
          const finishDate = new Date(updatedItem.finishDate);

          if (
            updatedItem.startDate &&
            updatedItem.finishDate &&
            finishDate >= startDate
          ) {
            let years = finishDate.getFullYear() - startDate.getFullYear();
            let months = finishDate.getMonth() - startDate.getMonth();
            if (finishDate.getDate() < startDate.getDate()) months--;
            if (months < 0) {
              years--;
              months += 12;
            }

            // ========== THE FIX, PART 2: Store both formats ==========
            updatedItem.durationInMonths = years * 12 + months;
            updatedItem.duration = formatTotalDuration(years * 12 + months);
          } else {
            updatedItem.durationInMonths = 0;
            updatedItem.duration = "";
          }
        }
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
        employmentType: "",
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
      const filtered = doctors.filter((doctor) =>
        (doctor?.fullName ?? "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [debouncedSearchTerm, doctors]);

  return (
    <>
      <div className="management-container">
        <Header
          activeTab={activeTab}
          editingDoctorId={editingDoctorId}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
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
                rows={timingRows}
                setRows={setTimingRows}
              />
            ) : (
              <div className="list-scroll-container">
                <DoctorList
                  doctors={filteredDoctors}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  onStatusChange={handleStatusToggle}
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
                Are you sure you want to delete the doctor "
                {doctorToDelete?.fullName}"? This action cannot be undone.
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
              <p>
                Are you sure you want to change the status for{" "}
                <strong>{doctorToChangeStatus?.fullName}</strong> to
                <strong>
                  {doctorToChangeStatus?.status === "active"
                    ? " Inactive"
                    : " Active"}
                </strong>
                ?
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
