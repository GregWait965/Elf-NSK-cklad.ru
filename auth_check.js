// Получить путь к текущей странице
const currentPage = window.location.pathname.split('/').pop();

// Страницы, для которых не требуется аутентификация
const publicPages = ['index.html', 'index.php'];

// Проверьте, прошел ли пользователь проверку подлинности
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser && !publicPages.includes(currentPage)) {
        window.location.href = 'index.html';
    }
}

// немедленно снимите проверку
checkAuth();