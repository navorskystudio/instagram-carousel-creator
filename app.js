let uploadedImages = [];
let currentSlide = 0;
let viewOnlySlide = 0;

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const previewBtn = document.getElementById('previewBtn');
const clearBtn = document.getElementById('clearBtn');
const previewSection = document.getElementById('previewSection');
const backBtn = document.getElementById('backBtn');
const editorMode = document.getElementById('editorMode');
const viewOnlyMode = document.getElementById('viewOnlyMode');
const copyBtn = document.getElementById('copyBtn');
const shareLink = document.getElementById('shareLink');
const newCarouselBtn = document.getElementById('newCarouselBtn');
const createOwnBtn = document.getElementById('createOwnBtn');
const shortenBtn = document.getElementById('shortenBtn');

// Check if page loaded with shared carousel data
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('data');
    const shortId = urlParams.get('id');
    
    if (shortId) {
        // Load from short ID (stored in localStorage)
        const storedData = localStorage.getItem(`carousel_${shortId}`);
        if (storedData) {
            try {
                const decodedData = JSON.parse(storedData);
                loadSharedCarousel(decodedData);
            } catch (e) {
                console.error('Erro ao carregar carrossel', e);
            }
        }
    } else if (sharedData) {
        // Fallback to long URL format
        try {
            const decodedData = JSON.parse(decodeURIComponent(atob(sharedData)));
            loadSharedCarousel(decodedData);
        } catch (e) {
            console.error('Erro ao carregar carrossel compartilhado', e);
        }
    }
});

function loadSharedCarousel(data) {
    editorMode.style.display = 'none';
    previewSection.classList.remove('active');
    viewOnlyMode.classList.add('active');

    const { images, username } = data;
    
    const initials = username.substring(0, 2).toUpperCase();
    document.getElementById('viewOnlyInitials').textContent = initials;
    document.getElementById('viewOnlyUsername').textContent = username;

    const track = document.getElementById('viewOnlyCarouselTrack');
    const indicatorsContainer = document.getElementById('viewOnlyIndicators');
    
    track.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${img}" alt="Slide ${index + 1}">`;
        track.appendChild(slide);

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToViewOnlySlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    viewOnlySlide = 0;
    updateViewOnlyCarousel(images.length);
    setupViewOnlyNavigation(images.length);
}

function updateViewOnlyCarousel(totalSlides) {
    const track = document.getElementById('viewOnlyCarouselTrack');
    const counter = document.getElementById('viewOnlyCounter');
    const indicators = document.querySelectorAll('#viewOnlyIndicators .indicator');

    const offset = viewOnlySlide * -100;
    track.style.transform = `translateX(${offset}%)`;
    counter.textContent = `${viewOnlySlide + 1}/${totalSlides}`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === viewOnlySlide);
    });

    document.getElementById('viewOnlyPrevBtn').disabled = viewOnlySlide === 0;
    document.getElementById('viewOnlyNextBtn').disabled = viewOnlySlide === totalSlides - 1;
}

function goToViewOnlySlide(index) {
    const totalSlides = document.querySelectorAll('#viewOnlyCarouselTrack .carousel-slide').length;
    if (index >= 0 && index < totalSlides) {
        viewOnlySlide = index;
        updateViewOnlyCarousel(totalSlides);
    }
}

function setupViewOnlyNavigation(totalSlides) {
    document.getElementById('viewOnlyPrevBtn').onclick = () => {
        if (viewOnlySlide > 0) {
            viewOnlySlide--;
            updateViewOnlyCarousel(totalSlides);
        }
    };

    document.getElementById('viewOnlyNextBtn').onclick = () => {
        if (viewOnlySlide < totalSlides - 1) {
            viewOnlySlide++;
            updateViewOnlyCarousel(totalSlides);
        }
    };
}

createOwnBtn.addEventListener('click', () => {
    window.location.href = window.location.pathname;
});

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    const maxFiles = 20;
    const remainingSlots = maxFiles - uploadedImages.length;
    
    if (files.length > remainingSlots) {
        alert(`Você pode adicionar no máximo ${remainingSlots} imagens. Máximo total: ${maxFiles}`);
        return;
    }

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImages.push(e.target.result);
                renderThumbnails();
                updatePreviewButton();
            };
            reader.readAsDataURL(file);
        }
    });
}

function renderThumbnails() {
    thumbnailsContainer.innerHTML = '';
    
    uploadedImages.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.draggable = true;
        thumbnail.dataset.index = index;
        
        thumbnail.innerHTML = `
            <img src="${img}" alt="Imagem ${index + 1}">
            <div class="thumbnail-number">${index + 1}</div>
            <button class="thumbnail-remove" onclick="removeImage(${index})">×</button>
        `;

        thumbnail.addEventListener('dragstart', handleDragStart);
        thumbnail.addEventListener('dragover', handleDragOver);
        thumbnail.addEventListener('drop', handleDrop);
        thumbnail.addEventListener('dragend', handleDragEnd);
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = parseInt(e.target.closest('.thumbnail').dataset.index);
    e.target.closest('.thumbnail').style.opacity = '0.5';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const dropIndex = parseInt(e.target.closest('.thumbnail').dataset.index);
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
        const draggedImage = uploadedImages[draggedIndex];
        uploadedImages.splice(draggedIndex, 1);
        uploadedImages.splice(dropIndex, 0, draggedImage);
        renderThumbnails();
    }
}

