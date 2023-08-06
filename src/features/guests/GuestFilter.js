import { motion } from "framer-motion";
function GuestFilter(props) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
    >
      <h4 className="text-center m-3">Search guests</h4>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First name
        </label>
        <input
          type={"text"}
          className="form-control"
          name="firstName"
          value={props.firstName}
          onChange={props.onFirstNameChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          type={"text"}
          className="form-control"
          name="lastName"
          value={props.lastName}
          onChange={props.onLastNameChange}
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
        Search
      </button>
      <button onClick={props.refresh} className="btn btn-outline-primary mx-2">
        Clear
      </button>
    </motion.div>
  );
}
export default GuestFilter;
