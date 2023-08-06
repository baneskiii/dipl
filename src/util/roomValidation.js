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
      errorMessage: "Floor and room type must be selected",
    };
    return result;
  }
  if (!Number.isInteger(parseInt(floor))) {
    result = {
      canSave: false,
      errorMessage: "Floor value must be a number",
    };
    return result;
  }
  if (parseInt(floor) < 0) {
    result = {
      canSave: false,
      errorMessage: "Floor value must a 0 or a positive number smaller than 10",
    };
    return result;
  }
  if (floor.length > 1) {
    result = {
      canSave: false,
      errorMessage: "Floor value must a 0 or a positive number smaller than 10",
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
      errorMessage: "Floor must be a 0 or a positive number smalled than 10",
    };
    return result;
  }
  return result;
};
