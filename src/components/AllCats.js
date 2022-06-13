import React from "react";
import { useQuery, gql } from "@apollo/client";

export default function AllCats() {
  const ALL_CATS = gql`
    query GetAllCats {
      cats {
        name
        id
      }
    }
  `;

  const { loading, error, data } = useQuery(ALL_CATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  console.log(data);
  return data.cats.map(({ name, id }) => (
    <div key={id}>
      <p>name: {name}</p>
    </div>
  ));
}
