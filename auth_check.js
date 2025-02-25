// Get current page path
const currentPage = window.location.pathname.split('/').pop();

// Pages that don't require authentication
const publicPages = ['entranse.html', 'entranse.php'];

// Check if user is authenticated
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser && !publicPages.includes(currentPage)) {
        window.location.href = 'entranse.html';
    }
}

// Run check immediately
checkAuth();