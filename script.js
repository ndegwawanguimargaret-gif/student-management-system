// ======================================
// FUTURE LABS AFRICA
// STUDENT MANAGEMENT SYSTEM
// ======================================

console.log("Welcome to Future Labs Africa!");

const systemName = "Student Management System";

console.log(systemName);

// ======================================
// STUDENT DATA
// ======================================

let students = [];
let editingStudentId = null;

// ======================================
// REGISTER STUDENT
// ======================================

const studentForm = document.getElementById("studentForm");

if (studentForm) {
    studentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("studentName").value.trim();
        const email = document.getElementById("studentEmail").value.trim();
        const course = document.getElementById("studentCourse").value;

        if (!name || !email || !course) {
            alert("Please fill in all fields!");
            return;
        }

        if (editingStudentId !== null) {
            const student = students.find(s => s.id === editingStudentId);

            student.name = name;
            student.email = email;
            student.course = course;

            editingStudentId = null;

        } else {
            const newStudent = {
                id: Date.now(),
                name: name,
                email: email,
                course: course
            };

            students.push(newStudent);
        }

        studentForm.reset();
        displayStudents();
        updateStatistics();

        alert("Student saved successfully!");
    });
}

// ======================================
// DISPLAY STUDENTS
// ======================================

function displayStudents(list = students) {
    const studentTable = document.getElementById("studentTable");

    if (!studentTable) return;

    studentTable.innerHTML = "";

    list.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(student.name)}</td>
            <td>${escapeHTML(student.email)}</td>
            <td>${escapeHTML(student.course)}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;

        studentTable.appendChild(row);
    });
}

// ======================================
// PROTECT DISPLAYED TEXT
// ======================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

// ======================================
// EDIT STUDENT
// ======================================

function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) return;

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentEmail").value = student.email;
    document.getElementById("studentCourse").value = student.course;

    editingStudentId = id;
}

// ======================================
// DELETE STUDENT
// ======================================

function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    students = students.filter(s => s.id !== id);

    displayStudents();
    updateStatistics();

    alert("Student deleted successfully!");
}

// ======================================
// SEARCH STUDENTS
// ======================================

const searchStudent = document.getElementById("searchStudent");

if (searchStudent) {
    searchStudent.addEventListener("input", function() {
        const searchValue = this.value.toLowerCase();

        const filteredStudents = students.filter(student =>
            student.name.toLowerCase().includes(searchValue) ||
            student.email.toLowerCase().includes(searchValue) ||
            student.course.toLowerCase().includes(searchValue)
        );

        displayStudents(filteredStudents);
    });
}

// ======================================
// UPDATE DASHBOARD
// ======================================

function updateStatistics() {
    const totalStudents = document.getElementById("totalStudents");

    if (totalStudents) {
        totalStudents.textContent = students.length;
    }
}

// ======================================
// COURSE SELECTION
// ======================================

document.querySelectorAll("[data-course]").forEach(button => {
    button.addEventListener("click", function() {
        const courseInput = document.getElementById("studentCourse");

        if (courseInput) {
            courseInput.value = this.dataset.course;
        }
    });
});

// ======================================
// CONTACT FORM
// ======================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Thank you for contacting Future Labs Africa!");

        contactForm.reset();
    });
}

// ======================================
// INITIALIZE WEBSITE
// ======================================

displayStudents();
updateStatistics();

console.log("Website JavaScript loaded successfully!");