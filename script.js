document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));

    // Add Task Function
    function addTask(taskTextInput, save = true) {
        const taskText = taskTextInput || taskInput.value.trim();
        if (!taskText) return alert("Please enter a task.");

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            if (save) updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) updateLocalStorage();
        taskInput.value = '';
    }

    // Update Local Storage
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addTask();
    });
});
