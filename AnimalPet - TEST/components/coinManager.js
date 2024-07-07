document.addEventListener('DOMContentLoaded', () => {
    const coinCounter = document.getElementById('coinCounter');
    
    coinCounter.textContent = localStorage.getItem('coinsEarned') || '0';

    window.addEventListener('storage', () => {
        coinCounter.textContent = localStorage.getItem('coinsEarned') || '0';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const loveCountElement = document.getElementById('loveCountElement');
    
    loveCountElement.textContent = localStorage.getItem('loveCountElement') || '0';

    window.addEventListener('storage', () => {
        loveCountElement.textContent = localStorage.getItem('loveCountElement') || '0';
    });
});


