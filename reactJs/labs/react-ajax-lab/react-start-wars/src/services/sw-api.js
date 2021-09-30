export function getAllStarships() {
  const endpoint = "https://swapi.dev/api/starships/";
  return fetch(endpoint).then((res) => res.json());
  // .then((res)=>{
  //     const starship = [];
  //     for( let i=0; i < res.results.length;i++){
  //         starship.push(res.results[i]);
  //     }
  //     console.log(starship);
  // });
}

// const pilotUrls = [
//     "https://swapi.co/api/people/13/", 
//     "https://swapi.co/api/people/14/", 
//     "https://swapi.co/api/people/25/", 
//     "https://swapi.co/api/people/31/"
//   ];
  
  export async function getPilots(urls) {
    const promises = urls.map(url => fetch(url).then(res => res.json()));
    const pilotObjects = await Promise.all(promises);
    return pilotObjects;
  }
  
//   getPilots(urls).then(pilots => console.log(pilots));
