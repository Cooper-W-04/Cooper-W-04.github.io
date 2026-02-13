document.querySelector("button").addEventListener("click", gradeQuiz);

document.querySelector("#score").style.display = "none";
shuffleChoices();
function shuffleChoices(){
    let q1Choices = ["first answer", "second answer", "third answer"];
    shuffleArray(q1Choices);
    for(let i of q1Choices){
        let radioElement = document.createElement("input");
        radioElement.type="radio";
        radioElement.name = "q1_choices";
        radioElement.value=i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;

        labelElement.prepend(radioElement);
        labelElement.append(" ");
        document.querySelector("#q1_radio_div").append(labelElement);
    }

    let q3Choices = ["first answer", "second answer", "third answer"];
    shuffleArray(q3Choices);
    let q3Selector = document.querySelector("#q3");

    for(let i of q3Choices){
        let dropdownOption = document.createElement("option");
        dropdownOption.value = i;
        dropdownOption.textContent=i;
        q3Selector.append(dropdownOption);
    }

    let q5Choices = ["first answer", "second answer", "third answer"];
    shuffleArray(q5Choices);
    
    for(let i of q5Choices){
        let checkboxElement = document.createElement("input");
        checkboxElement.type="checkbox";
        checkboxElement.name = "q5_choices";
        checkboxElement.value=i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;

        labelElement.prepend(checkboxElement);
        labelElement.append(" ");
        document.querySelector("#q5_checkbox_div").append(labelElement);
    }
}

function gradeQuiz(){
    let q1UserAnswer = document.querySelector("input[name=q1_choices]:checked").value;
    let q2UserAnswer = document.querySelector("#q2TextBox").value;
    let q3UserAnswer = document.querySelector("#q3").value;
    let q4UserAnswer = document.querySelector("#q4").value;
    //q5 user answer
    let score = 0;

    let q1Correct = "first answer";
    let q2Correct = "text";
    let q3Correct = "second answer";
    let q4Correct = "48";

    if(q1UserAnswer == q1Correct){
        document.querySelector("#q1_div").style.backgroundColor = "green";
        score+=20;
    } else{
        document.querySelector("#q1_div").style.backgroundColor = "red";
    }

    if(q2UserAnswer == q2Correct){
        document.querySelector("#q2_div").style.backgroundColor = "green";
        score+=20;
    } else{
        document.querySelector("#q2_div").style.backgroundColor = "red";
    }

    if(q3UserAnswer == q3Correct){
        document.querySelector("#q3_div").style.backgroundColor = "green";
        score+=20;
    } else{
        document.querySelector("#q3_div").style.backgroundColor = "red";
    }

    if(q4UserAnswer == q4Correct){
        document.querySelector("#q4_div").style.backgroundColor = "green";
        score+=20;
    } else{
        document.querySelector("#q4_div").style.backgroundColor = "red";
    }

    document.querySelector("#score").style.display = "inline";
    document.querySelector("#score").textContent = score + "/100"
}

function shuffleArray(inputArray){

}