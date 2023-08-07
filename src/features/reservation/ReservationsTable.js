import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

export function ReservationsTable(props) {
  return (
    <table className="table border shadow">
      <thead>
        <tr>
          <th scope="col">Datum od</th>
          <th scope="col">Datum do</th>
          <th scope="col">Akcija</th>
        </tr>
      </thead>
      <tbody>
        {props.reservations.map((reservation, i) => (
          <m.tr
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: i * 0.15 }}
            key={reservation.id}
          >
            <td>{reservation.dateFrom}</td>
            <td>{reservation.dateTo}</td>
            <m.td
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{ duration: 1, delay: i * 0.15 }}
            >
              <Link
                style={{ backgroundColor: "rgba(62, 197, 196, 1)" }}
                className="btn btn-outline-success mx-2"
                to={`/viewReservation/${reservation.id}`}
              >
                Pregled
              </Link>
            </m.td>
          </m.tr>
        ))}
      </tbody>
    </table>
  );
}
