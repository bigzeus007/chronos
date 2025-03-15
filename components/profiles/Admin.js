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
  onSnapshot,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { Button, Grid, Loading } from "@nextui-org/react";
import { staffList } from "../techList";

export default function Admin() {
  const handleSubmit = async (list) => {
    try {
      list.forEach((tech) => {

         addDoc(collection(db, "staffList"), tech);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.btn}>
      <a href="#" onClick={() => handleSubmit(staffList)}>
        ADD USER
      </a>
    </div>
  );
}
