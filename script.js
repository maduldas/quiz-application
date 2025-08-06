let allQuestions = [
    // 🌍 30 General Knowledge Questions
    { question: "What is the capital city of Australia?", answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
    { question: "Who painted the Mona Lisa?", answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"], correct: 1 },
    { question: "What is the smallest planet in our solar system?", answers: ["Earth", "Mars", "Mercury", "Venus"], correct: 2 },
    { question: "Which language has the most native speakers?", answers: ["English", "Hindi", "Mandarin Chinese", "Spanish"], correct: 2 },
    { question: "What is the currency of Japan?", answers: ["Won", "Yuan", "Dollar", "Yen"], correct: 3 },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["William Wordsworth", "Charles Dickens", "William Shakespeare", "Jane Austen"], correct: 2 },
    { question: "What gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
    { question: "What is the largest ocean on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
    { question: "Who was the first President of the United States?", answers: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"], correct: 2 },
    { question: "What is the boiling point of water in Celsius?", answers: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
    { question: "What is the longest river in the world?", answers: ["Amazon", "Yangtze", "Nile", "Mississippi"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "Who discovered gravity?", answers: ["Albert Einstein", "Isaac Newton", "Galileo", "Hawking"], correct: 1 },
    { question: "Which country invented pizza?", answers: ["France", "USA", "Italy", "Greece"], correct: 2 },
    { question: "Which continent has the most countries?", answers: ["Europe", "Asia", "Africa", "South America"], correct: 2 },
    { question: "How many bones are in the adult human body?", answers: ["206", "201", "210", "190"], correct: 0 },
    { question: "What is the chemical symbol for gold?", answers: ["Gd", "Au", "Ag", "Go"], correct: 1 },
    { question: "Which organ detoxifies the human body?", answers: ["Kidney", "Lungs", "Liver", "Heart"], correct: 2 },
    { question: "Which planet has rings?", answers: ["Mars", "Jupiter", "Saturn", "Neptune"], correct: 2 },
    { question: "What is the most spoken language in the world?", answers: ["Spanish", "Hindi", "Mandarin Chinese", "English"], correct: 2 },
    { question: "Which sport uses a shuttlecock?", answers: ["Tennis", "Squash", "Badminton", "Table Tennis"], correct: 2 },
    { question: "What is the national animal of India?", answers: ["Lion", "Tiger", "Elephant", "Leopard"], correct: 1 },
    { question: "What is the tallest building in the world?", answers: ["Shanghai Tower", "Burj Khalifa", "Tokyo Skytree", "One World Trade Center"], correct: 1 },
    { question: "Which country gifted the Statue of Liberty to the USA?", answers: ["Germany", "France", "England", "Italy"], correct: 1 },
    { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
    { question: "What is the fastest land animal?", answers: ["Cheetah", "Leopard", "Jaguar", "Horse"], correct: 0 },
    { question: "Which vitamin is produced in the skin in sunlight?", answers: ["A", "C", "D", "E"], correct: 2 },
    { question: "What is H2O?", answers: ["Salt", "Hydrogen", "Water", "Oxygen"], correct: 2 },
    { question: "Which festival is known as the festival of lights?", answers: ["Eid", "Christmas", "Diwali", "Holi"], correct: 2 },
    { question: "Which bird is the symbol of peace?", answers: ["Crow", "Pigeon", "Sparrow", "Dove"], correct: 3 }
  ];
  
  // Quiz state
  let questions = []; // 10 randomized questions will go here
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  // DOM elements
  const startScreen = document.getElementById("start-screen");
  const quizContainer = document.getElementById("quiz-container");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const finalScoreEl = document.getElementById("final-score");
  const timerEl = document.getElementById("timer");
  
  // Start button logic
  document.getElementById("start-btn").addEventListener("click", startQuiz);
  
  // Start the quiz
  function startQuiz() {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    scoreContainer.style.display = "none";
    currentQuestion = 0;
    score = 0;
  
    // Shuffle and pick 10 random questions
    questions = shuffle([...allQuestions]).slice(0, 10);
  
    loadQuestion();
  }
  
  // Load each question
  function loadQuestion() {
    resetTimer();
    feedbackEl.textContent = "";
    answersEl.innerHTML = "";
  
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
  
    q.answers.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.classList.add("answer-btn");
      btn.textContent = answer;
      btn.onclick = () => checkAnswer(index);
      answersEl.appendChild(btn);
    });
  
    startTimer();
  }
  
  // Answer logic
  function checkAnswer(selectedIndex) {
    stopTimer();
  
    const correctIndex = questions[currentQuestion].correct;
    const answerButtons = document.querySelectorAll(".answer-btn");
  
    answerButtons.forEach((btn, index) => {
      btn.disabled = true;
      btn.style.backgroundColor = index === correctIndex ? "#4CAF50" : (index === selectedIndex ? "#f44336" : "#fff");
    });
  
    if (selectedIndex === correctIndex) {
      feedbackEl.textContent = "✅ Correct!";
      score++;
    } else {
      feedbackEl.textContent = `❌ Wrong. Correct answer: ${questions[currentQuestion].answers[correctIndex]}`;
    }
  
    nextBtn.style.display = "inline-block";
  }
  
  // Next question
  nextBtn.onclick = () => {
    currentQuestion++;
    nextBtn.style.display = "none";
  
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  };
  
  // Timer functions
  function startTimer() {
    timeLeft = 30;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time Left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        autoFail();
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timer);
  }
  
  function resetTimer() {
    stopTimer();
    timerEl.textContent = "Time Left: 30s";
  }
  
  function autoFail() {
    checkAnswer(-1); // Triggers fail
  }
  
  // Show final score
  function showScore() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    finalScoreEl.textContent = `${score} / ${questions.length}`;
  }
  
  // Utility: shuffle an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  