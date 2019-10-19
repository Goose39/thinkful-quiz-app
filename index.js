let currentQ = 1;
let score = 0;

function handleQuiz() {
    quizStart();
    checkForNextQ()
}
// Start quiz once START button has been clicked
function quizStart() {
    $("section").on("click", ".start", function(event) {
        event.preventDefault();
        buildQForm();
        displayNextQ();
    })
}
// Handle next question
function displayNextQ() {
    displayQs();
    // Handle Answer selection
    selectAnswer();
    // Listen for answer submition and check if correct
    checkAnswer();
    // Listen for click to go to next Question   
}
// Render initial form structure for Questions
function buildQForm() {
    let remQs = STORE.length - currentQ;
    $("section").html(`<div class="scoreboard">Current Score: ${score} | ${remQs} questions remaining</div>
                        <p class="question"></p>
                        <form class="quiz-form" action="#">
                            <fieldset>
                                <div class="options"></div>
                                <div class="feedback"></div>
                                <input class="submit" type="button" value="Submit Answer"/> 
                                <input class="go" type="button" value="Next Q >>>"/>
                            </fieldset>
                        </form>`)
}
// Insert HTML elements for each answer option
function displayQs() {
    let qOptions = "";
    let qIdx = currentQ - 1;
    $(".question").html(`Q${currentQ}/${STORE.length}: ${STORE[qIdx].question}`);
    STORE[qIdx].options.forEach(option => {qOptions += `<label for="${option}" class="option"><input class="select-answer" name="option" type="radio" value="${option}" id="${option}" required/>${option}</label>`});
    $(".options").html(qOptions);
    $(".submit").removeClass("not-visible");
    $(".go").addClass("not-visible");
    $(".feedback").html("");
}
// Handle selection of answer options
function selectAnswer() {
    $("section").on("click", ".option", function() {
        $(".option").removeClass("selected");
        $(this).addClass("selected");
    })
}
// Check if selected answer is correct
function checkAnswer() {
    $("section").on("click", ".submit", function() {
        const qIdx = currentQ - 1;
        const correct = STORE[qIdx].answer;
        const answer = $("input[name=option]:checked").val();
        const selected = $(".selected");
        
        if (answer == correct) {
            selected.html(`${answer} | Correct!`).addClass("correct-answer");
            score++;
            console.log(`${answer}`);
        } else {
            selected.html(`${answer} | Incorrect!`).addClass("incorrect-answer");
            $(".feedback").html(`The correct answer is ${STORE[qIdx].answer}`);
            console.log(`${answer}`);
        }  
            
        updateScoreboard();    
        $(".select-answer").css("display", "none");
        $(".submit").addClass("not-visible");
        $(".go").removeClass("not-visible");
    })
}

function checkForNextQ() {
    $("section").on("click", ".go", function() {
        currentQ++;
        if (currentQ <= STORE.length) {
        displayNextQ();
        } else {
            endQuiz();    
        }
    })
}
// Change update Scoreboard values
function updateScoreboard() {
    let remQs = STORE.length - currentQ;
    $(".scoreboard").html(`Current Score: ${score} | ${remQs} questions remaining`);
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
    quizRestart();
}
// Reset Question counters to restart quiz from Q1 
function quizRestart() {
    currentQ = 1;
    score = 0;
    quizStart();
}

$(handleQuiz);
