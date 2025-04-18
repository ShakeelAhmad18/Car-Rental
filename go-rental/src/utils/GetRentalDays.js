

export const getRentalDays = (pickupDate, returnDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diff = Math.abs(returnDate.getTime() - pickupDate.getTime());
    const days = Math.round(diff / oneDay);
    const rentalDays = days === 0 ? 1 : days; // ensure minimum 1
    return rentalDays;
  };

