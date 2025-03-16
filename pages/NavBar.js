"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
//import EntrerButton from "@/components/EntrerButton";
import styles from "../styles/Button.module.css";

// Import MUI
import { CircularProgress } from "@mui/material";

// Import de vos composants internes
import Pisteur from "@/components/profiles/Pisteur";
import CE from "@/components/profiles/CE";
import Admin from "@/components/profiles/Admin";

export default function NavBar({ user }) {
  const [userIn, setUserIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.email) {
        try {
          const userQuery = query(
            collection(db, "staffList"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserIn(userData);
          } else {
            console.error("Utilisateur non trouvé dans staffList.");
          }
        } catch (error) {
          console.error("Erreur Firebase:", error);
        }
      } else {
        console.warn("Objet user indisponible ou email manquant.");
      }
      setLoading(false);
    };

    if (user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user]);

  // if (!user) {
  //   return (
  //     <div className={styles.body}>
  //       <div className={styles.container}>
  //         <p>Veuillez vous connecter</p>
  //         <EntrerButton />
  //       </div>
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress color="primary" />
        <p className="mt-2">Chargement de l'utilisateur...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">
        Impossible de charger le profil.
      </div>
    );
  }

  return (
    <>
      {userIn.job === "Loueur" && <div>Profil Loueur</div>}
      {userIn.job === "SECURITY" && <Pisteur userIn={user} />}
      {userIn.job === "CE" && <CE userIn={user} />}
      {userIn.job === "Admin" && <Admin userIn={user} />}
      {/* Ajoutez d'autres cas métier ici */}
    </>
  );
}
