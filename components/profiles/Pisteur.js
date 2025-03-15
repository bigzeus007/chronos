import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../../firebase";
import styles from "../../styles/Button.module.css";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Button, Grid, Loading } from "@nextui-org/react";
import Link from "next/link";
import TakePicture from "../TakePicture";
import BrandChoice from "../BrandChoice";
import PisteurParc from "../PisteurParc";

export default function Pisteur() {
  const [option, setOption] = useState("ND");





  return option === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setOption("ENTREE")}>
          Entrée
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setOption("PARC")}>Parc</a>
      </div>
    </>
  ) : option === "ENTREE" ? (
    <BrandChoice setOption={setOption}></BrandChoice>
  ) :option === "PARC" ? (
    < PisteurParc setOption={setOption} ></PisteurParc>
  ) : (
    <div>error</div>
  );
}
