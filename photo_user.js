 // Обработка загрузки и валидации фото
//  function createMetricRow(value, maxValue, name) {
//     const percentage = (value / maxValue) * 100;
//     return `
//         <div class="metric-row">
//             <div class="metric-value">${value}</div>
//             <div class="metric-bar">
//                 <div class="metric-bar-fill" style="width: ${percentage}%"></div>
//             </div>
//             <div class="metric-name">${name}</div>
//         </div>
//     `;
// }

// document.getElementById('photoUpload').addEventListener('change', function(e) {
//     const file = e.target.files[0];
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     const allowedTypes = ['image/jpeg', 'image/png'];

//     if (!allowedTypes.includes(file.type)) {
//         alert('Разрешены только изображения в формате JPEG или PNG');
//         return;
//     }

//     if (file.size > maxSize) {
//         alert('Размер файла не должен превышать 5MB');
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = function(e) {
//         const img = new Image();
//         img.onload = function() {
//             // Сохраняем фото в localStorage
//             localStorage.setItem('employeePhoto', e.target.result);
//             document.getElementById('employeePhoto').src = e.target.result;
//         };
//         img.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
// });


// <!-- Отображение фото Ползователя -->
function uploadPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0];
        if (file && (file.size <= 2000000) && (file.type.startsWith('image/'))) {
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem('profilePic', reader.result);
                document.getElementById('profile-pic').src = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Неверный формат или размер изображения.');
        }
    };
    input.click();
}