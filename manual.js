
document.querySelectorAll('.file-input-image').forEach(input => {
    input.addEventListener('change', function() {
        const preview = this.closest('.attachments-section').querySelector('.image-preview');
        preview.innerHTML = '';
        [...this.files].forEach(file => {
            if(file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = e => {
                    preview.innerHTML += `<img src="${e.target.result}" style="max-width: 200px; max-height: 200px;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    });
});


document.querySelectorAll('.file-input-video').forEach(input => {
    input.addEventListener('change', function() {
        const preview = this.closest('.attachments-section').querySelector('.video-preview');
        preview.innerHTML = '';
        [...this.files].forEach(file => {
            if(file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.style.maxWidth = '300px';
                video.controls = true;
                preview.appendChild(video);
            }
        });
    });
});

document.querySelectorAll('.file-input-doc').forEach(input => {
    input.addEventListener('change', function() {
        const preview = this.closest('.attachments-section').querySelector('.doc-preview');
        preview.innerHTML = '';
        [...this.files].forEach(file => {
            preview.innerHTML += `
                <div class="doc-item">
                    <a href="${URL.createObjectURL(file)}" target="_blank">${file.name}</a>
                </div>`;
        });
    });
});