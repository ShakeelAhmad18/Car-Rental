import React, { useState, useMemo, useEffect } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { calculateSubTotal, setCity, setDates } from "../redux/bookingSlice";

const safeDate = (date) => {
  if (date instanceof Date) return date;
  if (typeof date === "string" || typeof date === "number")
    return new Date(date);
  return null;
};

const BookingDateTime = ({ bookedIntervals = [] }) => {

  
   const dispatch =useDispatch()
  const { pickupDate: reduxPickup, returnDate: reduxReturn,selectedCar } = useSelector(
    (state) => state.booking
  );

  useEffect(()=>{
    dispatch(setCity(selectedCar?.address?.city));
    dispatch(calculateSubTotal())
  },[reduxPickup, reduxReturn, dispatch, selectedCar])

  

  // Convert Redux dates to valid Date objects
  const initialPickup = safeDate(reduxPickup);
  const initialReturn = safeDate(reduxReturn);

  const [state, setState] = useState([
    {
      startDate: initialPickup,
      endDate: initialReturn,
      key: "selection",
    },
  ]);

  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState("");

  // Convert booked intervals to disabled dates
  const disabledDates = useMemo(() => {
    const dates = [];
    bookedIntervals.forEach(({ start, end }) => {
      const startDate = safeDate(start);
      const endDate = safeDate(end);

      if (!startDate || !endDate) return;

      let current = new Date(startDate);
      while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  }, [bookedIntervals]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    dispatch(
      setDates({
        pickupDate: startDate.toISOString(),
        returnDate: endDate.toISOString()
      })
    );

    // Create new Date instances for safety
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    // Validate dates
    if (!newStart || !newEnd || newStart > newEnd) {
      setError("Invalid date selection");
      return;
    }

    // Check for booking conflicts
    const conflict = bookedIntervals.some(({ start, end }) => {
      const bookedStart = safeDate(start);
      const bookedEnd = safeDate(end);
      return newStart <= bookedEnd && newEnd >= bookedStart;
    });

    if (conflict) {
      setError("Selected dates conflict with existing bookings");
      return;
    }

    setError("");
    setState([
      {
        startDate: newStart,
        endDate: newEnd,
        key: "selection",
      },
    ]);
  };

  const formatDateRange = () => {
    const { startDate, endDate } = state[0];

    if (!startDate || !endDate) return "Select dates";

    try {
      const weekdayOptions = { weekday: "short" };
      const dateOptions = { day: "numeric", month: "short", year: "numeric" };

      const startWeekday = startDate.toLocaleDateString(
        "en-US",
        weekdayOptions
      );
      const startDateStr = startDate.toLocaleDateString("en-US", dateOptions);
      const endWeekday = endDate.toLocaleDateString("en-US", weekdayOptions);
      const endDateStr = endDate.toLocaleDateString("en-US", dateOptions);

      return `${startWeekday}, ${startDateStr} - ${endWeekday}, ${endDateStr}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date selection";
    }
  };
  
  
 
  return (
    <div className="modern-date-picker">
      <div
        className="date-input-container"
        onClick={() => setShowPicker(!showPicker)}
      >
        <div className="date-input">
          <svg className="calendar-icon" viewBox="0 0 24 24">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
          </svg>
          <div className="selected-dates">{formatDateRange()}</div>
          <svg className="chevron-icon" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>
      </div>
      {showPicker && (
        <div className="date-range-container">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={state}
            minDate={new Date()}

            disabledDates={disabledDates}
            rangeColors={["#3b82f6"]}
            className="custom-date-range"
            monthDisplayFormat="MMMM yyyy"
            weekdayDisplayFormat="EEEEEE"
            direction="horizontal"
          />
        </div>
      )}
      {error && (
        <div className="error-message">
          <svg viewBox="0 0 24 24" className="error-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default BookingDateTime;
