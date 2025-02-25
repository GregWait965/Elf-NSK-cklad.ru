// скрипт для показа уведомления о новых сообщениях
const STORAGE_KEY = 'acknowledgedNews';

function showNotificationBell() {
    const bell = document.querySelector('.notification-bell');
    bell.style.display = 'block';
}

function hideNotificationBell() {
    const bell = document.querySelector('.notification-bell');
    bell.style.display = 'none';
}

function checkAcknowledgement() {
    const acknowledged = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newsItems = document.querySelectorAll('.news-item');
    let hasUnacknowledged = false;

    newsItems.forEach(item => {
        const newsId = item.dataset.newsId;
        if (!acknowledged.includes(newsId)) {
            hasUnacknowledged = true;
        }
    });

    if (hasUnacknowledged) {
        showNotificationBell();
    } else {
        hideNotificationBell();
    }
}

function acknowledgeNews(newsId) {
    let acknowledged = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    acknowledged.push(newsId.toString());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(acknowledged));
    checkAcknowledgement();
}
// <!-- скрипт Для хранения и синхронизации сообщений между страницами

document.getElementById('newMessageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const content = document.getElementById('messageContent').value;
    const formattedDate = new Date().toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const newsId = Date.now();
    const newMessage = `
        <div class="news-item" data-news-id="${newsId}">
            <div class="news-date">${formattedDate}</div>
            <div class="news-content">
                <p>${content}</p>
                <button class="acknowledge-btn" onclick="acknowledgeNews(${newsId})">Ознакомился</button>
            </div>
        </div>
    `;
    
    const newsFeed = document.querySelector('.news-feed');
    newsFeed.insertAdjacentHTML('afterbegin', newMessage);
    
    showNotificationBell();
    this.reset();
});

// Проверяем при загрузке страницы
document.addEventListener('DOMContentLoaded', checkAcknowledgement);