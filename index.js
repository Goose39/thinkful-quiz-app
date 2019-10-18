var currentQ = 0;
var score = 0;

function handleQuiz() {
    quizStart();
}
// Start quiz once START button has been clicked
function quizStart() {
    $(".start").on("click", function(event) {
        event.preventDefault();
        displayNextQ();
    })
}
// Handle next question
function displayNextQ() {
    currentQ++;
    qIdx = currentQ - 1;
    // Display scoreboard after 1st Question has been answered
    if (currentQ > 1) {
        updateScoreboard();
    }; 
    // Display next question if not all questions ahve been answered, else end quiz
    if (currentQ <= STORE.length) {
        $("section").html(createQs());
        // Handle Answer selection
        selectAnswer();
        // Listen for answer submition and check if correct
        $(".submit").on("click", function() {
            event.preventDefault();
            $(".submit").addClass("not-visible");
            $(".go").removeClass("not-visible");
            checkAnswer();
            })
        // Listen for click to go to next Question    
        goToNextQ();   
    } else {
        endQuiz();
        }
};
// Create HTML elements for ech answer option
function createQs() {
    let questions = "";

    questions += `<p>Q${currentQ}/5: ${STORE[qIdx].question}</p>
                <form class="quiz-form" action="#">
                    <fieldset>`;

    STORE[qIdx].options.forEach(option => {questions += `<label for="${option}" class="option" required><input class="select-answer" name="option" type="radio" value="${option}" id="${option}" required>${option}</label>`});
    
        questions += `  <input class="submit" type="button" value="Submit Answer"/> 
                        <input class="go not-visible" type="button" value="Next Q >>>"/>
                    </fieldset>
                </form>`;

    return questions;
}
// Handle selection of answer options
function selectAnswer() {
    $(".option").on("click", function() {
        $(".option").removeClass("selected");
        $(this).addClass("selected");
        $("selected").closest("input[name=option]");
    })
}
// Check if selected andswer is correct
function checkAnswer() {
    let answer = $("input[name=option]:checked").val();

    if (answer === STORE[currentQ-1].answer) {
        $(".selected").append(` is Correct!`);
        $(".selected").addClass("correct-answer");
        score++;
    } else {
        $(".selected").append(` is Incorrect!`);
        $(".submit").before(`The correct answer is ${STORE[currentQ - 1].answer}`);
        $(".selected").addClass("incorrect-answer");
        }

    updateScoreboard();
}

function goToNextQ() {
    $(".go").on("click", function() {
        displayNextQ();
    })
}

function updateScoreboard() {
    let remQs = 5 - currentQ;
    $("section").prepend(`<div class="scoreboard">Current Score: ${score} | ${remQs} questions remaining</div>`)

}
// Display that quiz has ended and user results, with option to restart
function endQuiz() { 
    $("section").html(`
        <p>Congratulations you have completed the Quiz!</p>
        <p>You managed to answer ${score}/${STORE.length} questions correctly</p>
        <form class="quiz-form" action="#">
            <input class="start" type="button" value="Restart Quiz">
        </form>
        `)   

        $(".start").on("click", function() {
            quizRestart();
        })

}
// Reset Question counters to restart quiz from Q1 
function quizRestart() {
    currentQ = 0;
    score = 0;
    displayNextQ();
}

$(handleQuiz);
