'use client';

import { Grid, Loading, Text } from "@nextui-org/react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import NavBar from "./NavBar"; // Assurez-vous que le chemin est correct
import EntrerButton from "@/components/EntrerButton";
import styles from "../styles/Button.module.css";

export default function Home() {
  // Utilisation de `useAuthState` pour récupérer les données utilisateur
  const [user, loading, error] = useAuthState(auth);
console.log("we are starting");
  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.btn}>
            <Grid>
              <Loading textColor="white" size="md" type="points-opacity">
                Loading...
              </Loading>
            </Grid>
          </div>
        </div>
      </div>
    );
  }

  // Gestion des erreurs d'authentification
  if (error) {
    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <Text color="error">
            Erreur d&apos;authentification : {error.message}
          </Text>
        </div>
      </div>
    );
  }

  // Rendu principal de la page
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {/* Affiche NavBar si l'utilisateur est authentifié, sinon EntrerButton */}
        {user ? <NavBar user={user} /> : <EntrerButton />}
      </div>
    </div>
  );
}