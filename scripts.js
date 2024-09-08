document.getElementById('menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
let tasks = [];

const loadData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);

    document.getElementById('loading').style.display = 'block';

    xhr.onload = function() {
        if (this.status === 200) {
            tasks = JSON.parse(this.responseText);
            document.getElementById('loading').style.display = 'none';
            displayData(tasks);
        } else {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').style.display = 'block';
        }
    };

    xhr.onerror = function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    };

    xhr.send();
};

const displayData = (tasks) => {
    const tableBody = document.getElementById('task-list');
    tableBody.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.time}</td>
            <td>${task.done ? 'Yes' : 'No'}</td>
            <td>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="markAsDone(${index})">Mark as Done</button>
                <button onclick="updateTask(${index})">Update</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

function deleteTask(index) {
    tasks.splice(index, 1); 
    displayData(tasks);
    console.log(`Task at index ${index} deleted.`);
}

function markAsDone(index) {
    tasks[index].done = true;
    displayData(tasks); 
    console.log(`Task at index ${index} marked as done.`);
}

function updateTask(index) {
    const newName = prompt("Enter new name:", tasks[index].name);
    const newDescription = prompt("Enter new description:", tasks[index].description);
    const newTime = prompt("Enter new time (YYYY-MM-DD HH:MM):", tasks[index].time);

    if (newName && newDescription && newTime) {
        tasks[index].name = newName;
        tasks[index].description = newDescription;
        tasks[index].time = newTime;
        displayData(tasks);
        console.log(`Task at index ${index} updated.`);
    } else {
        console.log("Update canceled or invalid data entered.");
    }
}

document.addEventListener('DOMContentLoaded', loadData);
