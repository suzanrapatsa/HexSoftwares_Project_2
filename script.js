const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => {
    addToList(task.text, task.completed);
});

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addToList(taskText);
        taskInput.value = '';
    }
});

function addToList(taskText, completed = false) {
    const li = document.createElement('li');
    
    // Create a span to hold task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    if (completed) {
        li.classList.add('completed');
    }
    taskList.appendChild(li);

    // Add click event to mark as completed
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering completion
        
        // Create edit input
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskSpan.textContent.replace('Remove', '').trim();
        
        // Create save button
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.classList.add('save-btn');
        
        // Replace task text with input and save button
        li.innerHTML = '';
        li.appendChild(editInput);
        li.appendChild(saveBtn);
        
        // Focus on input
        editInput.focus();
        
        // Save edit functionality
        saveBtn.addEventListener('click', () => {
            const newTaskText = editInput.value.trim();
            if (newTaskText) {
                // Recreate the list item with new text
                li.innerHTML = '';
                
                const newTaskSpan = document.createElement('span');
                newTaskSpan.textContent = newTaskText;
                li.appendChild(newTaskSpan);
                
                // Re-add edit and remove buttons
                addEditAndRemoveButtons(li);
                
                // Update local storage
                updateLocalStorage();
            }
        });
        
        // Allow saving on Enter key
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveBtn.click();
            }
        });
    });

    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering completion
        taskList.removeChild(li);
        updateLocalStorage();
    });

    // Add buttons to list item
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    updateLocalStorage();
}

// Function to add edit and remove buttons to a list item
function addEditAndRemoveButtons(li) {
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering completion
        
        // Get current task text
        const taskSpan = li.querySelector('span');
        
        // Create edit input
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskSpan.textContent.trim();
        
        // Create save button
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.classList.add('save-btn');
        
        // Replace task text with input and save button
        li.innerHTML = '';
        li.appendChild(editInput);
        li.appendChild(saveBtn);
        
        // Focus on input
        editInput.focus();
        
        // Save edit functionality
        saveBtn.addEventListener('click', () => {
            const newTaskText = editInput.value.trim();
            if (newTaskText) {
                // Recreate the list item with new text
                li.innerHTML = '';
                
                const newTaskSpan = document.createElement('span');
                newTaskSpan.textContent = newTaskText;
                li.appendChild(newTaskSpan);
                
                // Re-add edit and remove buttons
                addEditAndRemoveButtons(li);
                
                // Update local storage
                updateLocalStorage();
            }
        });
        
        // Allow saving on Enter key
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveBtn.click();
            }
        });
    });

    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering completion
        taskList.removeChild(li);
        updateLocalStorage();
    });

    // Add buttons to list item
    li.appendChild(editBtn);
    li.appendChild(removeBtn);
}

function updateLocalStorage() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
        const taskText = taskItems[i].querySelector('span') 
            ? taskItems[i].querySelector('span').textContent 
            : taskItems[i].textContent.trim();
        
        const task = {
            text: taskText,
            completed: taskItems[i].classList.contains('completed')
        };
        tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}