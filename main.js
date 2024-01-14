function getEntries() {
    const num_assignments = document.getElementsByClassName("assignment").length;
    const assignments = [];
    const assignment_names = document.getElementsByName("title");
    const grades = document.getElementsByName("grade");
    const weights = document.getElementsByName("weight");
    
    for (let i = 0; i < num_assignments; i++) {
        if (grades[i].value == '' || weights[i].value == '') {
            continue;
        }
        let current_row = {
                name: assignment_names[i].value,
                grade: parseFloat(grades[i].value),
                weight: parseFloat(weights[i].value)
        };
        assignments.push(current_row);
    }

    return assignments;
}

function getWeightedGrade() {
    const assignments = getEntries();
    let avg = 0;
    let weights = 0;

    assignments.forEach((e) => weights += e.weight);

    if (weights == 100) {
        assignments.forEach((e) => {
            avg += e.grade * (e.weight / 100);
        });
    } else {
        assignments.forEach((e) => {
            avg += e.grade * e.weight;
        });

        avg /= weights;
    }

    if (! isNaN(avg)) {
        document.getElementById("weighted-avg").value = avg.toPrecision(4);
    }

    return avg;
}

function addAssignmentRow() {
    var grade_table = document.getElementById("gt");
    var assignment_div = grade_table.lastElementChild;
    var assignment_clone = assignment_div.cloneNode(true);
    
    for (let child of assignment_clone.children) {
        child.value = "";
    }

    grade_table.appendChild(assignment_clone);
}

function fillTable() {
    var grade_table = document.getElementById("gt");
    var rows = grade_table.children;
    var assns = randomGradesAndWeights(rows.length - 1);

    for (i = 1; i < rows.length; i++) {
        if (rows.item(i).className == "table-headers") {
            continue;
        } 
        let current_assignment = rows.item(i);
        let current_name = current_assignment.children.item(0);
        let current_grade = current_assignment.children.item(1);
        let current_weight = current_assignment.children.item(2);

        current_name.value = "Assignment " + i;
        current_grade.value = assns[i - 1][0];
        current_weight.value = assns[i - 1][1];
    }
}

function randomGradesAndWeights(num_assignments) {
    var assns = [];
    for (i = 0; i < num_assignments; i++) {
        let rand_grade = Math.floor((Math.random() * 100) + 1);
        let rand_weight = Math.floor((Math.random() * 30) + 1);
        assns.push([rand_grade, rand_weight]);
    }
    return assns;
}

function resetTable() {
    const num_assignments = document.getElementsByClassName("assignment").length;
    var grade_table = document.getElementById("gt");
    var assignment_names = document.getElementsByName("title");
    var grades = document.getElementsByName("grade");
    var weights = document.getElementsByName("weight");
    for (i = 0; i < num_assignments; i++) {
        assignment_names[i].value = ""; 
        grades[i].value = "";
        weights[i].value = "";
    }

    document.getElementById("weighted-avg").value = "";
    
    while (grade_table.children.length > 5) {
        grade_table.removeChild(grade_table.lastElementChild);
    }
}

/* END OF FUNCTION DEFINITIONS */

// clear the table upon entering the website in case there is anything there.
let state = 0;

if (state == 0) {
    resetTable();
    state += 1;
}