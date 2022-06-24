import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "@mui/material";
const ALL_CATS = gql`
  query GetAllCats {
    cats {
      name
      id
      url
      friend
    }
  }
`;

export default function AllCats() {
  const { loading, error, data } = useQuery(ALL_CATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return data.cats.map(({ name, id, url, friend }) => (
    <Grid item xs={3} key={id}>
      <p>name: {name}</p>
      <img src={url} width="100px" alt="cat" />
      <p>my best friend is named: {friend}</p>
    </Grid>
  ));
}
