 // Функция отображения опубликованных задач
 function displayPublishedTasks() {
    const tasks = JSON.parse(sessionStorage.getItem('publishedTasks') || '[]');
    const taskBlocks = document.getElementById('publishedTaskBlocks');
    
    if (tasks.length === 0) {
        taskBlocks.innerHTML = '<p>Нет опубликованных задач</p>';
        return;
    }

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
           block.innerHTML += `
               <div class="task-item">
                   <p><strong>${index + 1}.</strong> ${task.taskName}</p>
                   <p>Исполнители: ${task.selectedEmployees.join(', ')}</p>
               </div>
           `;
       });

       taskBlocks.appendChild(block);
   });
}


// Инициализация отображения при загрузке страницы
displayPublishedTasks();
