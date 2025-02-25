function loadMessages() {
    const newsFeed = document.querySelector('.news-feed');
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    
    newsFeed.innerHTML = messages.map(message => `
        <div class="news-item" data-news-id="${message.id}">
            <div class="news-date">${message.date}</div>
            <div class="news-content">
                <p>${message.content}</p>
                <button class="acknowledge-btn ${message.acknowledged ? 'acknowledged' : ''}" 
                        onclick="acknowledgeNews(${message.id})">
                    ${message.acknowledged ? 'Ознакомлен' : 'Ознакомился'}
                </button>
            </div>
        </div>
    `).join('');
}
//изменение цвета кнопки после ее нажатия
function acknowledgeNews(newsId) {
let acknowledged = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
acknowledged.push(newsId.toString());
localStorage.setItem(STORAGE_KEY, JSON.stringify(acknowledged));

// Находим кнопку и меняем её стиль
const button = document.querySelector(`[data-news-id="${newsId}"] .acknowledge-btn`);
button.classList.add('acknowledged');
button.textContent = 'Ознакомлен';

checkAcknowledgement();
}
// Загружаем сообщения при загрузке страницы
document.addEventListener('DOMContentLoaded', loadMessages);
