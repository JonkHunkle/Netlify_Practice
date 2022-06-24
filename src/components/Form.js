import React, { useState } from "react";
import { Grid, Input, Button } from "@mui/material";
import axios from "axios";
import AllCats from "./AllCats";

export default function Form() {
  const [catName, setCatName] = useState("");
  const [hasCat, setHasCat] = useState(null);
  const [catPic, setCatPic] = useState("");

  const catClick = () => {
    axios
      .get(".netlify/functions/catClick")
      .then((response) => {
        if (!hasCat) {
          setHasCat(!hasCat);
        }
        console.log("this is the cat response's data", response);
        setCatPic(response.data.message);
      })
      .catch((error) => {
        console.log("this is the cat error", error);
      })
      .then(() => {
        console.log("you clicked the cat button!(front end)");
      });
  };

  const newCat = () => {
    axios
      .post(".netlify/functions/addCat", { name: catName })
      .then(async (response) => {
        console.log("this is the newCat response's data", response);
        // const res = await addNewCat(name);
        // console.log(
        //   "Updated the cat record with Apollo: ",
        //   JSON.stringify(res.data, null, 2)
        // );
        setCatName("");
      })
      .catch((error) => {
        console.log("this is the newCat error", error);
      });
  };
  let catCard = () => {
    if (hasCat) {
      return (
        <>
          <img
            id="catImg"
            width="150px"
            src={catPic}
            alt="you didn't cat call"
          />
          <p> say hello to your friend!</p>
        </>
      );
    } else {
      return <p>Invite a friend over!</p>;
    }
  };

  return (
    <>
      <Grid container spacing={5} padding={6} height={"100vh"} width={"100vw"}>
        <Grid item xs={12}>
          <p>Welcome to Cat-Call!</p>
        </Grid>
        <Grid item xs={12}>
          Enter a name to call your cat!
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder={"Input Your Cat's Name"}
            value={catName}
            id="nameInput"
            onChange={(e) => {
              setCatName(e.target.value);
              e.preventDefault();
            }}
          />
        </Grid>
        <Grid item container direction="column" spacing={6} xs={12}>
          <Grid item xs={6}>
            <Button
              variant={"contained"}
              style={{ width: "33vw" }}
              onClick={newCat}
            >
              make a new cat
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={"contained"}
              style={{ width: "33vw" }}
              onClick={catClick}
            >
              look at a new cat
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
            {catCard()}
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
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            pb={6}
          >
            <AllCats />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
