const music = document.getElementById("bgMusic");
const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const shareBtn = document.getElementById("shareBtn");

let musicPlaying = false;

// FORCE SAFE MUSIC PLAY
function startMusic() {
  music.muted = false;
  music.volume = 0.6;
  music.play().catch(() => {});
  musicPlaying = true;
}

musicBtn.onclick = () => {
  if (musicPlaying) {
    music.pause();
  } else {
    startMusic();
  }
  musicPlaying = !musicPlaying;
};

// SHARE
shareBtn.onclick = () => {
  const text = "💖 I made a cute Valentine quiz just for you 😌";
  if (navigator.share) {
    navigator.share({ text, url: location.href });
  } else {
    navigator.clipboard.writeText(location.href);
    alert("Link copied 💌");
  }
};

// QUIZ DATA
const questions = [
  { q:"When did we meet?", o:["15th May 2025","16th July 2025","13 June 2021","You were born knowing me"], a:1 },
  { q:"Where was our first date?", o:["Mohali","Outside Church","At Your Home","In my dreams"], a:2 },
  { q:"What was my first gift to you?", o:["Chocolate","Teddy","Food","My heart"], a:2 },
  { q:"What do you like about me the most?", o:["My Fat Tummy","My brain","My humour","Everything"], a:3 },
  { q:"When did I propose you?", o:["16th June","15th May","1st July","Every day since we met"], a:1 }
];

let current = 0;
let score = 0;

const welcome = document.getElementById("welcome");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

startBtn.onclick = () => {
  startMusic();
  welcome.classList.add("hidden");
  quiz.classList.remove("hidden");
  loadQuestion();
};

function loadQuestion() {
  document.getElementById("progress").innerText = `Question ${current+1}/5`;
  document.getElementById("question").innerText = questions[current].q;

  const options = document.getElementById("options");
  options.innerHTML = "";

  questions[current].o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = text;
    btn.onclick = () => answer(i);
    options.appendChild(btn);
  });
}

function answer(i) {
  if (i === questions[current].a) {
    score++;
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }

  current++;
  current < questions.length ? loadQuestion() : showResult();
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  if (score === 5) {
    confetti({ particleCount: 300, spread: 120 });
    result.innerHTML = `
      <h1>OMG 5/5 😭💖</h1>
      <p>You are officially the BEST WIFE EVER</p>
      <button class="primary">Redeem My Date 💌</button>
    `;
  } else {
    result.innerHTML = `
      <h2>Still mine though 😌</h2>
      <p>Will you be my Valentine? 💘</p>
      <button class="primary" onclick="finalYes()">Yes 💖</button>
    `;
  }
}

function finalYes() {
  confetti({ particleCount: 400, spread: 140 });
  result.innerHTML = `<h1>You are my Valentine forever 💖🌹</h1>`;
}
