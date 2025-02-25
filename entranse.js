    
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Ведение журнала отладки
    console.log('Login attempt:', {username, password});
    
    const savedStorage = localStorage.getItem('employeeDataStorage');
    console.log('Saved storage:', savedStorage);
    
    if (!savedStorage) {
        alert('База данных сотрудников не загружена');
        return;
    }
    
    const { employeeData } = JSON.parse(savedStorage);
    console.log('Employee data:', employeeData);
    
    // ------------с -входом админа----------------------------
    
employeeData.forEach(emp => {
    console.log('Comparing with:', {
        storedName: emp.fullName,
        storedNumber: emp.personnelNumber
    });
});

const enteredUsername = username.toLowerCase().trim();
const enteredPassword = password.trim();

// Проверка для администратора
if (enteredUsername === 'admin_elf_nsk' && enteredPassword === 'admin_elf_nsk') {
    console.log('Admin access granted');
    window.location.href = 'admin.html';
    return; // Прекращаем выполнение функции
}

const employee = employeeData.find(emp => 
    emp.fullName.toLowerCase().trim() === enteredUsername && 
    String(emp.personnelNumber).trim() === enteredPassword
);

if (employee) {
    console.log('Match found:', employee);
    localStorage.setItem('currentUser', JSON.stringify(employee));
    window.location.href = 'info.html';
} else {
    alert('Проверьте правильность ввода ФИО и табельного номера');
}
}



document.getElementById('loginForm').addEventListener('submit', login);




