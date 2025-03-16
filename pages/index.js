"use client";

import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar";
import styles from "../styles/Button.module.css";
import EntrerButton from "@/components/EntrerButton";

// Import du CircularProgress MUI
import { CircularProgress } from "@mui/material";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <CircularProgress color="primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <span className="text-red-500">
            Erreur d'authentification : {error.message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {user&&<p>Bienvenue {user.displayName}</p>}
      <div className={styles.body}>
        <div className={styles.container}>
          {user ? (
            
            <NavBar user={user} />
          ) : (
            <div className={styles.body}>
              <div className={styles.container}>
                <p>Veuillez vous connecter</p>
                <EntrerButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
