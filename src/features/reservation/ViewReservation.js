import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGuestsQuery } from "../guests/guestsApiSlice";
import { useGetRoomsQuery } from "../rooms/roomsApiSlice";
import {
  useDeleteReservationMutation,
  useGetReservationQuery,
  useUpdateReservationMutation,
} from "./reservationsApiSlice";
import { validateReservation } from "../../util/reservationValidation";
import ReservationForm from "./ReservationForm";
import ReservationItemForm from "./ReservationItemForm";
import { motion as m } from "framer-motion";

const ViewReservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({
    id: id,
    dateFrom: "",
    dateTo: "",
    guestDto: {},
    reservationItemsDtos: [],
  });
  const [reservationItem, setReservationItem] = useState({
    index: "",
    itemNumber: "",
    guestDto: {},
    roomDto: {},
  });

  const { dateFrom, dateTo, guestDto, reservationItemsDtos } = reservation;
  const [successful, setSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulItem, setSuccessfulItem] = useState(false);
  const [errorMessageItem, setErrorMessageItem] = useState("");
  const [itemAdded, setItemAdded] = useState(false);
  const [itemAddedMessage, setItemAddedMessage] = useState("");
  const [clientId, setClientId] = useState("");
  const [guestId, setGuestId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [ok, setOk] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();
  const dateFromRef = useRef();

  const { data: guests, isSuccess: isSuccessGuests } = useGetGuestsQuery();
  const { data: rooms, isSuccess: isSuccessRooms } = useGetRoomsQuery();
  const { data: reservationData } = useGetReservationQuery({ id });
  const [updateReservation] = useUpdateReservationMutation();

  useEffect(() => {
    if (reservationData) {
      setReservation(reservationData);
    }
  }, [reservationData]);

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
    console.log(reservation);
    console.log(reservationItem);
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

  const [deleteReservation] = useDeleteReservationMutation();

  const deleteReservationFun = (id) => {
    deleteReservation({ id: id });
    setOk(true);
    setOkMsg("Sistem je obrisao podatke o rezervaciji.");
    setTimeout(() => {
      navigate("/viewReservations");
    }, 2000);
  };

  const onSubmit = (e, setDisabled) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateReservation(reservation);
    if (canSave) {
      try {
        updateReservation(reservation);
        setErrorMessage("");
        setOk(true);
        setOkMsg("Sistem je zapamtio rezervaciju.");
        setDisabled(true);
        setTimeout(() => {
          navigate("/viewReservations");
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
    const items = [...reservation.reservationItemsDtos];
    let present = false;
    const guest = items[reservationItem.index].guestDto;
    const room = items[reservationItem.index].roomDto;
    if (guest.id == reservationItem.guestDto.id) {
      present = true;
    }
    for (let i = 0; i < items.length; i++) {
      const guest = items[i].guestDto;
      if (guest.id == reservationItem.guestDto.id) {
        present = true;
      }
    }
    if (present && room.id == reservationItem.roomDto.id) {
      setSuccessfulItem(true);
      setErrorMessageItem("Gost već postoji");
      setItemAdded(false);
      setItemAddedMessage("");
      return;
    }
    const result = reservationItemsDtos.map((item, i) => {
      if (i == reservationItem.index) {
        const updatedGuest = reservationItem.guestDto;
        const updatedRoom = reservationItem.roomDto;
        return {
          ...item,
          guestDto: updatedGuest,
          roomDto: updatedRoom,
        };
      }
      return item;
    });
    setSuccessful(false);
    setErrorMessage("");
    setItemAdded(true);
    setItemAddedMessage("Stavka je izmenjena.");
    setReservation({
      ...reservation,
      dateFrom: dateFrom,
      dateTo: dateTo,
      guestDto: guestDto,
      reservationItemsDtos: result,
    });
  };

  const editItem = (index) => {
    setReservationItem({
      ...reservationItem,
      index: index,
      guestDto: reservationItemsDtos[index].guestDto,
      roomDto: reservationItemsDtos[index].roomDto,
    });
    setSuccessful(false);
    setErrorMessage("");
    setSuccessfulItem(false);
    setErrorMessageItem("");
    setItemAdded(false);
    setItemAddedMessage("");
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
          <p className="text-success" aria-live="assertive">
            Sistem je učitao rezervaciju.
          </p>
          <h4 className="text-center m-4">Pregled rezervacije</h4>
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
                id={id}
                dateFrom={dateFrom}
                dateTo={dateTo}
                reservationItemsDtos={reservationItemsDtos}
                errorMessage={errorMessage}
                successful={successful}
                clientId={guestDto?.id}
                dateFromRef={dateFromRef}
                onDateFromChange={onDateFromChange}
                onDateToChange={onDateToChange}
                onClientChange={onClientChange}
                onSubmit={onSubmit}
                editItem={editItem}
                clientsOptions={clientsOptions}
                deleteReservationFun={deleteReservationFun}
                edit={true}
                disabled={true}
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
                guestId={reservationItem?.guestDto?.id}
                roomId={reservationItem?.roomDto?.id}
                onGuestChange={onGuestChange}
                onRoomChange={onRoomChange}
                onSubmitItem={onSubmitItem}
                guestsOptions={guestsOptions}
                roomsOptions={roomsOptions}
                edit={true}
              ></ReservationItemForm>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default ViewReservation;
