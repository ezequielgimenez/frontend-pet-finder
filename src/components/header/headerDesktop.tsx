import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as style from "./header.module.css";

export function HeaderForFullWindows() {
  const location = useLocation();

  return (
    <div>
      <div className={style.fullWindow}>
        <div>
          <Link
            to="/"
            className={`${style.navs} ${
              location.pathname === "/" ? style.active : ""
            }`}
          >
            Inicio
          </Link>
        </div>
        <div>
          <Link
            to="/about"
            className={`${style.navs} ${
              location.pathname === "/about" ? style.active : ""
            }`}
          >
            Como funciona Pet Finder
          </Link>
        </div>

        <div>
          <Link
            to="/mascotas-cerca"
            className={`${style.navs} ${
              location.pathname === "/mascotas-cerca" ? style.active : ""
            }`}
          >
            Mascotas perdidas cerca
          </Link>
        </div>
      </div>
    </div>
  );
}
