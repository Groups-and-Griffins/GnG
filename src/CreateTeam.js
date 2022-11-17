import React from 'react'
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import { Button } from 'react-bootstrap';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap} from 'firebase/firestore';
export default function CreateTeam() {

  async function handleSubmit(e) {
    var id = fire.auth().currentUser.uid;
    //const teamRef = collection(db, 'teams');
    var teamName = "dragonBallZ"
    const docRef = doc(db, "teams", teamName);

    const data = {
      team: teamName,
      email: "myemail.com"
    }
    setDoc(docRef, data)
    .then(() => {
      console.log("Document has been added successfully");
    })
  }
  return (
    <div>
      Create a team
      <Button onClick = {handleSubmit} className="w-20 mt-4">Create team</Button>
    </div>
  )
}
