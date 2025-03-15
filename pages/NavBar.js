'use client';
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Button, Grid, Loading,Spacer,Text } from "@nextui-org/react";
import Link from "next/link";
import Pisteur from "@/components/profiles/Pisteur";
import CPRV from "../components/profiles/CPRV";
import Cs from "@/components/profiles/Cs";
import CE from "@/components/profiles/CE";
import Admin from "@/components/profiles/Admin";
import Tech from "@/components/profiles/Tech";
import Loueur from "@/components/profiles/Loueur";

export default function NavBar({ user }) {
  console.log(user);
  const photoProfil =
    auth.currentUser && auth.currentUser.photoURL
      ? auth.currentUser.photoURL
      : "https://firebasestorage.googleapis.com/v0/b/terminal00.appspot.com/o/cars%2Fanonymous.png?alt=media&token=1bd43fc7-0820-445a-a4bf-33bf481a6c74";

  const [userIn, setUserIn] = useState({ job: "ND", userName: "Inconnu" }); // Initialize user state with default value

  useEffect(() => {
    // Using useEffect hook to fetch the data
    const fetchUser = async () => {
      // Create an async function to fetch the user data
      const userQuery = query(
        collection(db, "staffList"),
        where("email", "==", `${user.email}`)
      );
      const querySnapshot = await getDocs(userQuery); // Fetch the data and wait for the response

      if (!querySnapshot.empty) {
        // Check if querySnapshot is not empty
        const userData = querySnapshot.docs[0].data(); // Get user data from the first document
        setUserIn(userData); // Update the user state with fetched data
      }
    };

    fetchUser(); // Call the async function to fetch the user data
  }, [user]); // Run this effect only on initial render

  return (
    <>
    {userIn.job==="Loueur"&&<Loueur userIn={userIn}></Loueur>}
    {userIn.job==="ND"&&<Grid.Container gap={2} justify="center"><Text color="error" size="x-large" >Adresse email Inconnue. </Text><Spacer y={2}></Spacer><Text color="warning" size="x-large" >Waiting for approval... </Text></Grid.Container>}
    {userIn.job==="SECURITY"&&<Pisteur userIn={userIn}></Pisteur>}
    {userIn.job==="CE"&&<CE userIn={userIn}></CE>}
    {userIn.job==="CPRV"&&<CPRV userIn={userIn}></CPRV>}
    {userIn.job==="CS"&&<Cs userIn={userIn}></Cs>}
    {userIn.job==="Tech"&&<Tech userIn={userIn}></Tech>}
    {userIn.job==="Admin"&&<Admin userIn={userIn}></Admin>}


    </>
  );
}
