// В начале файла добавим проверку
// В начале файла после загрузки данных


/// Получаем данные сотрудников из localStorage
const employeeDataStorage = JSON.parse(localStorage.getItem('employeeDataStorage'));
const employees = employeeDataStorage.employeeData.filter(emp => emp.fullName && emp.fullName.trim());
const employeeList = document.getElementById('employeeList');
console.log('Данные после импорта CSV:', employeeDataStorage);
console.log('Структура первого сотрудника:', employees[0]);
console.log('Количество сотрудников:', employees.length);
// Добавление сотрудников в список используя fullName
// Добавление сотрудников в список используя fullName
employees.forEach(emp => {
    const checkbox = document.createElement('div');
    checkbox.className = 'employee-item';
    checkbox.innerHTML = `
        <input type="checkbox" id="${emp.fullName}" name="employee" value="${emp.fullName}">
        <label for="${emp.fullName}">${emp.fullName}</label>
    `;
    employeeList.appendChild(checkbox);
});

// Обработка показа/скрытия списка сотрудников
const employeeSelector = document.getElementById('employeeSelector');
const handleEmployeeListVisibility = (show) => {
    employeeList.style.display = show ? 'block' : 'none';
};

employeeSelector.addEventListener('mouseenter', () => handleEmployeeListVisibility(true));
employeeList.addEventListener('mouseenter', () => handleEmployeeListVisibility(true));
employeeList.addEventListener('mouseleave', () => handleEmployeeListVisibility(false));
employeeSelector.addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('.employee-list')) {
        handleEmployeeListVisibility(false);
    }
});

// Функция добавления задачи
// И обновим функцию addTask() для работы с fullName
function addTask() {
    const date = document.getElementById('taskDate').value;
    const taskName = document.getElementById('taskName').value;
    const selectedEmployees = [...document.querySelectorAll('input[name="employee"]:checked')]
        .map(cb => cb.value); // Теперь получаем непосредственно fullName

    // Сохранение задачи с именами

    // Валидация полей
    if (!date) {
        alert('Выберите дату');
        return;
    }
    if (!taskName) {
        alert('Поставьте задачу');
        return;
    }
    if (selectedEmployees.length === 0) {
        alert('Выберите исполнителей');
        return;
    }

    // Сохранение задачи с именами
    const taskData = {
        date,
        taskName,
        selectedEmployees,
        createdAt: new Date().toISOString(),
    };

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
    resetForm();
}
// Добавляем функцию удаления задачи
function deleteTask(date, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const tasksForDate = tasks.filter(task => task.date === date);
    const taskToDelete = tasksForDate[index];
    const taskIndex = tasks.indexOf(taskToDelete);
    
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}
// Отображение задач
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskBlocks = document.getElementById('taskBlocks');
    taskBlocks.innerHTML = '';

    // Группировка задач по датам
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.date]) acc[task.date] = [];
        acc[task.date].push(task);
        return acc;
    }, {});

    // Отображение сгруппированных задач
    Object.entries(groupedTasks)
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
        .forEach(([date, dateTasks]) => {
            const block = document.createElement('div');
            block.className = 'task-block';
            block.innerHTML = `<h3>Дата: ${date}</h3>`;

            dateTasks.forEach((task, index) => {
                // Теперь selectedEmployees уже содержит fullName
                const employeeNames = task.selectedEmployees;
                
                block.innerHTML += `
                    <div class="task-item">
                        <p><strong>${index + 1}.</strong> ${task.taskName}</p>
                        <p>Исполнители: ${employeeNames.join(', ')}</p>
                        <button type="button" class="nav-btn" onclick="deleteTask('${date}', ${index})">УДАЛИТЬ</button>
                    </div>
                `;
            });
            taskBlocks.appendChild(block);
        });
}






// Публикация задач
function publishTasks() {
    const tasks = localStorage.getItem('tasks');
    if (!tasks || JSON.parse(tasks).length === 0) {
        alert('Нет задач для публикации');
        return;
    }
    sessionStorage.setItem('publishedTasks', tasks);
    alert('Задачи опубликованы и доступны на странице ПЛАНЕРКА.html');
}

// Сброс формы
function resetForm() {
    document.getElementById('taskForm').reset();
    handleEmployeeListVisibility(false);
}

// Инициализация отображения задач при загрузке страницы
displayTasks();
