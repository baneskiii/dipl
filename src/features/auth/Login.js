import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { motion as m } from "framer-motion";
import { GridLoader } from "react-spinners";
import background from "../../assets/img/login-bg.jpg";

const Login = () => {
  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading, isError }] = useLoginMutation();
  const [successful, setSuccessful] = useState(isError);
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setSuccessful(false);
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err?.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err?.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else if (err?.originalStatus === 404) {
        setErrMsg("User not found");
      } else {
        setErrMsg("Login Failed");
      }
      setSuccessful(true);
    }
  };

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <GridLoader
          loading={isLoading}
          color={"rgba(0, 149, 255, 1)"}
        ></GridLoader>
      </div>
    </>
  ) : (
    <div style={{ height: 100 + "vh", backgroundImage: `url(${background})` }}>
      <div className="container">
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-6 col-md-4">
            <m.h2
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ color: "white" }}
            >
              Sign In
            </m.h2>
            <br />
            <form onSubmit={handleSubmit}>
              <m.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: "0%" }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="mb-3"
              >
                <label
                  style={{ color: "white" }}
                  htmlFor="username"
                  className="form-label"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Your username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={handleUsernameInput}
                  value={username}
                  required
                  aria-describedby="emailHelp"
                />
              </m.div>
              <m.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: "0%" }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="mb-3"
              >
                <label
                  style={{ color: "white" }}
                  htmlFor="password"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="form-control"
                  id="password"
                  onChange={handlePasswordInput}
                  value={password}
                  required
                />
              </m.div>
              <div className="mb-3">
                {successful ? (
                  <m.p
                    style={{ paddingTop: 1 + "rem", paddingBottom: 1 + "rem" }}
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                    className="text-danger"
                    aria-live="assertive"
                  >
                    {errMsg}
                  </m.p>
                ) : (
                  <></>
                )}
              </div>
              <m.button
                style={{
                  backgroundColor: "rgb(0,141,247)",
                  borderColor: "rgb(0,141,247)",
                  color: "white",
                }}
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: "0%" }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                type="submit"
                className="btn"
              >
                Submit
              </m.button>
            </form>
          </div>
          <div className="col-6 col-md-4"></div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default Login;
