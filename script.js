let students = [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {
        id: document.getElementById("studentId").value,
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        marks: Number(document.getElementById("marks").value)
    };

    students.push(student);

    form.reset();

    displayStudents();
});

function getGrade(marks) {

    if (marks >= 90) {
        return "A+";
    } 
    else if (marks >= 80) {
        return "A";
    } 
    else if (marks >= 70) {
        return "B";
    } 
    else if (marks >= 60) {
        return "C";
    } 
    else if (marks >= 50) {
        return "D";
    } 
    else {
        return "F";
    }
}

function displayStudents(list = students) {

    table.innerHTML = "";

    list.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.marks}</td>
            <td>${getGrade(student.marks)}</td>

            <td>
                <button class="edit-btn"
                    onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

function deleteStudent(index) {

    if (confirm("Are you sure you want to delete this student?")) {

        students.splice(index, 1);

        displayStudents();
    }
}

function editStudent(index) {

    const student = students[index];

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;

    students.splice(index, 1);

    displayStudents();
}

search.addEventListener("input", function() {

    const keyword = search.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(keyword) ||
        student.id.toLowerCase().includes(keyword) ||
        student.department.toLowerCase().includes(keyword)
    );

    displayStudents(filteredStudents);
});