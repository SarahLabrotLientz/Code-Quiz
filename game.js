const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which of the following is NOT a data type: ',
        choice1: 'String',
        choice2: 'Boolean',
        choice3: 'Character',
        choice4: 'Alert',
        answer: 4,
    },
    {
        question:
            'The condition in an if/else statement is enclosed within: ',
        choice1: 'Quotes',
        choice2: 'Curly Brackets',
        choice3: 'Parentheses',
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: 'A useful tool for debugging and printing content for the debugger is: ',
        choice1: 'Numbers and Strings',
        choice2: 'Commas',
        choice3: 'Console',
        choice4: 'All of the above',
        answer: 3,
    },
    {
        question: 'Arrays in Javascript can be used to store: ',
        choice1: 'numbers and strings',
        choice2: 'other Arrays',
        choice3: 'curly brackets',
        choice4: 'your mom',
        answer: 1,
    },


]

let timeRemaining = 75;
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions];
    getNewQuestion()
    timerStarts()
}

timerStarts = () => {
    let quizInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById("timer").textContent = timeRemaining;

        if(timeRemaining <= 0){
            return window.location.assign('./end.html')
        }
    }, 1000)
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } 

        // timer reduction
        else{classToApply === 'incorrect'
            timeRemaining += -15

        }
       

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

    



startGame()