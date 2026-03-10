const BASE_URL = "https://alchemy-kd0l.onrender.com";

async function startGame() {
  const response = await fetch(`${BASE_URL}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: "kjetilar@uia.no",
      nick: "kjotel",
      pin: "2929",
    }),
  });

  const data = await response.json();
  console.log(data);
}

startGame();
