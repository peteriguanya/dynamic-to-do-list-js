document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    const loadTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    };

    // Function to add a task
    const addTask = (taskTextParam = null, save = true) => {
        const taskText = taskTextParam !== null ? taskTextParam : taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

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

        // Clear input field if added from user input
        if (taskTextParam === null) {
            taskInput.value = '';
        }

        // Save to localStorage
        if (save) {
            updateLocalStorage();
        }
    };

    // Function to update localStorage
    const updateLocalStorage = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent); // firstChild is the task text
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});


