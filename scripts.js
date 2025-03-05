document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskForm = document.getElementById('new-task-form');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const tasksContainer = document.getElementById('tasks');
    const filterAll = document.getElementById('filter-all');
    const filterHigh = document.getElementById('filter-high');
    const filterMedium = document.getElementById('filter-medium');
    const filterLow = document.getElementById('filter-low');
    
    // Event Listeners
    taskForm.addEventListener('submit', addTask);
    filterAll.addEventListener('click', () => filterTasks('all'));
    filterHigh.addEventListener('click', () => filterTasks('high'));
    filterMedium.addEventListener('click', () => filterTasks('medium'));
    filterLow.addEventListener('click', () => filterTasks('low'));
    
    // Initialize
    loadTasks();
    
    // Functions
    function addTask(e) {
        e.preventDefault();
        
        const taskText = taskInput.value;
        const priority = prioritySelect.value;
        
        if (taskText === '') {
            showNotification('Please enter a task', 'error');
            return;
        }
        
        const task = {
            id: Date.now(),
            text: taskText,
            priority: priority,
            completed: false
        };
        
        let tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        createTaskElement(task);
        taskInput.value = '';
        
        showNotification('Task added successfully', 'success');
    }
    
    function loadTasks() {
        let tasks = getTasks();
        
        tasks.forEach((task) => {
            createTaskElement(task);
        });
    }
    
    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item', `priority-${task.priority}`);
        taskItem.dataset.id = task.id;
        
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = task.text;
        
        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');
        
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = '✓';
        completeBtn.addEventListener('click', () => completeTask(task.id));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskActions.appendChild(completeBtn);
        taskActions.appendChild(deleteBtn);
        
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(taskActions);
        
        tasksContainer.appendChild(taskItem);
    }
    
    function completeTask(id) {
        console.log('completeTask', id)
        let tasks = getTasks();
        
        tasks = tasks.map(task => {
            if (task.id == id) {
                task.completed = !task.completed;
            }
            return task;
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        const taskElement = document.querySelector(`.task-item[data-id="${id}"]`);
        taskElement.classList.toggle('completed');
        
        showNotification('Task status updated', 'success');
    }
    
    function deleteTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== id);
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        const taskElement = document.querySelector(`.task-item[data-id="${id}"]`);
        taskElement.remove();
        
        showNotification('Task deleted', 'success');
    }
    
    function filterTasks(filter) {
        const taskItems = document.querySelectorAll('.task-item');
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active-filter');
        });
        
        document.getElementById(`filter-${filter}`).classList.add('active-filter');
        
        taskItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'flex';
            } else {
                if (item.classList.contains(`priority-${filter}`)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
    
    function getTasks() {
        let tasks;
        try {
            tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            // Check task is array
            if(!Array.isArray(tasks)){
                console.error('Retrived tasks are not in array: ', tasks)
                tasks = []
            }
        } catch (e) {
            console.error('Error parsing tasks from localStorage: ', e);
            tasks = [];
        }

        return tasks
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        
        document.getElementById('notification-container').appendChild(notification);
        
        setTimeout(function() {
            notification.remove();
        }, 3000);
    }
});
