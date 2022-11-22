import React from 'react'

<<<<<<< Updated upstream
export default function CreateTeam() {
=======

    if(querySnapshot.empty) {
      const data = {
        team: teamName,
        DMEmail: playerEmail,
        description: des
      };
      setDoc(docRef, data)
      .then(() => {
        console.log("Document has been added successfully");
      })

      navigate("/team");
    }
    else {
      return setError("Team Name already exists");
    }
  }
>>>>>>> Stashed changes
  return (
    <div>
      Create a team
    </div>
  )
}
