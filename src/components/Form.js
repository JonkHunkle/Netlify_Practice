import React, { useState } from "react";
import { Grid, Input, Button } from "@mui/material";
import axios from "axios";

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [welcome, setWelcome] = useState("welcome! try typing something");
  const nameInput = document.getElementById("nameInput");
  let superSecret = "TEST";
  let imgSrc;

  const handleChange = (e) => {
    setFirstName(e.target.value);
    setWelcome("");
    console.log(e.target.value);
    e.preventDefault();
  };

  const catClick = () => {
    axios
      .get(".netlify/functions/catClick")
      .then((response) => {
        console.log("this is the cat response's data", response);
        const img = response.data.message;
        document.getElementById("catImg").src = img;
      })
      .catch((error) => {
        console.log("this is the cat error", error);
      })
      .then(() => {
        console.log("you clicked the cat button!(front end)");
      });
  };
  const handleClick = () => {
    if (!firstName) {
      setWelcome("you forgot to put in something");
    } else {
      axios
        .post(".netlify/functions/postClick", {
          secret: superSecret,
        })
        .then(function (response) {
          // handle success
          setFirstName("");
          setWelcome(`this is what you just input: ${firstName}!`);
          // nameInput.value = null;
          console.log("the response", response);
        })
        .catch(function (error) {
          // handle error

          console.log("the error", error);
        })
        .then(function () {
          // always executed

          console.log("clicked");
        });
    }
  };

  return (
    <>
      <Grid container spacing={5} p={12} height={"100vh"} width={"100vw"}>
        <Grid item xs={12}>
          {welcome}
        </Grid>
        <Grid item xs={12}>
          I am keeping track of what you type: {firstName}
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder={""}
            value={firstName}
            id="nameInput"
            onChange={handleChange}
          ></Input>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Button
              variant={"contained"}
              style={{ width: "33vw" }}
              onClick={handleClick}
            >
              touch me
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant={"contained"}
              style={{ width: "33vw" }}
              onClick={catClick}
            >
              cat attack
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          pt={4}
          width={"100vw"}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            id={"imgBox"}
            xs={6}
            style={{ height: "33vh", width: "33vw" }}
            border={"2px solid black"}
          >
            <img id="catImg" src={imgSrc} width="150px" alt="cat goes here" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
