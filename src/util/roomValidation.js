export const validateRoom = ({ floor, status, roomTypeDto }) => {
  let result = {
    canSave: true,
    errorMessage: "",
  };
  if (
    floor.length == 0 ||
    roomTypeDto == undefined ||
    Object.keys(roomTypeDto).length === 0
  ) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti sobu. Sprat i vrsta sobe moraju biti uneti.",
    };
    return result;
  }
  if (!Number.isInteger(parseInt(floor))) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti sobu. Sprat mora biti broj.",
    };
    return result;
  }
  if (parseInt(floor) < 0) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti sobu. Sprat može biti 0 ili pozitivan broj manji od 10.",
    };
    return result;
  }
  if (floor.length > 1) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti sobu. Sprat može biti 0 ili pozitivan broj manji od 10.",
    };
    return result;
  }
  return result;
};

export const validateRoomFilter = (floor) => {
  let result = {
    can: true,
    errorMessage: "",
  };
  if (floor < 0 || floor > 9) {
    result = {
      can: false,
      errorMessage: "Sistem ne može da nađe sobe po zadatoj vrednosti. Sprat može biti 0 ili pozitivan broj manji od 10.",
    };
    return result;
  }
  return result;
};
