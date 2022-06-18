import React, { useState } from "react";
import { Grid, Input, Button } from "@mui/material";

import axios from "axios";
import AllCats from "./AllCats";

export default function Form() {
  const [catName, setCatName] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText("You are typing something");
    setCatName(e.target.value);
    e.preventDefault();
  };
  const catClick = () => {
    setText("You clicked the cat button");
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
    setText("you clicked the clicky button!");
  };

  const newCat = () => {
    setText(`You called for another cat named ${catName}!`);
    axios
      .post(".netlify/functions/addCat", { name: catName })
      .then((response) => {
        console.log("this is the newCat response's data", response);
      })
      .catch((error) => {
        console.log("this is the newCat error", error);
      });
  };

  return (
    <>
      <Grid container spacing={5} p={12} height={"100vh"} width={"100vw"}>
        <Grid item xs={12}>
          <p>Welcome to Cat-Call!</p>
          <p>{text}</p>
        </Grid>
        <Grid item xs={12}>
          Enter a name to call your cat!
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder={"Input Your Cat's Name"}
            value={catName}
            id="nameInput"
            onChange={handleChange}
          ></Input>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Button
              variant={"contained"}
              style={{ width: "33vw" }}
              onClick={catClick}
            >
              cat click
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={"contained"}
              style={{ width: "33vw" }}
              onClick={handleClick}
            >
              handle click
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={"contained"}
              style={{ width: "33vw" }}
              onClick={newCat}
            >
              new cat
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
            <img id="catImg" width="150px" alt="cat goes here" />
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <p>here are your cats!</p>
          <Grid container item justifyContent="center" alignItems="center">
            <AllCats />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
