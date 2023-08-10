import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateGuest } from "../../util/guestValidation";
import { useGetCitiesQuery } from "../cities/citiesApiSlice";
import { useAddGuestMutation } from "./guestsApiSlice";
import GuestForm from "./GuestForm";
import { motion } from "framer-motion";

const AddGuest = () => {
  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    cityDto: {},
  });
  const { firstName, lastName, birthdate } = guest;
  const [successful, setSuccessful] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [cityId, setCityId] = useState("");
  const [ok, setOk] = useState(false);
  const [okMsg, setOkMsg] = useState("");

  const navigate = useNavigate();
  const firstNameRef = useRef();

  const {
    data: cities,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCitiesQuery();
  const [addGuest] = useAddGuestMutation();

  useEffect(() => {
    setErrMsg("");
  }, [firstName]);

  const onFirstNameChange = (e) => {
    setGuest({ ...guest, firstName: e.target.value });
    setSuccessful(false);
    setErrMsg("");
  };
  const onLastNameChange = (e) => {
    setGuest({ ...guest, lastName: e.target.value });
    setSuccessful(false);
    setErrMsg("");
  };
  const onBirthdateChange = (e) => {
    setGuest({ ...guest, birthdate: e.target.value });
    setSuccessful(false);
    setErrMsg("");
  };
  const onCityChange = (e) => {
    const selectedCity = cities.find((city) => city.id == e.target.value);
    setGuest({ ...guest, cityDto: selectedCity });
    setCityId(e.target.value);
    setSuccessful(false);
    setErrMsg("");
  };

  const onSubmit = (e, setDisabled) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateGuest(guest);
    if (canSave) {
      try {
        addGuest(guest);
        setErrMsg("");
        setOk(true);
        setOkMsg("Sistem je zapamtio gosta.");
        setDisabled(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    } else {
      setErrMsg(errorMessage);
      setSuccessful(true);
    }
  };

  let citiesOptions;
  if (isSuccess) {
    citiesOptions = cities.map((city) => (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    ));
  }

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="container"
    >
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h3 className="text-center m-4">Dodavanje novog gosta</h3>
          <GuestForm
            firstName={firstName}
            lastName={lastName}
            birthdate={birthdate}
            successful={successful}
            errMsg={errMsg}
            cityId={cityId}
            firstNameRef={firstNameRef}
            onFirstNameChange={onFirstNameChange}
            onLastNameChange={onLastNameChange}
            onBirthdateChange={onBirthdateChange}
            onCityChange={onCityChange}
            onSubmit={onSubmit}
            citiesOptions={citiesOptions}
            disabled={false}
            edit={false}
            ok={ok}
            okMsg={okMsg}
          ></GuestForm>
        </div>
      </div>
    </motion.div>
  );
};

export default AddGuest;
