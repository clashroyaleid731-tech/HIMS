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

export default function TimingSetup() {
  const [rows, setRows] = useState([{ day: "", activeShifts: [], times: {} }]);

  const handleDayChange = (index, day) => {
    const updated = [...rows];
    updated[index].day = day;
    setRows(updated);
  };

  const toggleShift = (index, shift) => {
    const updated = [...rows];
    if (updated[index].activeShifts.includes(shift)) {
      updated[index].activeShifts = updated[index].activeShifts.filter(
        (s) => s !== shift
      );
    } else {
      updated[index].activeShifts.push(shift);
    }
    setRows(updated);
  };

  const handleTimeChange = (index, shift, field, value) => {
    const updated = [...rows];
    if (!updated[index].times[shift]) updated[index].times[shift] = {};
    updated[index].times[shift][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { day: "", activeShifts: [], times: {} }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="timing-setup">
      {rows.map((row, index) => (
        <div className="timing-row" key={index}>
          {/* Day Selector */}
          <select
            className="day-dropdown"
            value={row.day}
            onChange={(e) => handleDayChange(index, e.target.value)}
          >
            <option value="">Select Day</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          {/* Shifts */}
          <div className="shift-container">
            {shifts.map((shift) => {
              const isActive = row.activeShifts.includes(shift);
              return (
                <div
                  key={shift}
                  className={`shift-box ${isActive ? "selected" : ""}`}
                  onClick={() => toggleShift(index, shift)}
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
                        value={row.times[shift]?.start || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            index,
                            shift,
                            "start",
                            e.target.value
                          )
                        }
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={row.times[shift]?.end || ""}
                        onChange={(e) =>
                          handleTimeChange(index, shift, "end", e.target.value)
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
              className="remove-row-btn"
              type="button"
              onClick={() => removeRow(index)}
            >
              ❌
            </button>
          )}
        </div>
      ))}

      {rows.length < 7 && (
        <button className="add-row-btn" type="button" onClick={addRow}>
          ➕ Add Row
        </button>
      )}
    </div>
  );
}
