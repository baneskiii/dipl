import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoomTypesQuery } from "../roomTypes/roomTypesApiSlice";
import { useAddRoomMutation } from "./roomsApiSlice";
import { validateRoom } from "../../util/roomValidation";
import RoomForm from "./RoomForm";
import { motion as m } from "framer-motion";

const AddRoom = () => {
  const [room, setRoom] = useState({
    floor: "",
    status: false,
    roomTypeDto: {},
  });
  const { floor, status } = room;
  const [successful, setSuccessful] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");
  const [ok, setOk] = useState(false);
  const [okMsg, setOkMsg] = useState("");

  const navigate = useNavigate();
  const floorRef = useRef();

  const { data: roomTypes, isSuccess } = useGetRoomTypesQuery();
  const [addRoom] = useAddRoomMutation();

  useEffect(() => {
    setErrMsg("");
  }, [floor]);

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

  const onSubmit = (e, setDisabled) => {
    e.preventDefault();
    const { canSave, errorMessage } = validateRoom(room);
    if (canSave) {
      try {
        addRoom(room);
        setErrMsg("");
        setOk(true);
        setOkMsg("Sistem je zapamtio sobu.");
        setDisabled(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrMsg(errorMessage);
      setSuccessful(true);
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

  return (
    <m.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="container"
    >
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h3 className="text-center m-4">Dodavanje nove sobe</h3>
          <RoomForm
            floor={floor}
            status={status}
            successful={successful}
            errMsg={errMsg}
            roomTypeId={roomTypeId}
            floorRef={floorRef}
            onFloorChange={onFloorChange}
            onStatusChange={onStatusChange}
            onRoomTypeChange={onRoomTypeChange}
            onSubmit={onSubmit}
            roomTypesOptions={roomTypesOptions}
            disabled={false}
            edit={false}
            ok={ok}
            okMsg={okMsg}
          ></RoomForm>
        </div>
      </div>
    </m.div>
  );
};

export default AddRoom;
