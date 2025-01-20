document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', toggleTaskCompleteOrRemove);

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = formatDateString(dateInput.value);
        if (taskText === '' || taskDate === '') return;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span class="task-text">${taskText}</span>
            <span class="task-date">${taskDate}</span>
            <button class="remove-task">Remove</button>
        `;
        taskList.appendChild(listItem);
        saveTasks();
        taskInput.value = '';
        dateInput.value = '';
    }

    function toggleTaskCompleteOrRemove(event) {
        if (event.target.classList.contains('checkbox')) {
            event.target.parentElement.classList.toggle('completed');
        } else if (event.target.classList.contains('remove-task')) {
            event.target.parentElement.remove();
        }
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.querySelector('.task-text').textContent,
                date: task.querySelector('.task-date').textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.classList.toggle('completed', task.completed);
            listItem.innerHTML = `
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <span class="task-date">${task.date}</span>
                <button class="remove-task">Remove</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    function formatDateString(dateString) {
        const options = { day: '2-digit', month: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});
