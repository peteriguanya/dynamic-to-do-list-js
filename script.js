document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function(taskText) {
            addTask(taskText, false);
        });
    }

    // Add a task
    function addTask(taskTextParam, save = true) {
        const taskText = taskTextParam || taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            if (save) updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        if (!taskTextParam) taskInput.value = '';

        // Save to localStorage
        if (save) updateLocalStorage();
    }

    // Update localStorage
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            const text = li.firstChild.textContent;
            tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addButton.addEventListener('click', function() {
        addTask();
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') addTask();
    });

    // Load tasks on page load
    loadTasks();
});

