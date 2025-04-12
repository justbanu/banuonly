let data = [];
let currentQuestion = {};
let correctCount = 0;
let wrongCount = 0;

const leftBtn = document.getElementById('leftOption');
const rightBtn = document.getElementById('rightOption');
const feedback = document.getElementById('feedback');
const correctDisplay = document.getElementById('correctCount');
const wrongDisplay = document.getElementById('wrongCount');

fetch('data/kata.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    loadQuestion();
  });

function loadQuestion() {
  feedback.textContent = '';

  // Ambil soal acak
  const randomIndex = Math.floor(Math.random() * data.length);
  currentQuestion = data[randomIndex];

  // Random posisi tombol
  const isLeftCorrect = Math.random() < 0.5;

  if (isLeftCorrect) {
    leftBtn.textContent = currentQuestion.baku;
    rightBtn.textContent = currentQuestion.tidak_baku;
    leftBtn.onclick = () => handleAnswer(true);
    rightBtn.onclick = () => handleAnswer(false);
  } else {
    leftBtn.textContent = currentQuestion.tidak_baku;
    rightBtn.textContent = currentQuestion.baku;
    leftBtn.onclick = () => handleAnswer(false);
    rightBtn.onclick = () => handleAnswer(true);
  }
}

const correctAnswerText = document.getElementById('correctAnswer'); // Tambahan ini

function handleAnswer(isCorrect) {
  if (isCorrect) {
    feedback.textContent = '✅ Benar!';
    correctAnswerText.textContent = ''; // Tidak tampilkan apapun kalau benar
    correctCount++;
    correctDisplay.textContent = correctCount;
  } else {
    feedback.textContent = '❌ Salah!';
    correctAnswerText.textContent = `Kata baku yang benar: "${currentQuestion.baku}"`;
    wrongCount++;
    wrongDisplay.textContent = wrongCount;
  }

  loadQuestion(); // langsung lanjut ke soal berikutnya
}

  