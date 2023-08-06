export const validateGuest = ({ firstName, lastName, birthdate, cityDto }) => {
  let result = {
    canSave: true,
    errorMessage: "",
  };
  if (
    !(typeof firstName === "string") ||
    !(typeof lastName === "string") ||
    !(typeof birthdate === "string") ||
    cityDto == undefined ||
    Object.keys(cityDto).length == 0
  ) {
    result = {
      canSave: false,
      errorMessage:
        "First name, last name, birthdate must be a string and a city must be selected",
    };
    return result;
  }
  if (firstName.length < 2 || lastName.length < 2) {
    result = {
      canSave: false,
      errorMessage: "First and last name must have at least 2 letters",
    };
    return result;
  }
  if (
    !/^[A-Za-z]{2,15}$/.test(firstName) ||
    !/^[A-Za-z]{2,15}$/.test(lastName)
  ) {
    result = {
      canSave: false,
      errorMessage: "First and last name must have 2-15 letters",
    };
    return result;
  }
  if (!/^\d{2}-\d{2}-\d{4}$/.test(birthdate)) {
    result = {
      canSave: false,
      errorMessage: "Birthdate must be in a mentioned format",
    };
    return result;
  }
  return result;
};

export const validateGuestFilter = (firstName, lastName) => {
  let result = {
    can: true,
    errorMessage: "",
  };
  if (
    !/^[A-Za-z]{2,15}$/.test(firstName) ||
    !/^[A-Za-z]{2,15}$/.test(lastName)
  ) {
    result = {
      can: false,
      errorMessage: "First and last name can have 2-15 letters",
    };
    return result;
  }
  return result;
};
