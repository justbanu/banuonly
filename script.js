let data = [];
let currentQuestion = {};
let correctCount = 0;
let wrongCount = 0;

const leftBtn = document.getElementById('leftOption');
const rightBtn = document.getElementById('rightOption');
const feedback = document.getElementById('feedback');
const correctDisplay = document.getElementById('correctCount');
const wrongDisplay = document.getElementById('wrongCount');
const correctAnswerText = document.getElementById('correctAnswer');
const wrongSound = document.getElementById('wrongSound'); // ambil audio element

// Ambil data dari JSON
fetch('data/kata.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    loadQuestion();
  });

function loadQuestion() {
  feedback.textContent = '';
  // Jangan hapus correctAnswerText di sini, biarkan sampai dijawab benar

  const randomIndex = Math.floor(Math.random() * data.length);
  currentQuestion = data[randomIndex];

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

function handleAnswer(isCorrect) {
  if (isCorrect) {
    feedback.textContent = '✅ Benar!';
    
    // Kalau jawab benar, baru hapus jawaban benar dari soal sebelumnya
    correctAnswerText.textContent = '';

    correctCount++;
    correctDisplay.textContent = correctCount;
  } else {
    feedback.textContent = '❌ Salah!';
    correctAnswerText.textContent = `Kata baku yang benar: "${currentQuestion.baku}"`;

    wrongCount++;
    wrongDisplay.textContent = wrongCount;

    // Mainkan suara salah
    wrongSound.currentTime = 0;
    wrongSound.play().catch(err => {
      console.log('Gagal mainkan suara:', err);
    });
  }

  setTimeout(loadQuestion, 1000);
}
