export function fetchStarships() {
  const endpoint = `https://swapi.dev/api/starships/`;
  return fetch(endpoint, { mode: "cors" }).then((res) => res.json());
}

// export function fetchStarshipsId() {
//   const endpoint = `https://swapi.dev/api/starships/:id/`;
//   return fetch(endpoint, { mode: "cors" }).then((res) => res.json());
// }
