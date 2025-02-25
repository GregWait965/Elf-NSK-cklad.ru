// прямая обработка импорта в формате CSV
function saveAndMaintainEmployeeData(newData) {
    // Get timestamp of update
    const updateTimestamp = new Date().getTime();
    
    // Создать объект для хранения данных
    const dataStorage = {
        timestamp: updateTimestamp,
        employeeData: newData,
        lastUpdate: new Date().toLocaleString()
    };
    
    // Сохранить в локальном хранилище
    localStorage.setItem('employeeDataStorage', JSON.stringify(dataStorage));
}

function handleCSVImport() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const csvData = event.target.result;
            const decoder = new TextDecoder('windows-1251');
            const decodedData = decoder.decode(new Uint8Array(event.target.result));
            
            const rows = decodedData.split(/\r?\n/);
            const employeeData = parseEmployeeData(rows);
            
            // Сохранение данных с отметкой времени
            saveAndMaintainEmployeeData(employeeData);
            renderEmployeeTable(rows);
        };
        
        reader.readAsArrayBuffer(file);
    });
    
    fileInput.click();
}


// функция для загрузки сохраненных табличных данных
function loadSavedTableData() {
    const savedStorage = localStorage.getItem('employeeDataStorage');
    if (savedStorage) {
        const { employeeData } = JSON.parse(savedStorage);
        if (employeeData && employeeData.length > 0) {
            const container = document.getElementById('tables-container');
            container.innerHTML = '';
            const table = document.createElement('table');
            
            let tableHTML = `
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Фамилия, имя, отчество</th>
                        <th>Отраб. часов</th>
                        <th>Отраб. смен</th>
                        <th>Собрано строк</th>
                        <th>% участия в сборке</th>
                        <th>Табельный номер</th>
                        <th>% участия в погрузке</th>
                        <th>% Сред/смен. загруж.</th>
                        <th>Допущено ошибок</th>
                        <th>% допущ. ошибок</th>
                    </tr>
                </thead>
                <tbody>
            `;

            employeeData.forEach((employee, index) => {
                tableHTML += `
                    <tr>
                        <td>${employee.namb}</td>
                        <td>${employee.fullName}</td>
                        <td>${employee.hoursWorked}</td>
                        <td>${employee.shiftsWorked}</td>
                        <td>${employee.rowsCollected || '-'}</td>
                        <td>${employee.assemblyParticipation}</td>
                        <td>${employee.personnelNumber}</td>
                        <td>${employee.loadingParticipation}</td>
                        <td>${employee.averageShiftLoad}</td>
                        <td>${employee.errorsMade}</td>
                        <td>${employee.errorRate}</td>
                    </tr>
                `;
            });

            tableHTML += '</tbody>';
            table.innerHTML = tableHTML;
            container.appendChild(table);
        }
    }
}

// прослушиватель событий для загрузки табличных данных при загрузке страницы
document.addEventListener('DOMContentLoaded', loadSavedTableData);

// сохраненные импортированные данные при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('importedEmployeeData');
    if (savedData) {
        const rows = JSON.parse(savedData);
        renderEmployeeTable(rows);
    }
});



function parseEmployeeData(rows) {
    const data = [];
    // Skip header row
    for(let i = 1; i < rows.length; i++) {
        if(!rows[i].trim()) continue;
        
        const columns = rows[i].split(';');
        data.push({
            namb: columns[0].trim(),
            fullName: columns[1].trim(),
            personnelNumber: columns[6].trim(),
            hoursWorked: columns[2].trim(),
            shiftsWorked: columns[3].trim(),
            assemblyParticipation: columns[5].trim(),
            loadingParticipation: columns[7].trim(),
            averageShiftLoad: columns[8].trim(),
            errorsMade: columns[9].trim(),
            errorRate: columns[10].trim(),
            rowsCollected: columns[4].trim()  // Added the 11th column
        });
    }
    return data;
}


// Прослушиватель событий кнопки обновления
document.querySelector('.update-btn').addEventListener('click', handleCSVImport);