export const validateRating = ({ rating, guestDto, roomDto }) => {
  let result = {
    canSave: true,
    errorMessage: "",
  };
  if (
    !/^\d$/.test(rating) ||
    roomDto == undefined ||
    guestDto == undefined ||
    Object.keys(guestDto).length === 0 ||
    Object.keys(roomDto).length === 0
  ) {
    result = {
      canSave: false,
      errorMessage: "Rating, guest and room must be entered",
    };
    return result;
  }
  if (Number.parseInt(rating) < 1 || Number.parseInt(rating) > 5) {
    result = {
      canSave: false,
      errorMessage: "Rating must be between 1 and 5",
    };
    return result;
  }
  return result;
};
