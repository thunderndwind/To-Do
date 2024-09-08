document.getElementById('menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

let tasks = [];

const loadData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://thunderndwind.github.io/To-Do/data.json', true);

    document.getElementById('loading').style.display = 'block';

    xhr.onload = function () {
        if (this.status === 200) {
            tasks = JSON.parse(this.responseText);
            document.getElementById('loading').style.display = 'none';
            renderTasks();
            handleEmptyData();
        }
    };
    xhr.send();
};

const handleEmptyData = () => {
    if (!tasks || tasks.length === 0) {
        document.getElementById('task-list').innerHTML = '<tr><td colspan="4">No tasks found</td></tr>';
    }
};

const renderTasks = () => {
    document.getElementById('todo-table').style.display = 'block';
    const tableBody = document.getElementById('task-list');
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.time}</td>
            <td>${task.status ? 'Yes' : 'No'}</td>
            <td>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="markAsDone(${index})">Mark as Done</button>
                <button onclick="updateTask(${index})">Update</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

const addNewTask = (taskName, taskDescription, taskTime) => {
    const newTask = {
        name: taskName,
        description: taskDescription,
        time: taskTime,
        status: false
    };

    tasks.push(newTask);
    saveTasksToData();
    renderTasks();
};

const saveTasksToData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'data.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(tasks));
};

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    console.log(`Task at index ${index} deleted.`);
}

function markAsDone(index) {
    tasks[index].status = true;
    renderTasks();
    console.log(`Task at index ${index} marked as done.`);
}

function updateTask(index) {
    const newName = prompt("Enter new name:", tasks[index].name);
    const newDescription = prompt("Enter new description:", tasks[index].description);
    const newTime = prompt("Enter new time (HH:MM):", tasks[index].time);

    if (newName && newDescription && newTime) {
        tasks[index].name = newName;
        tasks[index].description = newDescription;
        tasks[index].time = newTime;
        renderTasks();
        console.log(`Task at index ${index} updated.`);
    } else {
        console.log("Update canceled or invalid data entered.");
    }
}

document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-desc').value;
    const taskTime = document.getElementById('task-time').value;

    if (taskName && taskDescription && taskTime) {
        addNewTask(taskName, taskDescription, taskTime);
        alert('Task added successfully');
    } else {
        alert('Please fill all fields.');
    }
});

window.onload = () => {
    loadData();
};

document.addEventListener('DOMContentLoaded', loadData);
