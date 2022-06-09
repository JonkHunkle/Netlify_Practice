import React, { useState } from "react";
import { Grid, Input, Button } from "@mui/material";
import axios from "axios";

export default function Form() {
  const [firstName, setFirstName] = useState(null);
  const [welcome, setWelcome] = useState("welcome! try typing something");
  const nameInput = document.getElementById("nameInput");
  let superSecret = "TEST";

  const handleChange = (e) => {
    setFirstName(e.target.value);
    setWelcome("");
    e.preventDefault();
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
          setWelcome(`look out behind you! its ${firstName}!`);

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
          hello {firstName}
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
      </Grid>
    </>
  );
}
