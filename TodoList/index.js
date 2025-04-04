let todos = [];

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function getTodayDate() {
    return formatDate(new Date());
}

// Function to switch active category
function switchCategory(category) {
    document.querySelectorAll('.category-list li').forEach(item => {
        if (item.dataset.category === category) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    renderTodos();
}

// Function to add a new todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const dateInput = document.getElementById('taskDate');
    const text = input.value.trim();
    const date = dateInput.value;
    
    if (text && date) {
        const todo = {
            id: Date.now(),
            text: text,
            date: date,
            completed: false
        };
        
        todos.push(todo);
        renderTodos();
        input.value = '';
        dateInput.value = '';
    }
}

// Function to toggle todo completion
function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// Function to delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Function to get category for a todo
function getTodoCategory(todo) {
    const today = getTodayDate();
    if (todo.date === today) {
        return 'today';
    }
    return todo.date > today ? 'upcoming' : 'past';
}

// Function to render todos based on selected category
function renderTodos() {
    const list = document.getElementById('todoList');
    const activeCategory = document.querySelector('.category-list li.active').dataset.category;
    const today = getTodayDate();
    
    // Filter todos based on category
    let filteredTodos = todos;
    if (activeCategory === 'today') {
        filteredTodos = todos.filter(todo => todo.date === today);
    } else if (activeCategory === 'upcoming') {
        filteredTodos = todos.filter(todo => todo.date > today);
    }
    
    list.innerHTML = '';
    
    // Sort todos by date
    filteredTodos.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    filteredTodos.forEach(todo => {
        const item = document.createElement('li');
        item.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const formattedDate = new Date(todo.date).toLocaleDateString();
        
        item.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <span class="task-date">${formattedDate}</span>
                <button onclick="toggleComplete(${todo.id})" class="complete-btn">✓</button>
                <button onclick="deleteTodo(${todo.id})" class="delete-btn">×</button>
            </div>
        `;
        
        list.appendChild(item);
    });
}

// Set default date to today when page loads
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('taskDate');
    dateInput.value = getTodayDate();
    dateInput.min = getTodayDate(); // Prevent selecting past dates
});

// Add todo when Enter key is pressed
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Handle category selection
document.querySelectorAll('.category-list li').forEach(item => {
    item.addEventListener('click', function() {
        switchCategory(this.dataset.category);
    });
});
