import Head from "next/head";
import styles from "../styles/Button.module.css";
import { Button, Card, Container, Grid, Loading, Text } from "@nextui-org/react";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import React, { useState } from "react";


const EntrerButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
   
      <>
        {loading ? (
          <div className={styles.btn}>
            <a href="#">Loading...</a>
          </div>
        ) : (
         
            <Grid.Container justify="center">
              <Grid justify="center">
                <Text
                  color="white"
                  size="$lg"
                  css={{ position: "absolute", top: "10%", left: "10%" }}
                >
                  Welcome to Chronos
                </Text>
                {error && <Text>{error}</Text>}
              </Grid>

              <div className={styles.btn}>
                <a
                  onClick={() => handleGoogleSignIn()}
                  hidden={loading}
                  href="#"
                >
                  Accès Gmail
                </a>
              </div>
            </Grid.Container>
          
        )}
      </>
  
  );
};

export default EntrerButton;
