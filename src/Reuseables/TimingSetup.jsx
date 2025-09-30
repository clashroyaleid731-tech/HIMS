import { useState } from "react";
import "./TimingSetup.css";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const shifts = ["Morning", "Evening", "Night"];

// const shiftTimeRanges = {
//   Morning: { min: "08:00", max: "16:00" },
//   Evening: { min: "16:00", max: "23:59" },
//   Night: { min: "00:00", max: "08:00" },
// };

export default function TimingSetup({ rows, setRows }) {
  const handleDayChange = (id, day) => {
    const updated = rows.map((row) => (row.id === id ? { ...row, day } : row));
    setRows(updated); // This now calls the PARENT'S state updater
  };

  const toggleShift = (id, shift) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        // Create a copy of the specific row to modify it
        const updatedRow = { ...row };
        const isActive = updatedRow.activeShifts.includes(shift);

        if (isActive) {
          // IMMUTABLE REMOVAL from activeShifts
          updatedRow.activeShifts = updatedRow.activeShifts.filter(
            (s) => s !== shift
          );
          // Also remove the times for that shift
          delete updatedRow.times[shift];
        } else {
          // IMMUTABLE ADDITION to activeShifts
          updatedRow.activeShifts = [...updatedRow.activeShifts, shift];
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleTimeChange = (id, shift, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        // Create deep copies to ensure React detects the change
        const updatedRow = {
          ...row,
          times: {
            ...row.times,
            [shift]: {
              ...row.times[shift],
              [field]: value,
            },
          },
        };

        // --- Validation Logic ---
        const { start, end } = updatedRow.times[shift];
        if (field === "start" && start && end && start > end) {
          updatedRow.times[shift].end = "";
        }

        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), day: "", activeShifts: [], times: {} },
    ]);
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="dynamic-input-horizontal">
      {rows.map((row) => (
        <div className="timing-row" key={row.id}>
          {/* Day Selector */}
          <select
            className="day-dropdown"
            value={row.day}
            onChange={(e) => handleDayChange(row.id, e.target.value)}
          >
            <option value="">Select Day</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <div className="center">❖</div>
          {/* Shifts */}
          <div className="shift-container">
            {shifts.map((shift) => {
              const isActive = row.activeShifts.includes(shift);
              const startTime = row.times[shift]?.start || "";
              const endTime = row.times[shift]?.end || "";

              return (
                <div
                  key={shift}
                  className={`shift-box ${isActive ? "selected" : ""}`}
                  onClick={() => toggleShift(row.id, shift)}
                >
                  <span>{shift}</span>

                  {/* Show time inputs only when active */}
                  {isActive && (
                    <div
                      className="time-inputs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) =>
                          handleTimeChange(
                            row.id,
                            shift,
                            "start",
                            e.target.value
                          )
                        }
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={endTime || undefined}
                        onChange={(e) =>
                          handleTimeChange(row.id, shift, "end", e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Remove Row Button */}
          {rows.length > 1 && (
            <button
              className="remove-button-timing"
              type="button"
              onClick={() => removeRow(row.id)}
            >
              &ndash;
            </button>
          )}
        </div>
      ))}
      {rows.length < 7 && (
        <button className="add-button" type="button" onClick={addRow}>
          + Add Another Day
        </button>
      )}
    </div>
  );
}
