import { useEffect, useState } from "react";
import { useGetRoomsByFloorQuery, useGetRoomsQuery } from "./roomsApiSlice";
import { validateRoomFilter } from "../../util/roomValidation";
import RoomFilter from "./RoomFilter";
import { RoomsTable } from "./RoomsTable";
import { motion as m } from "framer-motion";

const ViewRooms = () => {
  const [floor, setFloor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [found, setFound] = useState(false);
  const [foundMsg, setFoundMsg] = useState("");

  const { data: roomsData } = useGetRoomsQuery();

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
    }
  }, [roomsData]);

  const { data: roomsDataFloor } = useGetRoomsByFloorQuery({ floor });

  const onFloorChange = (e) => {
    setFloor(e.target.value);
    setErrorMessage("");
    setSuccessful(false);
    setFound(false);
    setFoundMsg("");
  };

  const refresh = () => {
    setRooms(roomsData);
    setFloor("");
    setErrorMessage("");
    setSuccessful(false);
    setFound(false);
    setFoundMsg("");
  };

  const onSubmit = () => {
    if (floor !== undefined && Number(parseInt(floor))) {
      setFloor(parseInt(floor));
      const { can, errorMessage } = validateRoomFilter(floor);
      if (can) {
        setRooms(roomsDataFloor);
      } else {
        setErrorMessage(errorMessage);
        setSuccessful(true);
      }
      if (roomsDataFloor.length > 0) {
        setFound(true);
        setFoundMsg("Sistem je našao sobe po zadatoj vrednosti.");
      } else {
        setErrorMessage("Sistem ne može da nađe sobe po zadatoj vrednosti.");
        setSuccessful(true);
      }
    } else {
      setErrorMessage("Sistem ne može da nađe sobe po zadatoj vrednosti.");
      setSuccessful(true);
    }
  };

  return (
    <div className="container mt-4">
      <RoomFilter
        floor={floor}
        errorMessage={errorMessage}
        successful={successful}
        onFloorChange={onFloorChange}
        refresh={refresh}
        onSubmit={onSubmit}
        _errorMessage={errorMessage}
        found={found}
        foundMsg={foundMsg}
      ></RoomFilter>
      <m.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        className="py-4"
      >
        <RoomsTable rooms={rooms}></RoomsTable>
      </m.div>
    </div>
  );
};

export default ViewRooms;
