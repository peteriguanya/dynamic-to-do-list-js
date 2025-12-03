document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    const loadTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    };

    // Add a task
    const addTask = (taskTextParam, save = true) => {
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
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            if (save) updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        if (!taskTextParam) taskInput.value = '';

        // Save to localStorage
        if (save) updateLocalStorage();
    };

    // Update localStorage
    const updateLocalStorage = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // Remove the "Remove" text from li content
            const text = li.firstChild.textContent;
            tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Load tasks on page load
    loadTasks();
});
