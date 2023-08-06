import { useNavigate, useParams } from "react-router-dom";
import GuestForm from "./GuestForm";
import { useEffect, useRef, useState } from "react";
import {
  useDeleteGuestMutation,
  useGetGuestQuery,
  useUpdateGuestMutation,
} from "./guestsApiSlice";
import { useGetCitiesQuery } from "../cities/citiesApiSlice";
import { validateGuest } from "../../util/guestValidation";
import { motion as m } from "framer-motion";

const ViewGuest = () => {
  const [guest, setGuest] = useState({});
  const { id } = useParams();
  const { firstName, lastName, birthdate } = guest;
  const [successful, setSuccessful] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [cityId, setCityId] = useState("");
  const [ok, setOk] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();
  const firstNameRef = useRef();

  const {
    data: cities,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCitiesQuery();
  const { data: guestData } = useGetGuestQuery({ id });
  const [updateGuest] = useUpdateGuestMutation();

  useEffect(() => {
    if (guestData) {
      setGuest(guestData);
    }
  }, [guestData]);

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

  const [deleteGuest] = useDeleteGuestMutation();

  const deleteGuestFun = (id) => {
    deleteGuest({ id: id })
      .unwrap()
      .catch((error) => {
        if (error.status === 500) {
          setSuccessful(true);
          setErrMsg("Guest has a reservation or a room rating");
        }
      });
    setDeleted(true);
    setTimeout(() => {
      navigate("/viewGuests");
    }, 2000);
  };

  const onSubmit = (e, setDisabled) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateGuest(guest);
    if (canSave) {
      try {
        updateGuest(guest);
        setGuest({
          firstName: "",
          lastName: "",
          birthdate: "",
          cityDto: {},
        });
        setErrMsg("");
        setOk(true);
        setOkMsg("Guest has been successfully edited");
        setDisabled(true);
        setTimeout(() => {
          navigate("/viewGuests");
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
    <m.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="container"
    >
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h3 className="text-center m-4">View guest</h3>
          <GuestForm
            id={id}
            firstName={guest.firstName}
            lastName={guest.lastName}
            birthdate={guest.birthdate}
            successful={successful}
            errMsg={errMsg}
            cityId={guest?.cityDto?.id}
            firstNameRef={firstNameRef}
            onFirstNameChange={onFirstNameChange}
            onLastNameChange={onLastNameChange}
            onBirthdateChange={onBirthdateChange}
            onCityChange={onCityChange}
            onSubmit={onSubmit}
            citiesOptions={citiesOptions}
            disabled={true}
            deleteGuestFun={deleteGuestFun}
            edit={true}
            ok={ok}
            okMsg={okMsg}
            deleted={deleted}
          ></GuestForm>
        </div>
      </div>
    </m.div>
  );
};

export default ViewGuest;
