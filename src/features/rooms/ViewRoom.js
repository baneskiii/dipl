import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRoomTypesQuery } from "../roomTypes/roomTypesApiSlice";
import {
  useDeleteRoomMutation,
  useGetRoomQuery,
  useGetRoomsQuery,
  useUpdateRoomMutation,
} from "./roomsApiSlice";
import { useGetGuestsQuery } from "../guests/guestsApiSlice";
import { useAddRoomRatingMutation } from "../roomRating/roomRatingApiSlice";
import { validateRoom } from "../../util/roomValidation";
import { validateRating } from "../../util/roomRatingValidation";
import RoomForm from "./RoomForm";
import { RoomRatingForm } from "./RoomRatingForm";
import { motion as m } from "framer-motion";

const ViewRoom = () => {
  const [room, setRoom] = useState({});
  const { id } = useParams();
  const { floor, status, roomTypeDto } = room;
  const [successful, setSuccessful] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");
  const [ok, setOk] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [okRating, setOkRating] = useState(false);
  const [okMsgRating, setOkMsgRating] = useState("");
  const [deleted, setDeleted] = useState(false);

  const [roomRating, setRoomRating] = useState({
    rating: "",
    guestDto: {},
    roomDto: {},
  });
  const { rating, guestDto, roomDto } = roomRating;

  const [successfulRating, setSuccessfulRating] = useState(false);
  const [errMsgRating, setErrMsgRating] = useState("");
  const [guestId, setGuestId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [hidden, setHidden] = useState(true);
  const [hideButton, setHideButton] = useState(false);

  const navigate = useNavigate();
  const floorRef = useRef();
  const ratingRef = useRef();

  const { data: roomTypes, isSuccess } = useGetRoomTypesQuery();
  const { data: guests, isSuccess: isSuccessGuests } = useGetGuestsQuery();
  const { data: rooms, isSuccess: isSuccessRooms } = useGetRoomsQuery();
  const { data: roomData } = useGetRoomQuery({ id });
  const [updateRoom] = useUpdateRoomMutation();
  const [addRoomRating] = useAddRoomRatingMutation();

  useEffect(() => {
    if (roomData) {
      setRoom(roomData);
    }
  }, [roomData]);

  useEffect(() => {
    setErrMsg("");
  }, [floor]);

  useEffect(() => {
    setErrMsgRating("");
  }, [rating]);

  const onFloorChange = (e) => {
    setRoom({ ...room, floor: e.target.value });
    setSuccessful(false);
    setErrMsg("");
  };
  const onStatusChange = () => {
    setRoom({ ...room, status: !status });
    setSuccessful(false);
    setErrMsg("");
  };
  const onRoomTypeChange = (e) => {
    const selectedRoomType = roomTypes.find(
      (roomType) => roomType.id == e.target.value
    );
    setRoom({ ...room, roomTypeDto: selectedRoomType });
    setRoomTypeId(e.target.value);
    setSuccessful(false);
    setErrMsg("");
  };

  const onRatingChange = (e) => {
    setRoomRating({ ...roomRating, rating: e.target.value, roomDto: room });
    setSuccessfulRating(false);
    setErrMsgRating("");
  };

  const onGuestChange = (e) => {
    const selectedGuest = guests.find((guest) => guest.id == e.target.value);
    setRoomRating({ ...roomRating, guestDto: selectedGuest });
    setGuestId(e.target.value);
    setSuccessfulRating(false);
    setErrMsgRating("");
  };

  const [deleteRoom] = useDeleteRoomMutation();

  const deleteRoomFun = (id) => {
    deleteRoom({ id: id })
      .unwrap()
      .catch((error) => {
        if (error.status === 500) {
          setSuccessful(true);
          setErrMsg(
            "Sistem ne može da obriše sobu. Soba ima rezervaciju ili ocenu sobe."
          );
        }
      });
    setDeleted(true);
    setTimeout(() => {
      navigate("/viewRooms");
    }, 2000);
  };

  const onSubmit = (e, setDisabled) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateRoom(room);
    if (canSave) {
      try {
        updateRoom(room);
        setRoom({
          floor: "",
          status: "",
          roomTypeDto: {},
        });
        setErrMsg("");
        setOk(true);
        setOkMsg("Sistem je zapamtio sobu.");
        setDisabled(true);
        setTimeout(() => {
          navigate("/viewRooms");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrMsg(errorMessage);
      setSuccessful(true);
    }
  };

  const onSubmitRating = (e, setDisabled) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateRating(roomRating);
    if (canSave) {
      try {
        addRoomRating(roomRating);
        setErrMsgRating("");
        setOk(true);
        setOkMsg("Sistem je zapamtio ocenu sobe.");
        setDisabled(true);
        setTimeout(() => {
          setHidden(!hidden);
          setHideButton(true);
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrMsgRating(errorMessage);
      setSuccessfulRating(true);
    }
  };

  let roomTypesOptions;
  if (isSuccess) {
    roomTypesOptions = roomTypes.map((roomType) => (
      <option key={roomType.id} value={roomType.id}>
        {roomType.area}m^2, {roomType.beds} kreveta
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

  return (
    <m.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="container"
    >
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <p className="text-success" aria-live="assertive">
            Sistem je učitao sobu.
          </p>
          <h3 className="text-center m-4">Pregled sobe</h3>
          <RoomForm
            id={id}
            floor={floor}
            status={status}
            successful={successful}
            errMsg={errMsg}
            roomTypeId={room?.roomTypeDto?.id}
            floorRef={floorRef}
            onFloorChange={onFloorChange}
            onStatusChange={onStatusChange}
            onRoomTypeChange={onRoomTypeChange}
            onSubmit={onSubmit}
            roomTypesOptions={roomTypesOptions}
            disabled={true}
            deleteRoomFun={deleteRoomFun}
            edit={true}
            ok={ok}
            okMsg={okMsg}
            deleted={deleted}
            hidden={hidden}
            setHidden={setHidden}
            hideButton={hideButton}
          ></RoomForm>
        </div>
        {!hidden ? (
          <m.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow"
          >
            <h4 className="text-center m-4">Ocena sobe</h4>
            <RoomRatingForm
              rating={rating}
              successfulRating={successfulRating}
              errMsgRating={errMsgRating}
              guestId={guestId}
              ratingRef={ratingRef}
              onRatingChange={onRatingChange}
              onGuestChange={onGuestChange}
              onSubmitRating={onSubmitRating}
              guestsOptions={guestsOptions}
              disabled={false}
              ok={okRating}
              okMsg={okMsgRating}
              hidden={hidden}
              setHidden={setHidden}
            ></RoomRatingForm>
          </m.div>
        ) : (
          <></>
        )}
      </div>
    </m.div>
  );
};

export default ViewRoom;
