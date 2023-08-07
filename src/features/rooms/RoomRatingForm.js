import { motion as m } from "framer-motion";
import { useState } from "react";

export function RoomRatingForm(props) {
  const [disabled, setDisabled] = useState(props.disabled);

  const submit = (e) => {
    props.onSubmitRating(e, setDisabled);
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Ocena (1-5)
        </label>
        <input
          ref={props.ratingRef}
          type="text"
          className="form-control"
          placeholder="Unesite ocenu"
          name="rating"
          value={props.rating}
          onChange={props.onRatingChange}
          disabled={disabled}
        />
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Gost
        </label>
        <select
          value={props.guestId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onGuestChange}
          disabled={disabled}
        >
          <option value={""}>Izaberite gosta</option>
          {props.guestsOptions}
        </select>
      </div>

      <div className="mb-3">
        {props.successfulRating ? (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-danger"
            aria-live="assertive"
          >
            {props.errMsgRating}
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
        <button type="submit" className="btn btn-primary">
          Potvrdi
        </button>
        <button
          type="button"
          className="btn btn-outline-danger mx-2"
          onClick={() => props.setHidden(!props.hidden)}
        >
          Otkaži
        </button>
      </m.div>
    </form>
  );
}
export default RoomRatingForm;
