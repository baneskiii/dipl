import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

function GuestForm(props) {
  const [edit, setEdit] = useState(props.edit);
  const [disabled, setDisabled] = useState(props.disabled);

  const submit = (e) => {
    props.onSubmit(e, setDisabled);
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First name
        </label>
        <input
          ref={props.firstNameRef}
          type={"text"}
          className="form-control"
          placeholder="Enter the first name"
          name="firstName"
          value={props.firstName}
          onChange={props.onFirstNameChange}
          disabled={disabled}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          type={"text"}
          className="form-control"
          placeholder="Enter your last name"
          name="lastName"
          value={props.lastName}
          onChange={props.onLastNameChange}
          disabled={disabled}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="birthdate" className="form-label">
          Birthdate (e.g. 05-06-2023)
        </label>
        <input
          type={"text"}
          className="form-control"
          placeholder="Enter your birthdate"
          name="birthdate"
          value={props.birthdate}
          onChange={props.onBirthdateChange}
          disabled={disabled}
        />
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          City
        </label>
        <select
          value={props.cityId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onCityChange}
          disabled={disabled}
        >
          <option value={""}>Select a city</option>
          {props.citiesOptions}
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
            Guest has been successfully deleted
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
              className="btn btn-outline-primary"
              onClick={() => setDisabled(!disabled)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={() => props.deleteGuestFun(props.id)}
            >
              Delete
            </button>
          </>
        ) : (
          <></>
        )}

        <Link
          className="btn btn-outline-danger mx-1"
          to={edit ? "/viewGuests" : "/"}
        >
          Cancel
        </Link>
      </m.div>
    </form>
  );
}
export default GuestForm;
