import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

export function ReservationForm(props) {
  const [edit, setEdit] = useState(props.edit);
  const [disabled, setDisabled] = useState(props.disabled);

  const submit = (e) => {
    props.onSubmit(e, setDisabled);
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label htmlFor="dateFrom" className="form-label">
          Date from (e.g. 05-06-2023)
        </label>
        <input
          ref={props.dateFromRef}
          type="text"
          className="form-control"
          placeholder="Enter date from"
          name="dateFrom"
          value={props.dateFrom}
          onChange={props.onDateFromChange}
          disabled={disabled}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dateTo" className="form-label">
          Date to (e.g. 10-06-2023)
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter date to"
          name="dateTo"
          value={props.dateTo}
          onChange={props.onDateToChange}
          disabled={disabled}
        />
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Client
        </label>
        <select
          value={props.clientId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onClientChange}
          disabled={disabled}
        >
          <option value={""}>Select a client</option>
          {props.clientsOptions}
        </select>
      </div>
      <div className="py-4">
        <m.table
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="table border shadow"
        >
          <thead>
            <tr>
              <th scope="col">Item number</th>
              <th scope="col">Guest</th>
              <th scope="col">Room number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {props.reservationItemsDtos.map((item, i) => (
              <m.tr
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 1, delay: item.itemNumber * 0.6 }}
                key={item.itemNumber}
              >
                <td>{item.itemNumber}</td>
                <td>
                  {item.guestDto?.firstName} {item.guestDto?.lastName}
                </td>
                <td>{item.roomDto?.id}</td>
                <m.td
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  transition={{ duration: 1, delay: item.itemNumber * 0.6 }}
                >
                  {props.edit ? (
                    <button
                      type="button"
                      disabled={disabled}
                      className="btn btn-primary mx-2"
                      onClick={() => props.editItem(i)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      onClick={() => props.deleteItem(i)}
                    >
                      Delete
                    </button>
                  )}
                </m.td>
              </m.tr>
            ))}
          </tbody>
        </m.table>
      </div>
      <div className="mb-3">
        {props.successful ? (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-danger"
            aria-live="assertive"
          >
            {props.errorMessage}
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
              onClick={() => props.deleteReservationFun(props.id)}
            >
              Delete
            </button>
          </>
        ) : (
          <></>
        )}
        <Link
          className="btn btn-outline-danger mx-1"
          to={edit ? "/viewReservations" : "/"}
        >
          Cancel
        </Link>
      </m.div>
    </form>
  );
}
export default ReservationForm;
