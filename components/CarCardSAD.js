'use client';
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, storage } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Badge, Card, Col, Grid, Image, Row, Spacer, Text } from "@nextui-org/react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function CarCardSAD({ editMode, setOption, setEditMode }) {
  const initialCar = {
    dpt: editMode.dpt,
    brand: editMode.brand,
    photoUrl: "../public/AddSADCars.jpg",
    km:0,
    model:"",
    carburant:0,
    imm:"Immatriculation",
  };
  const carEdited = editMode;
  

  const [carImage, setCarImage] = useState("https://firebasestorage.googleapis.com/v0/b/terminal00.appspot.com/o/parkingSAD%2FAddSADCars.jpg?alt=media&token=e135e3e1-41f9-4064-8f9f-f5f611b37067");

  const spaceRef = ref(storage, `parkingSAD/${carEdited.id}`);

  useEffect(() => {
    getDownloadURL(spaceRef)
      .then((url) => setCarImage(url))
      .catch((err) => console.log(err));
  }, [spaceRef]);

  const [editPic,setEditPic ]=useState("askToEdit");
  const EditPhoto = ()=>{
  
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
  .then(function(stream) {
    var video = document.createElement('video');
    video.srcObject = stream;
    video.onloadedmetadata = function() {
      video.play();
      var canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      var context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // setCarImage(canvas.toDataURL("image/png"));
    
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
    };
  })
  .catch(function(error) {
    console.error('Error accessing camera:', error);
  });}

  return (
    <Grid.Container justify="center">
      <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
        
        <Card>
          <Card.Header>
            
          <Row wrap="wrap" justify="space-between" align="center">
          <Col>
        <Text>{carEdited.dpt}</Text>
        <Text>{carEdited.brand}</Text>
        </Col>
        </Row>
        <Col>
        <Row wrap="wrap" justify="space-between" align="center">
          <Text>{carEdited.model}</Text>
        <Text>{carEdited.imm}</Text>
        </Row></Col>
          </Card.Header>
          <Card.Body>

          <Card.Image
          onClick={()=>EditPhoto(editPic)}
            src= {carImage}
            objectFit="fill"
            alt="Default Image"
            width={200}
            height={300}
            
          />
          </Card.Body>
          <Card.Footer>
          <Row wrap="wrap" justify="space-between" align="center">
        <Text>{carEdited.carburant}</Text>
        <Text>{carEdited.imm}</Text>
        </Row>

        </Card.Footer>
        </Card>
        
      </Grid>
      
    </Grid.Container>
  );
}
