document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Add a new task
    function addTask(taskText = null, save = true) {
        const text = taskText !== null ? taskText : taskInput.value.trim();

        if (text === '') {
            if (taskText === null) alert('Please enter a task');
            return;
        }

        // Create li element for the task
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input if this is a user-added task
        if (taskText === null) taskInput.value = '';

        // Save task to localStorage
        if (save) updateLocalStorage();
    }

    // Update localStorage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent); // Get task text only
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Initialize tasks from localStorage
    loadTasks();
});

