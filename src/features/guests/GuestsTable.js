import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

function GuestsTable(props) {
  return (
    <table className="table border shadow">
      <thead>
        <tr>
          <th scope="col">Ime</th>
          <th scope="col">Prezime</th>
          <th scope="col">Akcija</th>
        </tr>
      </thead>
      <tbody>
        {props.guests.map((guest, i) => (
          <m.tr
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: i * 0.15 }}
            key={guest.id}
          >
            <td>{guest.firstName}</td>
            <td>{guest.lastName}</td>
            <m.td
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{ duration: 1, delay: i * 0.15 }}
            >
              <Link
                style={{
                  backgroundColor: "rgba(243, 236, 37, 1)",
                }}
                className="btn btn-outline-warning"
                to={`/viewGuest/${guest.id}`}
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

export default GuestsTable;
