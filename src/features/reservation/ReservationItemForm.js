export function ReservationItemForm(props) {
  return (
    <form onSubmit={props.onSubmitItem}>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Guest
        </label>
        <select
          value={props.guestId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onGuestChange}
        >
          <option value={""}>Select a guest</option>
          {props.guestsOptions}
        </select>
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Room
        </label>
        <select
          value={props.roomId}
          className="form-select"
          id="inputGroupSelect01"
          onChange={props.onRoomChange}
        >
          <option value={""}>Select a room</option>
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
          Edit
        </button>
      ) : (
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      )}
    </form>
  );
}
export default ReservationItemForm;
