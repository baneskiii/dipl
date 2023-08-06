import React, { useEffect, useState } from "react";
import { useGetGuestsByNameQuery, useGetGuestsQuery } from "./guestsApiSlice";
import { validateGuestFilter } from "../../util/guestValidation";
import GuestFilter from "./GuestFilter";
import GuestsTable from "./GuestsTable";
import { motion } from "framer-motion";

const ViewGuests = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [guests, setGuests] = useState([]);
  const [found, setFound] = useState(false);
  const [foundMsg, setFoundMsg] = useState("");

  const { data: guestsData } = useGetGuestsQuery();

  useEffect(() => {
    if (guestsData) {
      setGuests(guestsData);
    }
  }, [guestsData]);

  const { data: guestsDataName } = useGetGuestsByNameQuery({
    firstName,
    lastName,
  });

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setErrorMessage("");
    setSuccessful(false);
    setFound(false);
    setFoundMsg("");
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
    setErrorMessage("");
    setSuccessful(false);
    setFound(false);
    setFoundMsg("");
  };

  const refresh = () => {
    setGuests(guestsData);
    setFirstName("");
    setLastName("");
    setErrorMessage("");
    setSuccessful(false);
    setFound(false);
    setFoundMsg("");
  };

  const onSubmit = () => {
    const { can, errorMessage } = validateGuestFilter(firstName, lastName);
    if (can) {
      setGuests(guestsDataName);
    } else {
      setErrorMessage(errorMessage);
      setSuccessful(true);
    }
    if (guestsDataName.length > 0) {
      setFound(true);
      setFoundMsg("Guests have been successfully found");
    }
  };

  return (
    <div className="container mt-4">
      <div>
        <GuestFilter
          firstName={firstName}
          lastName={lastName}
          errorMessage={errorMessage}
          successful={successful}
          onFirstNameChange={onFirstNameChange}
          onLastNameChange={onLastNameChange}
          refresh={refresh}
          onSubmit={onSubmit}
          _errorMessage={errorMessage}
          found={found}
          foundMsg={foundMsg}
        ></GuestFilter>
      </div>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        className="py-4"
      >
        <GuestsTable guests={guests}></GuestsTable>
      </motion.div>
    </div>
  );
};

export default ViewGuests;
