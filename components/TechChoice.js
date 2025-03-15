'use client';
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import styles from ".././styles/Button.module.css";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  Button,
  Grid,
  Loading,
  Input,
  Card,
  Container,
  Row,
  Col,
} from "@nextui-org/react";

import RdvChoice from "./RdvChoice";

export default function TechChoice({ setOption, atelier,setAtelier,editMode , userIn, setEditMode, }) {
  const [tech, setTech] = useState("ND");
  const [repairTime, setRepairTime] = useState(0);

  const [techList, setTechlist] = useState([]);

  const techListRef = collection(db, "staffList");
  useEffect(() => {
    const queryTechList = query(
      techListRef,
      where("job", "==", "Tech"),
      where("service", "==", `${atelier}`),
      orderBy("nom", "asc")
    );
    const unsubscribe = onSnapshot(queryTechList, (querySnapshot) => {
      const techData = [];

      querySnapshot.forEach((doc) => {
        techData.push(doc.data());
      });
      setTechlist(techData);
    });

    return unsubscribe; // cleanup function
  }, []);


  /*HANDLE SUBMIT WORKING ON */

  const carRef = doc(db, "parkingChronos",`${editMode.id}`);
  const lastRepairTime = editMode[`${tech}`]? Number(editMode[`${tech}`].repairTime):0;
  const updatedRepairTime = repairTime+lastRepairTime;
  const techTeams = editMode.techTeamsUpdated? editMode.techTeamsUpdated:[];
  
  
  const handleSubmit= async (element) => {
    try {
      const docRef = await updateDoc(carRef, {
        techTeamsUpdated:[...techTeams,tech],
        [tech]:
        {
        repairTime:updatedRepairTime,
        workingTime:0,
       
          workStatus:"Pending",
          

        },
        step:`${element=="Ajouter"?"Prestation01":"Prestation02"}`,

        
      });
      setEditMode("ND");
      

      

      
    } catch (error) {
      console.log(error);
    }
  };

  return tech === "ND" ? (
    <>
      {techList.map((technician) => (
        <div className={styles.btn} key={technician.nom}>
          <a href="#" onClick={() => setTech(technician.nom)}>
            {technician.nom}
          </a>
        </div>
      ))}
    </>
  ) : (
    <>
      <Container justify="center">
        <Row justify="center">
          <div className={styles.btn}>
            <a
              href="#"
              onClick={() => {
                setTech("ND");
                setRepairTime(0);
              }}
            >
              {tech}
            </a>
          </div>
        </Row>
        <Container>
          <Row>
            <Col>
              <div className={styles.btn}>
                <a href="#" onClick={() => setRepairTime(repairTime + 15)}>
                  +15
                </a>
              </div>
            </Col>
            <Col>
              <div className={styles.btn}>
                <a href="#" onClick={() => setRepairTime(repairTime + 75)}>
                  +75
                </a>
              </div>
            </Col>
          </Row>
        </Container>
        <Container justify="center">
          <Row gap={1} justify="center">
            <Input
              label="Durée en unités"
              color="warning"
              value={repairTime}
              type="number"
              onChange={(e) => setRepairTime(Number(e.target.value))}
            />
          </Row>
          {repairTime!==0&&<Row gap={1} justify="center">
            <div className={styles.btn}>
              <a href="#" onClick={() => handleSubmit("Confirmer")}>
                Confirmer
              </a>
            </div>
            <div className={styles.btn}>
              <a href="#" onClick={() => handleSubmit("Ajouter")}>
                Ajouter
              </a>
            </div>
          </Row>}
        </Container>
      </Container>
    </>
  );
}
