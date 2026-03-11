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

  return await response.json();
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

  return data;
}

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

// Challenge Solver

function solveChallenge(prompt) {
  // Challenge 1
  if (prompt.includes("2+2")) {
    return "4";
  }

  // Challenge 2
  if (prompt.includes("3.14159")) {
    return "pi";
  }

  // Challenge 3
  if (prompt.includes("☉")) {
    const symbols = "☉☿☽♂☉";

    const map = {
      "☉": "Gold",
      "☿": "Quicksilver",
      "☽": "Silver",
      "♂": "Iron",
    };

    let answer = "";

    for (let s of symbols) {
      answer += map[s];
    }

    return answer;
  }

  // Challenge 4
  if (prompt.includes("Lethe")) {
    const poemWords = ["Still", "Icy", "Lethe", "Veiling", "Eldritch", "Rime"];

    let answer = "";

    for (let w of poemWords) {
      answer += w[0];
    }

    return answer;
  }
}

// Main Loop

async function main() {
  await startGame();

  let gameOver = false;

  while (!gameOver) {
    const challenge = await getStatus();

    console.log("Challenge:", challenge.prompt);

    const answer = solveChallenge(challenge.prompt);

    if (!answer) {
      console.log("No solution yet. Requesting clue...");
      await getClue();
      return;
    }

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
