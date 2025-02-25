const STORAGE_KEY = 'acknowledgedNews';
    
    function checkAcknowledgement() {
        const acknowledged = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const hasUnacknowledged = acknowledged.length === 0;
        
        const bell = document.querySelector('.notification-bell');
        bell.style.display = hasUnacknowledged ? 'block' : 'none';
    }
    
    document.addEventListener('DOMContentLoaded', checkAcknowledgement);