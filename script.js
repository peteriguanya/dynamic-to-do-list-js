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
        let text = taskText || taskInput.value.trim();
        if (!text) {
            alert('Please enter a task.');
            return;
        }

        // Create task element
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = '';
    }

    // Update localStorage after removing a task
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    loadTasks();
});
