document.querySelector("button").addEventListener("click", gradeQuiz);

document.querySelector("#score").style.display = "none";
updateTimesTakenDisplay();
shuffleChoices();

function shuffleChoices(){
    let q1Choices = ["Mew", "Rowlet", "Bulbasaur", "Victini"];
    shuffleArray(q1Choices);
    for(let i of q1Choices){
        let radioElement = document.createElement("input");
        radioElement.type="radio";
        radioElement.name = "q1_choices";
        radioElement.value=i;
        radioElement.id = "q1_" + i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.htmlFor = radioElement.id;

        labelElement.prepend(radioElement);
        labelElement.append(" ");
        document.querySelector("#q1_radio_div").append(labelElement);
    }

    let q3Choices = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
    shuffleArray(q3Choices);
    let q3Selector = document.querySelector("#q3");

    for(let i of q3Choices){
        let dropdownOption = document.createElement("option");
        dropdownOption.value = i;
        dropdownOption.textContent=i;
        q3Selector.append(dropdownOption);
    }

    let q5Choices = ["Water", "Bug", "Poison", "Grass", "Normal", "Flying"];
    shuffleArray(q5Choices);

    for(let i of q5Choices){
        let checkboxElement = document.createElement("input");
        checkboxElement.type="checkbox";
        checkboxElement.name = "q5_choices";
        checkboxElement.value=i;
        checkboxElement.id = "q5_" + i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.htmlFor = checkboxElement.id;

        labelElement.prepend(checkboxElement);
        labelElement.append(" ");
        document.querySelector("#q5_checkbox_div").append(labelElement);
    }
}

function gradeQuiz(){
    incrementTimesTaken();
    updateTimesTakenDisplay();

    document.querySelector("#message").textContent = "";

    let oldImgs = document.querySelectorAll(".result_img");
    for(let i of oldImgs){
        i.remove();
    }

    function setFeedback(divId, isCorrect){
        let div = document.querySelector(divId);
        div.classList.remove("correct");
        div.classList.remove("incorrect");

        let imgElement = document.createElement("img");
        imgElement.className = "result_img";
        imgElement.src = isCorrect ? "img/correct.png" : "img/incorrect.png";
        imgElement.alt = isCorrect ? "Correct" : "Incorrect";
        div.prepend(imgElement);

        if(isCorrect){
            div.classList.add("correct");
        } else{
            div.classList.add("incorrect");
        }
    }

    let q1Checked = document.querySelector("input[name=q1_choices]:checked");
    let q1UserAnswer = "";
    if (q1Checked) {
        q1UserAnswer = q1Checked.value;
    }
    let q2UserAnswer = document.querySelector("#q2TextBox").value;
    let q3UserAnswer = document.querySelector("#q3").value;
    let q4UserAnswer = document.querySelector("#q4").value;
    let score = 0;

    let q1Correct = "Bulbasaur";
    let q2Correct = "Farigiraf";
    let q3Correct = "Ice";
    let q4Correct = "19";

    if(q1UserAnswer == q1Correct){
        setFeedback("#q1_div", true);
        score+=20;
    } else{
        setFeedback("#q1_div", false);
    }

    if(q2UserAnswer.trim().toLowerCase() == q2Correct.toLowerCase()){
        setFeedback("#q2_div", true);
        score+=20;
    } else{
        setFeedback("#q2_div", false);
    }

    if(q3UserAnswer == q3Correct){
        setFeedback("#q3_div", true);
        score+=20;
    } else{
        setFeedback("#q3_div", false);
    }

    if(q4UserAnswer == q4Correct){
        setFeedback("#q4_div", true);
        score+=20;
    } else{
        setFeedback("#q4_div", false);
    }

    let q5All = Array.from(document.querySelectorAll("input[name=q5_choices]"));
    let q5Checked = q5All.filter(i => i.checked).map(i => i.value);

    let q5Correct1 = "Normal";
    let q5Correct2 = "Flying";

    if(q5Checked.length == 2 && q5Checked.includes(q5Correct1) && q5Checked.includes(q5Correct2)){
        setFeedback("#q5_div", true);
        score += 20;
    } else{
        setFeedback("#q5_div", false);
    }

    if(score > 80){
        document.querySelector("#message").textContent = "Congratulations! You scored above 80!";
    }

    document.querySelector("#score").style.display = "inline";
    document.querySelector("#score").textContent = score + "/100";
}

function shuffleArray(inputArray){
    for (let i = inputArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = inputArray[i];
        inputArray[i] = inputArray[j];
        inputArray[j] = temp;
    }
    return inputArray;
}

function incrementTimesTaken(){
    let current = localStorage.getItem("timesTaken");
    if(current === null){
        current = "0";
    }
    let newVal = parseInt(current) + 1;
    localStorage.setItem("timesTaken", newVal.toString());
}

function updateTimesTakenDisplay(){
    let current = localStorage.getItem("timesTaken");
    if(current === null){
        current = "0";
    }
    document.querySelector("#timesTaken").textContent = "Times taken: " + current;
}