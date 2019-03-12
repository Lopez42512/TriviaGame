var questions = [{
    question: "Who Knows Nothing?",
    answers: {
        a: "LittleFinger",
        b: "John Snow",
        C: "Ned Stark"
    },
    correctAnswer: "b"
},
{
    question: "Who is the Mother of Dragons?",
    answers: {
        a: "Cersi",
        b: "Daenerys",
        c: "Margaery"
    },
    correctAnswer: "b"
},
{
    question: "What is a girl's name?",
    answers: {
        a: "Arya",
        b: "Sansa",
        c: "A girl has no name"
    },
    correctAnswer: "c"
},
{
    question: "What is the name of Sansa Direwolf?",
    answers: {
        a: "Lady",
        b: "Summer",
        c: "Ghost"
    },
    correctAnswer: "a"
},
{
    question: "Who is the three eye raven",
    answers: {
        a: "Bran",
        b: "Sam",
        c: "Podrick"
    },
    correctAnswer: "a"
},
];

var quiz = document.getElementById("quiz");
var results = document.getElementById("results");
var submit = document.getElementById("submit");
var timeLeft = 5

var elem = document.getElementById("timer");

var timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft === 0) {
        clearTimeout(timerId);
        $(this).showResults;
    } else {
        elem.innerHTML =timeLeft + "seconds remaining";
        timeLeft--;
    }
}
generateQuiz(questions, quiz, results, submit);

//I can't get this to render
function generateQuiz(questions, quiz, results, submit) {

    function showQuestions(questions, quiz) {
        var output = [];
        var answers;

        for (var i = 0; i < questions.length; i++) {

            answers = [];

            for (letter in questions[i].answers) {

                answers.push(
                    "<label>"
                    + "<input type='radio' name='question'" + i + "'value='" + letter + "'>"
                    + letter + ": "
                    + questions[i].answers[letter]
                    + "</label>"
                );
            }

            output.push(
                "<div class='question'>" + questions[i].question + "</div>"
                + "<div class='answers'>" + answers.join('') + "</div>"
            );
        }

        quiz.innerHTML = output.join("");
    }
        function showResults(questions, quiz, results) {

        var answerContainers = quiz.querySelectorAll(".answers");

        var userAnswer = "";
        var numCorrect = 0;

        for (var i = 0; i < questions.length; i++) {

            userAnswer = (answerContainers[i].querySelector("input[name=question" + i + "]:checked") || {}).value;

            if (userAnswer === questions[i].correctAnswer) {
                numCorrect++;
            }
            
        }

        results.innerHTML = numCorrect + " out of " + questions.length;
    }

    showQuestions(questions, quiz);

    submit.onclick = function () {
        showResults(questions, quiz, results);
    }
    countdown();

}