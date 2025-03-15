'use client';

import { CircularProgress } from "@nextui-org/react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar"; 
import styles from '../styles/Home.module.css';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  console.log("we are starting");

  if (loading) {
    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <CircularProgress color="primary" aria-label="Loading..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <span className="text-red-500">
            Erreur d&apos;authentification : {error.message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.container}>
          {user ? <p>Bienvenue {user.displayName}</p> : <p>Veuillez vous connecter</p>}
        </div>
      </div>
    </div>
  );
}
