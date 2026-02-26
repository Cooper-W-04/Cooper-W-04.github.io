let stateSelector = document.querySelector("#stateSelector");

async function setStates(){
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const stateList = await response.json();

        stateList.forEach(state => {
            const option = document.createElement("option");

            option.text = state.state;
            option.value = state.usps.toLowerCase();

            stateSelector.appendChild(option);
        });
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}
setStates();

let zipCodeInput = document.querySelector("#zipCodeInput");
let zipMsg = document.querySelector("#zipMsg");

zipCodeInput.addEventListener("input", async function getZipCodeData() {
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCodeInput.value}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const zipCodeData = await response.json();

        if (!zipCodeData || !zipCodeData.city) {
            zipMsg.textContent = " Zip code not found";
            zipMsg.style.color = "red";

            document.querySelector("#cityDisplay").textContent = "";
            document.querySelector("#latitudeDisplay").textContent = "";
            document.querySelector("#longitudeDisplay").textContent = "";
            return;
        }

        zipMsg.textContent = "";

        document.querySelector("#cityDisplay").textContent = zipCodeData.city;
        document.querySelector("#latitudeDisplay").textContent = zipCodeData.latitude;
        document.querySelector("#longitudeDisplay").textContent = zipCodeData.longitude;

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
});

stateSelector.addEventListener("change", async function getStateData() {
    let url = `https://csumb.space/api/countyListAPI.php?state=${stateSelector.value}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const countyList = await response.json();

        let countySelector = document.querySelector("#countySelector");

        while (countySelector.firstChild) {
            countySelector.removeChild(countySelector.firstChild);
        }

        const firstSelectOption = document.createElement("option");
        firstSelectOption.text = "Choose a county";
        firstSelectOption.value = "";
        countySelector.appendChild(firstSelectOption);

        countyList.forEach(county => {
            const option = document.createElement("option");
            option.text = county.county;
            option.value = county.county; //please work now
            countySelector.appendChild(option);
        });

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch  
});

let passwordBox = document.querySelector("#passwordBox");
let submitMsg = document.querySelector("#submitMsg");

passwordBox.addEventListener("focus", async function putOnSuggested(){
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const suggestedPassword = await response.json();

        passwordBox.placeholder = "Suggested: "+suggestedPassword.password;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
});

passwordBox.addEventListener("blur", function clearAfterClickOff(){
    passwordBox.placeholder = "";
});


passwordBox.addEventListener("input", function () {
    if (passwordBox.value.length > 0 && passwordBox.value.length < 6) {
        submitMsg.textContent = "Password must be at least 6 characters.";
        submitMsg.style.color = "red";
    } else if (submitMsg.textContent === "Password must be at least 6 characters.") {
        submitMsg.textContent = "";
    }
});


let usernameInput = document.querySelector("#usernameInput");
let usernameMsg = document.querySelector("#usernameMsg");

usernameInput.addEventListener("input", async function getUsernameData() {
    let url = `https://csumb.space/api/usernamesAPI.php?username=${usernameInput.value}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const usernameData = await response.json();

        if (usernameInput.value.trim() === "") {
            usernameMsg.textContent = "";
            return;
        }

        if (usernameData.available === true) {
            usernameMsg.textContent = " Available";
            usernameMsg.style.color = "green";
        } else {
            usernameMsg.textContent = " Unavailable";
            usernameMsg.style.color = "red";
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
});

let retypePasswordBox = document.querySelector("#retypePasswordBox");
let submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const uname = usernameInput.value.trim();
    const pwd = passwordBox.value;
    const pwd2 = retypePasswordBox.value;

    submitMsg.style.color = "red";
    submitMsg.textContent = "";

    if (uname.length < 3) {
        submitMsg.textContent = "Username must be at least 3 characters.";
        return;
    }

    if (pwd.length < 6) {
        submitMsg.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (pwd !== pwd2) {
        submitMsg.textContent = "Passwords do not match.";
        return;
    }

    submitMsg.style.color = "green";
    submitMsg.textContent = "Sign up successful (fake).";
});