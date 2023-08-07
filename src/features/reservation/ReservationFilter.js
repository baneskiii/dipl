import { motion as m } from "framer-motion";
export function ReservationFilter(props) {
  return (
    <m.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
    >
      <h4 className="text-center m-3">Pretraživanje rezervacija</h4>
      <div className="mb-3">
        <label htmlFor="dateFrom" className="form-label">
          Datum od (npr. 05-06-2023)
        </label>
        <input
          type="text"
          className="form-control"
          name="dateFrom"
          value={props.dateFrom}
          onChange={props.onDateFromChange}
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
