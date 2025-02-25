// <!-- Отображение никнейма Ползователя -->
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'entrance.html';
        return;
    }

    // Отображать имя сотрудника
    const employeeNameElement = document.getElementById('employee-name');
    employeeNameElement.innerText = currentUser.fullName || 'Имя не указано';
    
    // Display profile picture if exists
    const profilePic = document.getElementById('profile-pic');
    profilePic.src = localStorage.getItem('profilePic') || '';

    // Обновлять другую информацию о сотрудниках
    renderWarehouseInfo(currentUser);
    renderHistograms(currentUser);
    renderAverageLoad(currentUser);
    renderErrorInfo(currentUser);
    renderWorkInfo(currentUser);
});

    // <!-- --------время и дата-------- -->
    
    
    function updateDate() {
        const dateElement = document.getElementById('current-date');
        const options = { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        const currentDate = new Date().toLocaleDateString('ru-RU', options);
        dateElement.textContent = currentDate;
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        updateDate();
    });
    
    // <!-- отработано часов, смен -->

    function renderWorkInfo(currentUser) {
    const workInfo = document.getElementById('work-info');
    workInfo.innerHTML = `
        <h6>Отработано часов: ${currentUser.hoursWorked}</h6>
        <h6>Отработано смен: ${currentUser.shiftsWorked}</h6>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'entrance.html';
        return;
    }
    // ... other code ...
    renderWorkInfo(currentUser);
});

// <!--------- принадлежность к складу и колличество коллег -->

function renderWarehouseInfo(currentUser) {
    const warehouseInfo = document.getElementById('warehouse-info');
    
    // Получить название склада из первого столбца
    const warehouseName = currentUser.namb;
    
    // Получите данные обо всех сотрудниках
    const employeeDataStorage = JSON.parse(localStorage.getItem('employeeDataStorage'));
    const employeeData = employeeDataStorage ? employeeDataStorage.employeeData : [];
    
    // Подсчитайте количество сотрудников на одном складе
    const employeesInWarehouse = employeeData.filter(emp => 
        emp.namb === warehouseName
    ).length;

    warehouseInfo.innerHTML = `
        <p><h7>Склад: ${warehouseName}</h7></p>
        <p><h7>Количество сотрудников: ${employeesInWarehouse}</h7></p>
    `;
}
// <!--------- информация о допущенных ошибок и их процентное соотношение -->

function renderErrorInfo(currentUser) {
    const errorInfo = document.getElementById('error-info');
    errorInfo.innerHTML = `
        <h6>Подтвержденных претензий: ${currentUser.errorsMade}</h6>
        <h6>% допущенных ошибок: ${currentUser.errorRate}</h6>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'entrance.html';
        return;
    }
    
    renderErrorInfo(currentUser);
});
// <!--------- гистограммы участия в сборке и погрузке, среднесменной загруженности, допущенных ошибок и их процентное соотношение -->

function renderHistograms(currentUser) {
    const assemblyParticipation = document.getElementById('assembly-participation');
    const loadingParticipation = document.getElementById('loading-participation');
    
    // Соберите всех сотрудников с одного склада
    const employeeDataStorage = JSON.parse(localStorage.getItem('employeeDataStorage'));
    const warehouseEmployees = employeeDataStorage.employeeData.filter(emp => 
        emp.namb === currentUser.namb
    );

    // Гистограммы участия в сборке для всех сотрудников склада
    let assemblyHtml = `<h6>% участия в сборке:</h6>`;
    warehouseEmployees.forEach(emp => {
        assemblyHtml += `
            <div class="employee-histogram">
                <span class="employee-name">${emp.fullName}</span>
                <div class="histogram-bar" style="width: ${emp.assemblyParticipation}%">
                    ${emp.assemblyParticipation}
                </div>
            </div>`;
    });
    assemblyParticipation.innerHTML = assemblyHtml;

    // Гистограммы участия в погрузке для всех сотрудников склада
    let loadingHtml = `<h6>% участия в погрузке:</h6>`;
    warehouseEmployees.forEach(emp => {
        loadingHtml += `
            <div class="employee-histogram">
                <span class="employee-name">${emp.fullName}</span>
                <div class="histogram-bar" style="width: ${emp.loadingParticipation}%">
                    ${emp.loadingParticipation}
                </div>
            </div>`;
    });
    loadingParticipation.innerHTML = loadingHtml;
}

function renderAverageLoad(currentUser) {
    const averageLoad = document.getElementById('average-load');
    
    // Соберите всех сотрудников с одного склада
    const employeeDataStorage = JSON.parse(localStorage.getItem('employeeDataStorage'));
    const warehouseEmployees = employeeDataStorage.employeeData.filter(emp => 
        emp.namb === currentUser.namb
    );

    // Гистограммы средней загрузки для всех сотрудников склада
    let loadHtml = `<h6>% Среднесменной загруженности:</h6>`;
    warehouseEmployees.forEach(emp => {
        loadHtml += `
            <div class="employee-histogram">
                <span class="employee-name">${emp.fullName}</span>
                <div class="histogram-bar" style="width: ${emp.averageShiftLoad}%">
                    ${emp.averageShiftLoad}
                </div>
            </div>`;
    });
    averageLoad.innerHTML = loadHtml;
}


document.head.insertAdjacentHTML('beforeend', styles);

// Сохраняйте существующие прослушиватели событий
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    renderHistograms(currentUser);
    renderAverageLoad(currentUser);
});

window.addEventListener('storage', (e) => {
    if (e.key === 'currentUser') {
        const currentUser = JSON.parse(e.newValue);
        if (currentUser) {
            renderHistograms(currentUser);
            renderAverageLoad(currentUser);
        }
    }
});
