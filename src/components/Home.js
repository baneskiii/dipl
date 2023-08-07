import { motion as m } from "framer-motion";
function Home() {
  return (
    <div className="container">
      <m.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        className="row"
        style={{ padding: 1 + "rem" }}
      >
        <div
          className="card col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
          style={{
            backgroundColor: "rgba(0, 157, 255, 0.68)",
            width: 50 + "%",
            height: 10 + "rem",
            padding: 2 + "rem",
          }}
        >
          <h1>Dobrodošli u hotel!</h1>
          <p>
          Možete unositi goste, sobe i rezervacije i pregledati i izmeniti sve potrebne informacije.
          </p>
        </div>
      </m.div>
      <m.div
        className="d-flex justify-content-center bd-highlight mb-2"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
      >
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide col-md-6 bd-highlight border rounded mt-2 shadow"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner border rounded">
            <div className="carousel-item active">
              <img
                src={require("../assets/img/1.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/2.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/3.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/4.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/5.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/6.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/7.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/8.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/9.jpeg")}
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require("../assets/img/10.jpeg")}
                className="d-block w-100"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </m.div>
      <m.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="row"
        style={{ padding: 1 + "rem" }}
      >
        <div
          className="card col-md-6 offset-md-3 border rounded p-3 mt-2 shadow"
          style={{
            backgroundColor: "rgba(0, 157, 255, 0.68)",
            width: 50 + "%",
            height: 5 + "rem",
          }}
        >
          <h4>Uživajte u boravku i lepo se provedite!</h4>
        </div>
      </m.div>
    </div>
  );
}

export default Home;
