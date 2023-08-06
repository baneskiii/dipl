export const validateReservation = ({
  dateFrom,
  dateTo,
  guestDto,
  reservationItemsDtos,
}) => {
  let result = {
    canSave: true,
    errorMessage: "",
  };
  if (
    !(typeof dateFrom === "string") ||
    !(typeof dateTo === "string") ||
    guestDto == undefined ||
    Object.keys(guestDto).length === 0 ||
    reservationItemsDtos.length === 0
  ) {
    result = {
      canSave: false,
      errorMessage:
        "Date from and date to must be a string, client must be selected and items list cannot be empty",
    };
    return result;
  }
  if (
    !/^\d{2}-\d{2}-\d{4}$/.test(dateFrom) ||
    !/^\d{2}-\d{2}-\d{4}$/.test(dateTo)
  ) {
    result = {
      canSave: false,
      errorMessage: "Date from and date to must be in a mentioned format",
    };
    return result;
  }
  return result;
};

export const validateReservationItem = ({ guestDto, roomDto }) => {
  let result = {
    canSave: true,
    errorMessage: "",
  };
  if (
    guestDto == undefined ||
    roomDto == undefined ||
    Object.keys(guestDto).length === 0 ||
    Object.keys(roomDto).length === 0
  ) {
    result = {
      canSave: false,
      errorMessage: "Guest and room must be picked",
    };
    return result;
  }
  return result;
};

export const validateReservationFilter = (dateFrom) => {
  let result = {
    can: true,
    errorMessage: "",
  };
  if (!/^\d{2}-\d{2}-\d{4}$/.test(dateFrom)) {
    result = {
      can: false,
      errorMessage: "Date from must be in mentioned format",
    };
    return result;
  }
  return result;
};
