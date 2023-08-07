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
                  Gosti
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "rgba(80, 175, 234, 0.68)" }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/addGuest"}>
                      Dodaj gosta
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewGuests"}>
                      Pregledaj sve goste
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
                  Sobe
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "rgba(80, 175, 234, 0.68)" }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/addRoom"}>
                      Dodaj sobu
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewRooms"}>
                      Pregledaj sve sobe
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
                  Rezervacije
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "rgba(80, 175, 234, 0.68)" }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/addReservation"}>
                      Dodaj rezervaciju
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/viewReservations"}>
                      Pregledaj sve rezervacije
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {token ? (
              <>
                <li className="nav-item d-flex">Korisnik: {name}</li>
                <li className="nav-item d-flex">
                  <button
                    style={{ color: "rgba(213, 35, 35, 0.68)" }}
                    onClick={logout}
                    className="btn"
                  >
                    Odjava
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
