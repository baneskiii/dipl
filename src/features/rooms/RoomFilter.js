import { motion as m } from "framer-motion";
function RoomFilter(props) {
  return (
    <m.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
    >
      <h4 className="text-center m-3">Pretraživanje soba</h4>
      <div className="mb-3">
        <label htmlFor="floor" className="form-label">
          Sprat
        </label>
        <input
          type="text"
          className="form-control"
          name="floor"
          value={props.floor}
          onChange={props.onFloorChange}
          required
        />
      </div>
      <div className="mb-3">
        {props.successful ? (
          <p className="text-danger" aria-live="assertive">
            {props._errorMessage}
          </p>
        ) : (
          <></>
        )}
        {props.found ? (
          <p className="text-success" aria-live="assertive">
            {props.foundMsg}
          </p>
        ) : (
          <></>
        )}
      </div>
      <button onClick={props.onSubmit} className="btn btn-primary mx-2">
        Pretraži
      </button>
      <button onClick={props.refresh} className="btn btn-outline-primary mx-2">
        Resetuj
      </button>
    </m.div>
  );
}
export default RoomFilter;
