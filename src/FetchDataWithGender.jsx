import React, { useEffect, useState } from "react";

function FetchDataWithGender({ gender }) {
  const [name, setName] = useState({ title: "", first: "", last: "" });

  useEffect(
    async () => {
      const res = await fetch(`https://randomuser.me/api?gender=${gender}`);
      const json = await res.json();
      setName(json.results[0].name);
    },
    [gender]
  );

  return (
    <div>{`The person name is: ${name.title} ${name.first} ${name.last}`}</div>
  );
}

export function WrapperFetchDataWithGender() {
  const [gender, setGender] = useState("female");

  return (
    <div>
      <p>Select Gender</p>
      <button onClick={() => setGender("male")}>Male</button>
      <button onClick={() => setGender("female")}>Female</button>
      <FetchDataWithGender gender={gender} />
    </div>
  );
}
