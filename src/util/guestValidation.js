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
        "Sistem ne može da zapamti gosta. Ime, prezime i datum rođenja moraju biti string i grad mora biti izabran.",
    };
    return result;
  }
  if (firstName.length < 2 || lastName.length < 2) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti gosta. Ime i prezime moraju imati bar 2 slova.",
    };
    return result;
  }
  if (
    !/^[A-Za-z]{2,15}$/.test(firstName) ||
    !/^[A-Za-z]{2,15}$/.test(lastName)
  ) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti gosta. Ime i prezime moraju imati 2-15 slova.",
    };
    return result;
  }
  if (!/^\d{2}-\d{2}-\d{4}$/.test(birthdate)) {
    result = {
      canSave: false,
      errorMessage: "Sistem ne može da zapamti gosta. Datum rođenja mora biti u navedenom formatu.",
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
      errorMessage: "Sistem ne može da nađe goste po zadatoj vrednosti. Ime i prezime moraju imati 2-15 slova.",
    };
    return result;
  }
  return result;
};
