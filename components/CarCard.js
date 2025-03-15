'use client';
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, storage } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Badge, Card, Grid, Image, Row, Text } from "@nextui-org/react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function CarCard({car, setEditMode}) {
  

  const availabilityColor = () => {
    switch (car.waitingAlerte) {
      case false:
        return {content:"Encours",color:"success"};

      case true:
        return {content:"Waiting",color:"error"};


      default:
        return "warning";
    }
  };
  

  const [carImage, setCarImage] = useState("");

  const spaceRef = ref(storage, `parkingChronos/${car.id}`);

  useEffect(() => {
    getDownloadURL(spaceRef)
      .then((url) => setCarImage(url))
      .catch((err) => console.log(err));
  }, [spaceRef]);

  
  return (
    
    <Card isPressable onPress={()=>setEditMode(car)}>
      { car.step==="Reception02"&&<Card.Header>
      <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{car.csSelected}</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                  RDV : {car.rdvTime}
                </Text>
              </Row>

      </Card.Header>}
      
    <Badge 
   
    color={`${availabilityColor().color}`} content=""  variant="dot" css={{ p: "0" }}
    horizontalOffset="45%"
    verticalOffset="5%">
    <Card.Image
   
      src={carImage}
      
      objectFit="cover"
      width="100%"
      
      height={140}
      alt={"loading.."}
    />


    </Badge>
    <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text color={car.rdv=="RDV"?"success":""} b>{car.rdv}</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                  Arrivee : {car.arrivedAt}
                </Text>
              </Row>
            </Card.Footer>

    </Card>
    
  );
}
