import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";

function Navbar() {
  const name = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-0 shadow">
        <div
          className="container-fluid"
          style={{
            backgroundColor: "rgba(39, 166, 245, 0.91)",
            color: "whitesmoke",
          }}
        >
          <Link
            className="navbar-brand"
            to={"/"}
            style={{ color: "whitesmoke" }}
          >
            Hotel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Guests
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "rgba(80, 175, 234, 0.68)" }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/addGuest"}>
                      Add guest
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewGuests"}>
                      View guests
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Rooms
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "rgba(80, 175, 234, 0.68)" }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/addRoom"}>
                      Add room
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewRooms"}>
                      View rooms
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reservations
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "rgba(80, 175, 234, 0.68)" }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/addReservation"}>
                      Add reservations
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewReservations"}>
                      View reservations
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {token ? (
              <>
                <li className="nav-item d-flex">User: {name}</li>
                <li className="nav-item d-flex">
                  <button
                    style={{ color: "rgba(213, 35, 35, 0.68)" }}
                    onClick={logout}
                    className="btn"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