function handleDragEnd(e) {
    e.target.closest('.thumbnail').style.opacity = '1';
    draggedIndex = null;
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    renderThumbnails();
    updatePreviewButton();
}

function updatePreviewButton() {
    previewBtn.disabled = uploadedImages.length === 0;
}

clearBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja remover todas as imagens?')) {
        uploadedImages = [];
        renderThumbnails();
        updatePreviewButton();
        fileInput.value = '';
    }
});

previewBtn.addEventListener('click', () => {
    generatePreview();
    editorMode.style.display = 'none';
    previewSection.classList.add('active');
    window.scrollTo(0, 0);
});

backBtn.addEventListener('click', () => {
    previewSection.classList.remove('active');
    editorMode.style.display = 'block';
    window.scrollTo(0, 0);
});

newCarouselBtn.addEventListener('click', () => {
    if (confirm('Deseja criar um novo carrossel? As imagens atuais serão removidas.')) {
        uploadedImages = [];
        renderThumbnails();
        updatePreviewButton();
        fileInput.value = '';
        previewSection.classList.remove('active');
        editorMode.style.display = 'block';
        window.scrollTo(0, 0);
    }
});

function generateShortId() {
    // Generate a short random ID (8 characters)
    return Math.random().toString(36).substring(2, 10);
}

function generatePreview() {
    const username = document.getElementById('usernameInput').value || 'usuario';
    const likes = document.getElementById('likesInput').value || '0';
    const caption = document.getElementById('captionInput').value || '';

    const initials = username.substring(0, 2).toUpperCase();
    document.getElementById('previewInitials').textContent = initials;
    document.getElementById('previewUsername').textContent = username;
    document.getElementById('previewCaptionUsername').textContent = username;
    document.getElementById('previewLikes').textContent = `${likes} curtidas`;
    document.getElementById('previewCaption').textContent = caption;

    // Generate short link
    const shareData = {
        images: uploadedImages,
        username: username
    };
    
    const shortId = generateShortId();
    localStorage.setItem(`carousel_${shortId}`, JSON.stringify(shareData));
    
    const shortUrl = `${window.location.origin}${window.location.pathname}?id=${shortId}`;
    shareLink.value = shortUrl;

    const track = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('indicators');
    
    track.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    uploadedImages.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${img}" alt="Slide ${index + 1}">`;
        track.appendChild(slide);

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    currentSlide = 0;
    updateCarousel();
}

copyBtn.addEventListener('click', () => {
    shareLink.select();
    shareLink.setSelectionRange(0, 99999); // For mobile
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareLink.value).then(() => {
            showCopySuccess();
        }).catch(() => {
            // Fallback to execCommand
            document.execCommand('copy');
            showCopySuccess();
        });
    } else {
        // Fallback for older browsers
        document.execCommand('copy');
        showCopySuccess();
    }
});

function showCopySuccess() {
    copyBtn.textContent = '✅ Copiado!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
        copyBtn.textContent = '📋 Copiar';
        copyBtn.classList.remove('copied');
    }, 2000);
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const counter = document.getElementById('counter');
    const indicators = document.querySelectorAll('#indicators .indicator');
    const totalSlides = uploadedImages.length;

    const offset = currentSlide * -100;
    track.style.transform = `translateX(${offset}%)`;
    counter.textContent = `${currentSlide + 1}/${totalSlides}`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function goToSlide(index) {
    if (index >= 0 && index < uploadedImages.length) {
        currentSlide = index;
        updateCarousel();
    }
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < uploadedImages.length - 1) {
        currentSlide++;
        updateCarousel();
    }
});

document.addEventListener('keydown', (e) => {
    if (previewSection.classList.contains('active')) {
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentSlide < uploadedImages.length - 1) {
            currentSlide++;
            updateCarousel();
        }
    } else if (viewOnlyMode.classList.contains('active')) {
        const totalSlides = document.querySelectorAll('#viewOnlyCarouselTrack .carousel-slide').length;
        if (e.key === 'ArrowLeft' && viewOnlySlide > 0) {
            viewOnlySlide--;
            updateViewOnlyCarousel(totalSlides);
        } else if (e.key === 'ArrowRight' && viewOnlySlide < totalSlides - 1) {
            viewOnlySlide++;
            updateViewOnlyCarousel(totalSlides);
        }
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (previewSection.classList.contains('active')) {
            if (diff > 0 && currentSlide < uploadedImages.length - 1) {
                currentSlide++;
                updateCarousel();
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        } else if (viewOnlyMode.classList.contains('active')) {
            const totalSlides = document.querySelectorAll('#viewOnlyCarouselTrack .carousel-slide').length;
            if (diff > 0 && viewOnlySlide < totalSlides - 1) {
                viewOnlySlide++;
                updateViewOnlyCarousel(totalSlides);
            } else if (diff < 0 && viewOnlySlide > 0) {
                viewOnlySlide--;
                updateViewOnlyCarousel(totalSlides);
            }
        }
    }
}
