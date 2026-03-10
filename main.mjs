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

async function getClue() {
  const response = await fetch(`${BASE_URL}/clue`, {
    method: "GET",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

  const data = await response.json();

  console.log("Clue:", data.clue);

  return data.clue;
}

  const data = await response.json();

  console.log("Submit result:", data);

  return data;
}

function solveChallenge(prompt) {
  if (prompt.includes("2+2")) {
    return "4";
  }

  if (prompt.includes("3.14159")) {
    return "pi";
  }

  if (prompt.includes("☉")) {
    const symbols = "☉☿☽♂☉";

    const map = {
      "☉": "S",
      "☿": "M",
      "☽": "M",
      "♂": "M",
    };

    let answer = "";

    for (let symbol of symbols) {
      answer += map[symbol];
    }

    return answer;
  }
}

async function main() {
  await startGame();

  let gameOver = false;

  while (!gameOver) {
    const challenge = await getStatus();

    console.log("Challenge:", challenge.prompt);

    const answer = solveChallenge(challenge.prompt);

    console.log("Answer:", answer);

    const result = await submitAnswer(answer);

    if (result.correct === false) {
      console.log("Wrong answer, stopping.");
      gameOver = true;
    }

    if (!result.next) {
      console.log("Game finished!");
      gameOver = true;
    }
  }
}

main();
