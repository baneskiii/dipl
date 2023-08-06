import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

function RoomForm(props) {
  const [edit, setEdit] = useState(props.edit);
  const [disabled, setDisabled] = useState(props.disabled);

  const submit = (e) => {
    props.onSubmit(e, setDisabled);
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label htmlFor="floor" className="form-label">
          Floor
        </label>
        <input
          ref={props.floorRef}
          type="text"
          className="form-control"
          placeholder="Enter the room floor"
          name="floor"
          value={props.floor}
          onChange={props.onFloorChange}
          disabled={disabled}
        />
      </div>
      <div className="mb-3 col-md-3 form-check">
        <input
          type="checkbox"
          checked={props.status}
          onChange={props.onStatusChange}
          className="form-check-input"
          id="exampleCheck1"
          disabled={disabled}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Occupied
        </label>
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Room type (area, beds)
        </label>
        <select
          value={props.roomTypeId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onRoomTypeChange}
          disabled={disabled}
        >
          <option value={""}>Select a room type</option>
          {props.roomTypesOptions}
        </select>
      </div>
      <div className="mb-3">
        {props.successful ? (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-danger"
            aria-live="assertive"
          >
            {props.errMsg}
          </m.p>
        ) : props.deleted ? (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-success"
            aria-live="assertive"
          >
            Room has been successfully deleted
          </m.p>
        ) : (
          <></>
        )}
        {props.ok ? (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-success"
            aria-live="assertive"
          >
            {props.okMsg}
          </m.p>
        ) : (
          <></>
        )}
      </div>
      <m.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        <button
          type="submit"
          className="btn btn-primary mx-1"
          disabled={disabled}
        >
          Submit
        </button>
        {edit ? (
          <>
            <button
              type="button"
              className="btn btn-outline-primary mx-1"
              onClick={() => setDisabled(!disabled)}
            >
              Edit
            </button>
            {!props.hideButton ? (
              <button
                type="button"
                className="btn btn-info mx-1"
                onClick={() => props.setHidden(!props.hidden)}
              >
                Rate
              </button>
            ) : (
              <></>
            )}

            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={() => props.deleteRoomFun(props.id)}
            >
              Delete
            </button>
          </>
        ) : (
          <></>
        )}
        <Link
          className="btn btn-outline-danger mx-1"
          to={edit ? "/viewRooms" : "/"}
        >
          Cancel
        </Link>
      </m.div>
    </form>
  );
}
export default RoomForm;
