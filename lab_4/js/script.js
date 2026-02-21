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
zipCodeInput.addEventListener("input", async function getZipCodeData() {
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCodeInput.value}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const zipCodeData = await response.json();
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

let stateSelector = document.querySelector("#stateSelector");
stateSelector.addEventListener("change", async function getStateData() {
    let url = "https://csumb.space/api/allStatesAPI.php";
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

        const firstSelectOption = document.createElement("option1");
        firstSelectOption.text = "Choose a county";
        firstSelectOption.value = "";
        countySelector.appendChild(firstSelectOption);

        countyList.forEach(county => {
            const option = document.createElement("option");

            option.text = county.county;
            option.value = county.county;

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