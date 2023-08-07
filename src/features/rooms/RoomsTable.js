import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

export function RoomsTable(props) {
  return (
    <table className="table border shadow">
      <thead>
        <tr>
          <th scope="col">Broj sobe</th>
          <th scope="col">Sprat</th>
          <th scope="col">Akcija</th>
        </tr>
      </thead>
      <tbody>
        {props.rooms.map((room, i) => (
          <m.tr
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: i * 0.15 }}
            key={room.id}
          >
            <td>{room.id}</td>
            <td>{room.floor}</td>
            <m.td
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{ duration: 1, delay: i * 0.15 }}
            >
              <Link className="btn btn-success" to={`/viewRoom/${room.id}`}>
                Pregled
              </Link>
            </m.td>
          </m.tr>
        ))}
      </tbody>
    </table>
  );
}
export default RoomsTable;
