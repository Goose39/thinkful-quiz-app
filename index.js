let currentQ = 1;
let score = 0;

function handleQuiz() {
    quizStart();
}
// Start quiz once START button has been clicked
function quizStart() {
    $(".quiz-form").on("click", ".start", function() {
        buildQForm(); 
    })

    $("section").on("click", ".go", function() {
        checkForNextQ();
    })

    $("section").on("click", ".submit", function() {
        checkAnswer();
    })

    selectAnswer();
}
// Handle next question

// Render initial form structure for Questions
function buildQForm() {
    let qIdx = currentQ - 1;
    let remQs = STORE.length - currentQ;
    $("section").html(`<div class="scoreboard">Current Score: ${score} | ${remQs} questions remaining</div>
                        <p class="question">${generateQuestion(qIdx)}</p>
                        <form class="quiz-form" action="#">
                            <fieldset>
                                <div class="options">${generateOptions(qIdx)}</div>
                                <div class="feedback"></div>
                                <button class="submit" type="submit">Submit Answer</button> 
                                <input class="go not-visible" type="button" value="Next Q >>>"/>
                            </fieldset>
                        </form>`)
}
// Insert HTML elements for each answer option
function displayQs() {
    let qIdx = currentQ - 1;

    $(".question").html(`${generateQuestion(qIdx)}`)
  
    $(".options").html(`${generateOptions(qIdx)}`);

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
        const qIdx = currentQ - 1;
        const correct = STORE[qIdx].answer;
        const answer = $("input[name=option]:checked").val();
        const selected = $(".selected");

        if (!answer) {
            return alert("Please select an answer before submitting");
        }; 
        
        if (answer === correct) {
            selected.html(`${answer} | Correct!`).addClass("correct-answer");
            score++;
        } else {
            selected.html(`${answer} | Incorrect!`).addClass("incorrect-answer");
            $(".feedback").html(`The correct answer is: ${STORE[qIdx].answer}`);
        }  
            
        updateScoreboard();
        $(".select-answer").css("display", "none");    
        $(".submit").addClass("not-visible");
        $(".go").removeClass("not-visible");
    }

function checkForNextQ() {
    currentQ++;
    if (currentQ <= STORE.length) {
        displayQs();
    } else {
        endQuiz();    
    }
}

function generateQuestion(index) {
    return `Q${currentQ}/${STORE.length}: ${STORE[index].question}`;
}

function generateOptions(index) {
    let options = "";

    STORE[index].options.forEach(option => options += `<label for="${option}" class="option"><input class="select-answer" name="option" type="radio" value="${option}" id="${option}" required/>${option}</label>`);

    return options;

}

// Change update Scoreboard values
function updateScoreboard() {
    let remQs = STORE.length - currentQ;
    $(".scoreboard").html(`Current Score: ${score} | ${remQs} questions remaining`);
    console.log("scoreboard updated");
}
// Display that quiz has ended and user results, with option to restart
function endQuiz() { 
    $("section").html(`
        <p>Congratulations you have completed the Quiz!</p>
        <p>You managed to answer ${score}/${STORE.length} questions correctly.</p>
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
