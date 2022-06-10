import React, { useState } from "react";
import { Grid, Input, Button } from "@mui/material";
import axios from "axios";

export default function Form() {
  const [firstName, setFirstName] = useState(null);
  const [welcome, setWelcome] = useState("welcome! try typing something");
  const nameInput = document.getElementById("nameInput");
  let superSecret = "TEST";
  let imgSrc;

  const handleChange = (e) => {
    setFirstName(e.target.value);
    setWelcome("");
    e.preventDefault();
  };

  //refactor to make this a serverless function with the .netlify/functions/catClick endpoint

  const catClick = () => {
    axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then((response) => {
        console.log("this is the cat response's data", response.data);
        const img = response.data[0].url;
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
          setFirstName(null);
          nameInput.value = null;
          console.log("the response", response);
        })
        .catch(function (error) {
          // handle error

          console.log("the error", error);
        })
        .then(function () {
          // always executed
          setWelcome(`this is what you just input: ${firstName}!`);

          console.log("clicked");
        });
    }
  };

  return (
    <>
      <Grid container spacing={10} height={"100vh"} alignContent={"center"}>
        <Grid item xs={12}>
          {welcome}
        </Grid>
        <Grid item xs={6}>
          I am keeping track of what you type: {firstName}
        </Grid>
        <Grid item xs={6}>
          <Input
            defaultValue={""}
            id="nameInput"
            onChange={handleChange}
          ></Input>
        </Grid>
        <Grid item xs={12}>
          <Button variant={"contained"} onClick={handleClick}>
            press me for something cool
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant={"contained"} onClick={catClick}>
            this is the cat button
          </Button>
        </Grid>
        <Grid item id={"imgBox"} xs={6} justifyItems={"center"}>
          <img id="catImg" src={imgSrc} alt="cat goes here" />
        </Grid>
      </Grid>
    </>
  );
}
