import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
// import styles from "./Auth.module.css";
import Modal from "react-modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@material-ui/core";

import { fetchAsyncGetPosts, fetchAsyncGetComments } from "../post/postSlice";

import {
  selectIsLoadingAuth,
  selectOpenSignIn,
  selectOpenSignUp,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncCreateProf,
} from "./authSlice";

const customStyles = {
  overlay: {
    backgroundColor: "#777777",
  },
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 350,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};

const Auth: React.FC = () => {
  Modal.setAppElement("#root");
  const openSignIn = useSelector(selectOpenSignIn);
  const openSignUp = useSelector(selectOpenSignUp);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if((localStorage.getItem('userid') == '-1') || (localStorage.getItem('userid') == null)){
      dispatch(setOpenSignIn());
    }
    else{
      dispatch(resetOpenSignIn());
    }
  },[])

  return (
    <>
      <Modal
        isOpen={openSignUp}
        // onRequestClose={async () => {
        //   await dispatch(resetOpenSignUp());
        // }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ mailaddress: "required" }}
          initialValues={{ mailaddress: "", password: "" }}
          onSubmit={async (values) => {
            await dispatch(fetchCredStart());
            const resultReg = await dispatch(fetchAsyncRegister(values));

            if (fetchAsyncRegister.fulfilled.match(resultReg)) {
              await dispatch(fetchAsyncLogin(values));
              await dispatch(fetchAsyncCreateProf({ username: "anonymous", userid: Number(localStorage.getItem('userid')) }));

              await dispatch(fetchAsyncGetProfs());
              await dispatch(fetchAsyncGetPosts());
              await dispatch(fetchAsyncGetComments());
              await dispatch(fetchAsyncGetMyProf(Number(localStorage.getItem('userid'))));
              await dispatch(resetOpenSignUp());
            }
            await dispatch(fetchCredEnd());
            
          }}
          validationSchema={Yup.object().shape({
            mailaddress: Yup.string()
              .email("email format is wrong")
              .required("email is must"),
            password: Yup.string().required("password is must").min(4),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <h1>GeoMemory</h1>
                  <br />
                  <div>
                    {isLoadingAuth && <CircularProgress />}
                  </div>
                  <br />

                  <TextField
                    placeholder="email"
                    type="input"
                    name="mailaddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mailaddress}
                  />
                  <br />
                  {touched.mailaddress && errors.mailaddress ? (
                    <div>{errors.mailaddress}</div>
                  ) : null}

                  <TextField
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    type="submit"
                  >
                    Register
                  </Button>
                  <br />
                  <br />
                  <span
                    onClick={async () => {
                      await dispatch(setOpenSignIn());
                      await dispatch(resetOpenSignUp());
                    }}
                  >
                    You already have a account ?
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>

      <Modal
        isOpen={openSignIn}
        // onRequestClose={async () => {
        //   await dispatch(resetOpenSignIn());
        // }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ mailaddress: "required" }}
          initialValues={{ mailaddress: "", password: "" }}
          onSubmit={async (values) => {
            await dispatch(fetchCredStart());
            const result = await dispatch(fetchAsyncLogin(values));
            if (result.payload != -1 && fetchAsyncLogin.fulfilled.match(result)) {
              console.log(result)
              await dispatch(fetchAsyncGetProfs());
              await dispatch(fetchAsyncGetPosts());
              await dispatch(fetchAsyncGetComments());
              await dispatch(fetchAsyncGetMyProf(Number(localStorage.getItem('userid'))));

              await dispatch(resetOpenSignIn());
            }
            await dispatch(fetchCredEnd());
          }}
          validationSchema={Yup.object().shape({
            mailaddress: Yup.string()
              .email("email format is wrong")
              .required("email is must"),
            password: Yup.string().required("password is must").min(4),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <h1>GeoMemory</h1>
                  <br />
                  <div>
                    {isLoadingAuth && <CircularProgress />}
                  </div>
                  <br />

                  <TextField
                    placeholder="email"
                    type="input"
                    name="mailaddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mailaddress}
                  />

                  {touched.mailaddress && errors.mailaddress ? (
                    <div>{errors.mailaddress}</div>
                  ) : null}
                  <br />

                  <TextField
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    type="submit"
                  >
                    Login
                  </Button>
                  <br />
                  <br />
                  <span
                    onClick={async () => {
                      await dispatch(resetOpenSignIn());
                      await dispatch(setOpenSignUp());
                    }}
                  >
                    You don't have a account ?
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Auth;