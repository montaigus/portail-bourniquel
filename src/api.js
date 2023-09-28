// const requestOptionsPost = (bodyObject) => {
//   return {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify(bodyObject, null, 2),
//   };
// };

const localhost = "http://localhost:8000";

export async function getEvents() {
  console.log("avant async");
  const apiRes = await fetch(`${localhost}/events`);
  console.log("coucou api");
  if (!apiRes.ok) {
    throw new console.error("not ok");
  }

  return apiRes.json();
}
