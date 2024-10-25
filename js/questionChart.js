let yesCount = localStorage.getItem('yesCount') ? parseInt(localStorage.getItem('yesCount')) : 0;
let noCount = localStorage.getItem('noCount') ? parseInt(localStorage.getItem('noCount')) : 0;

function updateDisplay() {
    document.getElementById('yesCountDisplay').innerText = `Ja: ${yesCount}`;
    document.getElementById('noCountDisplay').innerText = `Nej: ${noCount}`;
}

function updateChart(answer) {
    if (answer === 'yes') {
        yesCount++;
        localStorage.setItem('yesCount', yesCount);
    } else {
        noCount++;
        localStorage.setItem('noCount', noCount);
    }
    updateDisplay();
}

updateDisplay();  // Initial visning af svarene
