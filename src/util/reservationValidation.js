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
        "Sistem ne može da zapamti rezervaciju. Datum od i datum do moraju biti string, ugovarač mora biti izabran i lista stavki ne može biti prazna.",
    };
    return result;
  }
  if (
    !/^\d{2}-\d{2}-\d{4}$/.test(dateFrom) ||
    !/^\d{2}-\d{2}-\d{4}$/.test(dateTo)
  ) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti rezervaciju.",
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
      errorMessage: "Gost i soba moraju biti izabrani.",
    };
    return result;
  }
  return result;
};

export const validateReservationFilter = (dateFrom, dateTo) => {
  let result = {
    can: true,
    errorMessage: "",
  };
  if(dateFrom == undefined || dateTo == undefined){
    result = {
      can: false,
      errorMessage: "Sistem ne može da nađe rezervacije po zadatoj vrednosti. Datum od i datum moraju biti uneti.",
    };
    return result;
  }
  if(dateFrom.length == 0 || dateTo.length == 0){
    result = {
      can: false,
      errorMessage: "Sistem ne može da nađe rezervacije po zadatoj vrednosti. Datum od i datum moraju biti uneti.",
    };
    return result;
  }
  if (!/^\d{2}-\d{2}-\d{4}$/.test(dateFrom) && !/^\d{2}-\d{2}-\d{4}$/.test(dateTo)) {
    result = {
      can: false,
      errorMessage: "Sistem ne može da nađe rezervacije po zadatoj vrednosti. Datum od i datum do moraju biti u navedenom formatu.",
    };
    return result;
  }
  return result;
};
