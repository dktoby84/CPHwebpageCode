let yesCount = localStorage.getItem('yesCount') ? parseInt(localStorage.getItem('yesCount')) : 0;
let noCount = localStorage.getItem('noCount') ? parseInt(localStorage.getItem('noCount')) : 0;

const ctx = document.getElementById('responseChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Ja', 'Nej'],
        datasets: [{
            label: 'Antal svar',
            data: [yesCount, noCount],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart(answer) {
    if (answer === 'yes') {
        yesCount++;
        localStorage.setItem('yesCount', yesCount);
    } else {
        noCount++;
        localStorage.setItem('noCount', noCount);
    }
    
    // Opdater grafens data
    chart.data.datasets[0].data = [yesCount, noCount];
    chart.update();
}
