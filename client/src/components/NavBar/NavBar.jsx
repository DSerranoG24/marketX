"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../images/MarketX-newlogo (2).png";
import styles from "./NavBar.module.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navigation({ currentPath }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handelrRouter = (value) => {
    localStorage.clear();
    router.push(`/${value}`);
  };

  const routerHome = () => {
    router.push("/home");
  };

  const routerMisProductos = () => {
    router.push("/misProductos");
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  if (status === "loading") {
    return null;
  }

  return (
    <nav className={styles.container}>
      <div className={styles.NavConteiner}>
        <div>
          <Image src={logo} className={styles.logo} onClick={routerHome} />
        </div>

        {/* <li className="nav-item">
                    <Link className="nav-link" href="/favoritos">Productos favoritos</Link>
                  </li> */}

        {currentPath !== "/form" && (
          <div className={styles.btn}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href="/form"
            >
              Publicar Producto
            </Link>
          </div>
        )}

        {currentPath !== "/about" && (
          <div className={styles.btn}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href="/about"
            >
              Sobre MarketX
            </Link>
          </div>
        )}

        {/* <div className={styles.btn}>
                    <Link style={{ textDecoration: "none", color: "inherit" }} href="/loging">Iniciar sesión</Link>
                  </div> */}

        {/* <div className={styles.btn}>
                    <Link style={{ textDecoration: "none", color: "inherit" }} href="/registrarse">Registrarse</Link>
                  </div> */}
        {/* 
                  <div className={styles.btnExit}>
                    <Link style={{ textDecoration: "none", color: "inherit" }} href="/">Salir</Link>
                  </div> */}

        <div className={styles.containerBtnI}>
          <div className={styles.dropdown}>
            <button className={styles.dropdownToggle} onClick={toggleMenu}>
              <h2>|||</h2>
            </button>

            <ul
              className={`${styles.dropdownMenu} ${
                isMenuOpen ? styles.show : ""
              }`}
            >
              {!session ? (
                <>
                  <li
                    className={styles.dropdownItem}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                    onClick={() => handelrRouter("loging")}
                  >
                    Iniciar sesión
                  </li>
                  <li
                    className={styles.dropdownItem}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                    onClick={() => handelrRouter("registrarse")}
                  >
                    Registrarse
                  </li>
                  {/* { currentPath !== '/about' && (
                    <li className={styles.dropdownItem}>
                      <Link style={{ textDecoration: "none", color: "inherit" }} href="/about">Sobre MarketX</Link>
                    </li>
                    )} */}

                  <li
                    className={styles.dropdownItem}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                    onClick={() => handelrRouter("")}
                  >
                    Salir
                  </li>
                </>
              ) : (
                <>
                  <li
                    className={styles.dropdownItem}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                    onClick={routerMisProductos}
                  >
                    mis productos
                  </li>

                  <li
                    className={styles.dropdownItem}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000" })
                    }
                  >
                    Cerrar Sesion
                  </li>
                </>
              )}
            </ul>
          </div>
          {!session ? null : (
            <div>
              <img src={session.user.image} alt="image" />
            </div>
          )}
        </div>

        {/* <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
      </div>
    </nav>
  );
}
