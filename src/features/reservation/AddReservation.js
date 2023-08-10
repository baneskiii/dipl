import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetGuestsQuery } from "../guests/guestsApiSlice";
import { useGetAvailableRoomsQuery } from "../rooms/roomsApiSlice";
import {
  validateReservation,
  validateReservationItem,
} from "../../util/reservationValidation";
import { useAddReservationMutation } from "./reservationsApiSlice";
import { ReservationForm } from "./ReservationForm";
import { ReservationItemForm } from "./ReservationItemForm";
import { motion as m } from "framer-motion";

const AddReservation = () => {
  const [reservation, setReservation] = useState({
    dateFrom: "",
    dateTo: "",
    guestDto: {},
    reservationItemsDtos: [],
  });
  const [reservationItem, setReservationItem] = useState({
    itemNumber: 1,
    guestDto: {},
    roomDto: {},
  });
  const { dateFrom, dateTo, reservationItemsDtos } = reservation;
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [errorMessageItem, setErrorMessageItem] = useState("");
  const [successfulItem, setSuccessfulItem] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [itemAddedMessage, setItemAddedMessage] = useState("");
  const [clientId, setClientId] = useState("");
  const [guestId, setGuestId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [ok, setOk] = useState(false);
  const [okMsg, setOkMsg] = useState("");

  const navigate = useNavigate();
  const dateFromRef = useRef();

  const { data: guests, isSuccess: isSuccessGuests } = useGetGuestsQuery();
  const { data: rooms, isSuccess: isSuccessRooms } =
    useGetAvailableRoomsQuery();
  const [addReservation] = useAddReservationMutation();

  useEffect(() => {
    setErrorMessage("");
  }, [dateFrom]);

  const onDateFromChange = (e) => {
    setReservation({ ...reservation, dateFrom: e.target.value });
    setSuccessful(false);
    setErrorMessage("");
  };
  const onDateToChange = (e) => {
    setReservation({ ...reservation, dateTo: e.target.value });
    setSuccessful(false);
    setErrorMessage("");
  };

  const onClientChange = (e) => {
    const client = guests.find((guest) => guest.id == e.target.value);
    setReservation({ ...reservation, guestDto: client });
    setClientId(e.target.value);
    setSuccessful(false);
    setErrorMessage("");
  };

  const onGuestChange = (e) => {
    const selectedGuest = guests.find((guest) => guest.id == e.target.value);
    setReservationItem({ ...reservationItem, guestDto: selectedGuest });
    setGuestId(e.target.value);
    setSuccessfulItem(false);
    setErrorMessageItem("");
    setItemAdded(false);
    setItemAddedMessage("");
  };

  const onRoomChange = (e) => {
    const selectedRoom = rooms.find((room) => room.id == e.target.value);
    setReservationItem({ ...reservationItem, roomDto: selectedRoom });
    setRoomId(e.target.value);
    setSuccessfulItem(false);
    setErrorMessageItem("");
    setItemAdded(false);
    setItemAddedMessage("");
  };

  const onSubmit = (e, setDisabled) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateReservation(reservation);
    if (canSave) {
      try {
        addReservation(reservation);
        setErrorMessage("");
        setOk(true);
        setOkMsg("Sistem je zapamtio rezervaciju.");
        setDisabled(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMessage(errorMessage);
      setSuccessful(true);
    }
  };

  const onSubmitItem = (e) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateReservationItem(reservationItem);
    if (canSave) {
      if (reservationItemsDtos.length == 0) {
        reservationItemsDtos.push(reservationItem);
      } else {
        const items = [...reservation.reservationItemsDtos];
        let present = false;
        for (let i = 0; i < items.length; i++) {
          const guest = items[i].guestDto;
          if (guest.id == reservationItem.guestDto.id) {
            present = true;
          }
        }
        if (present) {
          setItemAdded(false);
          setItemAddedMessage("");
          setSuccessfulItem(true);
          setErrorMessageItem("Gost već postoji.");
          return;
        } else {
          reservationItemsDtos.push(reservationItem);
        }
      }
      setSuccessful(false);
      setErrorMessage("");
      setItemAdded(true);
      setItemAddedMessage("Stavka je dodata.");
      setItemNumber();
    } else {
      setErrorMessageItem(errorMessage);
      setSuccessfulItem(true);
    }
  };

  const setItemNumber = () => {
    const copy = [...reservation.reservationItemsDtos];
    if (copy.length == 0) {
      return;
    }
    for (let i = 0; i < copy.length; i++) {
      const item = copy[i];
      item.itemNumber = i + 1;
    }
    setReservation({
      dateFrom: dateFrom,
      dateTo: dateTo,
      guestDto: reservation.guestDto,
      reservationItemsDtos: copy,
    });
  };

  const deleteItem = (index) => {
    const copy = [...reservation.reservationItemsDtos];
    copy.splice(index, 1);
    setReservation({
      dateFrom: dateFrom,
      dateTo: dateTo,
      guestDto: reservation.guestDto,
      reservationItemsDtos: copy,
    });
    setSuccessfulItem(false);
    setErrorMessageItem("");
  };

  let clientsOptions;
  if (isSuccessGuests) {
    clientsOptions = guests.map((guest) => (
      <option key={guest.id} value={guest.id}>
        {guest.firstName} {guest.lastName}
      </option>
    ));
  }

  let guestsOptions;
  if (isSuccessGuests) {
    guestsOptions = guests.map((guest) => (
      <option key={guest.id} value={guest.id}>
        {guest.firstName} {guest.lastName}
      </option>
    ));
  }

  let roomsOptions;
  if (isSuccessRooms) {
    roomsOptions = rooms.map((room) => (
      <option key={room.id} value={room.id}>
        {room.id}
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
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
          <h4 className="text-center m-4">Dodavanje nove rezervacije</h4>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Rezervacija
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Stavka
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex="0"
            >
              <br />
              <ReservationForm
                dateFrom={dateFrom}
                dateTo={dateTo}
                reservationItemsDtos={reservationItemsDtos}
                errorMessage={errorMessage}
                successful={successful}
                clientId={clientId}
                dateFromRef={dateFromRef}
                onDateFromChange={onDateFromChange}
                onDateToChange={onDateToChange}
                onClientChange={onClientChange}
                onSubmit={onSubmit}
                deleteItem={deleteItem}
                clientsOptions={clientsOptions}
                edit={false}
                ok={ok}
                okMsg={okMsg}
              ></ReservationForm>
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex="0"
            >
              <br />
              <ReservationItemForm
                errorMessageItem={errorMessageItem}
                successfulItem={successfulItem}
                itemAdded={itemAdded}
                itemAddedMessage={itemAddedMessage}
                guestId={guestId}
                roomId={roomId}
                onGuestChange={onGuestChange}
                onRoomChange={onRoomChange}
                onSubmitItem={onSubmitItem}
                guestsOptions={guestsOptions}
                roomsOptions={roomsOptions}
                edit={false}
              ></ReservationItemForm>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default AddReservation;
