// скрипт Для хранения и синхронизации сообщений между страницами


document.getElementById('newMessageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const content = document.getElementById('messageContent').value;
    const formattedDate = new Date().toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const newsId = Date.now();
    const messageData = {
        id: newsId,
        date: formattedDate,
        content: content,
        acknowledged: false
    };

    // Получаем существующие сообщения
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.unshift(messageData); // Добавляем новое сообщение в начало
    localStorage.setItem('messages', JSON.stringify(messages));
    
    this.reset();
    alert('Сообщение успешно отправлено!');
});  

// -------------------
function broadcastMessage(message) {
    const event = new CustomEvent('newMessage', { detail: message });
    window.dispatchEvent(event);
}