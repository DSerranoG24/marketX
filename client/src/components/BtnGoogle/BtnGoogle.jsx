import React from "react";
import { signIn } from "next-auth/react";
import googleIcon from "../../../public/icons/google (1).png";
import styles from "./BtnGoogle.module.css";
require('dotenv').config()

const {  LOCALHOST } = process.env;

const BtnGoogle = () => {
  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        signIn("google", {
          callbackUrl: `${LOCALHOST}/home`,
        })
      }
    >
      <div className="d-flex aling-items-center">
        <img
          src={googleIcon}
          alt="Google"
          className={styles.icon}
          width={20}
          height={20}
        />
        <span className={styles.text}>Iniciar Sesión con Google</span>
      </div>
    </button>
  );
};

export default BtnGoogle;
