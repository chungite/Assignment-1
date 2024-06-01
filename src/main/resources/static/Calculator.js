const addRowButton = document.getElementById('Addrow');
const meanButton = document.getElementById('MEAN');
const weightedButton = document.getElementById('WEIGHTED');
const table = document.getElementById('Calculator').getElementsByTagName('tbody')[0] || document.getElementById('Calculator');
const meanResultPlaceholder = document.getElementById('mean-result-placeholder');

// Start with the initial number of activities
var activityCount = table.rows.length - 1;

if (addRowButton) {
    addRowButton.addEventListener('click', function() {
        // Increment activity count
        activityCount++;

        // Insert a new row at the end of the table
        var newRow = table.insertRow();

        // Insert cells into the new row
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);

        // Add content to the new cells
        cell1.textContent = 'Activity ' + activityCount;
        cell2.textContent = 'A' + activityCount;
        cell3.innerHTML = '<input type="number" class="Weight">';
        cell4.innerHTML = '<input type="number" class="score"> / <input type="number" class="max-score">';
        cell5.className = 'Percent';

        // Add event listeners to the new inputs to update percentages in real-time
        newRow.querySelector('.score').addEventListener('input', updatePercentages);
        newRow.querySelector('.max-score').addEventListener('input', updatePercentages);
    });
} 
if (meanButton) {
    meanButton.addEventListener('click', calculateMean);
} 

if (weightedButton) {
    weightedButton.addEventListener('click', calculateWeighted);
} 


// Add event listeners to the initial rows to update percentages in real-time
document.querySelectorAll('.score, .max-score').forEach(function(input) {
    input.addEventListener('input', updatePercentages);
});

function updatePercentages() {
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        var scoreInput = rows[i].querySelector('.score').value;
        var maxScoreInput = rows[i].querySelector('.max-score').value;
        var percentCell = rows[i].querySelector('.Percent');

        if (scoreInput && maxScoreInput) {
            var percent = (parseFloat(scoreInput) / parseFloat(maxScoreInput)) * 100;
            percentCell.textContent = percent.toFixed(2) + "%";
        } else {
            percentCell.textContent = '';
        }
    }
}

function calculateMean() {
    var rows = table.rows;
    var total = 0;
    var count = 0;

    for (var i = 1; i < rows.length; i++) {
        var score = parseFloat(rows[i].querySelector('.score').value);
        var maxScore = parseFloat(rows[i].querySelector('.max-score').value);

        if (!isNaN(score) && !isNaN(maxScore) && maxScore > 0) {
            total += score / maxScore;
            count++;
        }
    }

    if (count > 0) {
        var mean = (total / count);
        meanResultPlaceholder.textContent = ` ${mean.toFixed(3)}`;
    } else {
        meanResultPlaceholder.textContent = 'Grades not given.';
    }
}

function calculateWeighted() {
    var rows = table.rows;
    var weightedTotal = 0;
    var weightSum = 0;

    for (var i = 1; i < rows.length; i++) {
        var score = parseFloat(rows[i].querySelector('.score').value);
        var maxScore = parseFloat(rows[i].querySelector('.max-score').value);
        var weight = parseFloat(rows[i].querySelector('.Weight').value);

        if (!isNaN(score) && !isNaN(maxScore) && !isNaN(weight) && maxScore > 0) {
            weightedTotal += (score / maxScore) * weight;
            weightSum += weight;
        }
    }

    if (weightSum > 0) {
        var weightedMean = (weightedTotal / weightSum);
        meanResultPlaceholder.textContent = ` ${weightedMean.toFixed(3)}`;
    } else {
        meanResultPlaceholder.textContent = 'weights/grades not given';
    }
}
