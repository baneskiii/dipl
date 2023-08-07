export function ReservationItemForm(props) {
  return (
    <form onSubmit={props.onSubmitItem}>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Gost
        </label>
        <select
          value={props.guestId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onGuestChange}
        >
          <option value={""}>Izaberite gosta</option>
          {props.guestsOptions}
        </select>
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Soba
        </label>
        <select
          value={props.roomId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onRoomChange}
        >
          <option value={""}>Izaberite sobu</option>
          {props.roomsOptions}
        </select>
      </div>
      <div className="mb-3">
        {props.successfulItem ? (
          <p className="text-danger" aria-live="assertive">
            {props.errorMessageItem}
          </p>
        ) : (
          <></>
        )}
        {props.itemAdded ? (
          <p className="text-success" aria-live="assertive">
            {props.itemAddedMessage}
          </p>
        ) : (
          <></>
        )}
      </div>
      {props.edit ? (
        <button type="submit" className="btn btn-primary">
          Izmeni
        </button>
      ) : (
        <button type="submit" className="btn btn-primary">
          Dodaj
        </button>
      )}
    </form>
  );
}
export default ReservationItemForm;
