import React, { useEffect, useState, useRef } from "react";

// REACT DATE RANGE
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// DATE FNS
import format from "date-fns/format";
import { addDays } from "date-fns";

// MATERIAL UI
import DateRangeIcon from "@mui/icons-material/DateRange";

// CSS STYLES
import "../styles/date-range-picker-comp.scss";

export const DateRangePickerComp = ({ setDateStart, setDateEnd }) => {
  // DATE STATE
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 10),
      key: "selection",
    },
  ]);

  setDateStart(format(range[0].startDate, "yyyy-MM-dd"));
  setDateEnd(format(range[0].endDate, "yyyy-MM-dd"));

  // OPEN CLOSE STATE
  const [open, setOpen] = useState(false);

  // GET THE TARGET ELEMENT TO TOGGLE
  const refOne = useRef(null);

  useEffect(() => {
    // SET CURRENT DATE ON COMPONENT LOAD
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // HIDE DROPDOWN ON ESC PRESS
  const hideOnEscape = (e) => {
    if (e.key === "Escape") setOpen(false);
  };

  // HIDE ON OUTSIDE CLICK
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) setOpen(false);
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} до ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
      <div className="date-range-icon" onClick={() => setOpen((open) => !open)}>
        <DateRangeIcon color="inherit" fontSize="inherit" />
      </div>
    </div>
  );
};
