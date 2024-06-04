function registerUser() {
    event.preventDefault();  
    const username = document.getElementById('username').value;
    const password = btoa(document.getElementById('password').value);  
    localStorage.setItem(username, password);
    alert('Registration Successful!');
    window.location.href = 'login.html';  
}


function loginUser() {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = btoa(document.getElementById('password').value);
    const storedPassword = localStorage.getItem(username);
    if (password === storedPassword) {
        sessionStorage.setItem('loggedInUser', username);
        alert('Login Successful!');
        window.location.href = 'calculator.html';  
    } else {
        alert('Login Failed: Incorrect username or password.');
    }
}


function storeResults() {
    var xDeviation = parseFloat(document.getElementById('xDeviation').value);
    var yDeviation = parseFloat(document.getElementById('yDeviation').value);
    var positionTolerance = parseFloat(document.getElementById('positionTolerance').value);

    var calculatedValue = Math.sqrt(Math.pow(xDeviation, 2) + Math.pow(yDeviation, 2));
    var truePosition = 2 * calculatedValue;
    var passFail = truePosition <= positionTolerance ? "Pass" : "Fail";

    
    var results = JSON.parse(sessionStorage.getItem('results')) || [];
    results.push({
        truePosition: truePosition.toFixed(4),
        passFail: passFail
    });

    
    sessionStorage.setItem('results', JSON.stringify(results));

    
    document.getElementById('totalPosition').value = truePosition.toFixed(4);
    var statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = "Your position " + passFail;
    statusMessage.className = passFail.toLowerCase();
}
