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
const loadingMessage = document.getElementById('loadingMessage');

// LZString compression
var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();

// Check if page loaded with shared carousel
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    
    if (hash) {
        try {
            const decompressed = LZString.decompressFromEncodedURIComponent(hash);
            const data = JSON.parse(decompressed);
            loadSharedCarousel(data);
        } catch (e) {
            console.error('Erro ao carregar:', e);
            alert('Link inválido ou corrompido.');
            window.location.href = window.location.pathname;
        }
    }
});

function showLoading(message) {
    if (loadingMessage) {
        loadingMessage.textContent = message;
        loadingMessage.style.display = 'block';
    }
}

function hideLoading() {
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }
}

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

    // Generate compressed share URL (no backend needed!)
    const shareData = {
        images: uploadedImages,
        username: username
    };
    
    const jsonString = JSON.stringify(shareData);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    const shareUrl = `${window.location.origin}${window.location.pathname}#${compressed}`;
    
    shareLink.value = shareUrl;

    // Build carousel
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
    
    editorMode.style.display = 'none';
    previewSection.classList.add('active');
    window.scrollTo(0, 0);
}

copyBtn.addEventListener('click', () => {
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareLink.value).then(() => {
            showCopySuccess();
        }).catch(() => {
            document.execCommand('copy');
            showCopySuccess();
        });
    } else {
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
