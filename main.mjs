const BASE_URL = "https://alchemy-kd0l.onrender.com";

let token;

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

  token = data.token;

  console.log("Token:", token);
}

async function getStatus() {
  const response = await fetch(`${BASE_URL}/status`, {
    method: "GET",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}

async function submitAnswer(answer) {
  const response = await fetch(`${BASE_URL}/submit`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      answer: answer,
    }),
  });

  const data = await response.json();

  console.log("Submit result:", data);
}

async function main() {
  await startGame();

  const challenge = await getStatus();

  console.log("Challenge:", challenge.prompt);

  await submitAnswer("4");
}

main();
