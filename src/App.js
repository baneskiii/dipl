import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import Content from "./components/Content";
import Home from "./components/Home";
import AddGuest from "./features/guests/AddGuest";
import ViewGuests from "./features/guests/ViewGuests";
import ViewGuest from "./features/guests/ViewGuest";
import AddRoom from "./features/rooms/AddRoom";
import ViewRooms from "./features/rooms/ViewRooms";
import ViewRoom from "./features/rooms/ViewRoom";
import AddReservation from "./features/reservation/AddReservation";
import ViewReservations from "./features/reservation/ViewReservations";
import ViewReservation from "./features/reservation/ViewReservation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route element={<Content />}>
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />

            <Route path="addGuest" element={<AddGuest />} />
            <Route path="viewGuests" element={<ViewGuests />} />
            <Route path="viewGuest/:id" element={<ViewGuest />} />

            <Route path="addRoom" element={<AddRoom />} />
            <Route path="viewRooms" element={<ViewRooms />} />
            <Route path="viewRoom/:id" element={<ViewRoom />} />

            <Route path="addReservation" element={<AddReservation />} />
            <Route path="viewReservations" element={<ViewReservations />} />
            <Route path="viewReservation/:id" element={<ViewReservation />} />

            <Route path="*" />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
