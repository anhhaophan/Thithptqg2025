// Đếm ngược đến ngày thi THPT
const EXAM_DATE = new Date('June 26, 2025 00:00:00').getTime();
const wishBtn = document.getElementById('wishBtn');
let countdownInterval;


function updateCountdown() {
    const now = new Date().getTime();
    const distance = EXAM_DATE - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

 
    try {
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    } catch (error) {
        console.error('Lỗi khi cập nhật thời gian:', error);
        clearInterval(countdownInterval); 
        return;
    }

  
    if (distance <= 0) {
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        document.getElementById('seconds').innerHTML = '00';
        wishBtn.disabled = false;
        wishBtn.textContent = "Nhận Lời Chúc May Mắn";
        wishBtn.style.opacity = "1";
        wishBtn.style.cursor = "pointer";
        clearInterval(countdownInterval); 
        return;
    } else {
        wishBtn.disabled = true;
        wishBtn.textContent = "Đến ngày thi mới được bấm hihi!!";
        wishBtn.style.opacity = "0.7";
        wishBtn.style.cursor = "not-allowed";
    }
}

// Hàm tạo hiệu ứng confetti
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const container = document.querySelector('.container');
    if (!container) {
        console.error('Không tìm thấy container cho confetti');
        return;
    }

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        container.appendChild(confetti);

        let position = -10;
        let rotation = Math.random() * 360;
        const speed = Math.random() * 3 + 2;
        const spin = Math.random() * 10 - 5;
        const fall = setInterval(() => {
            position += speed;
            rotation += spin;
            confetti.style.top = position + 'px';
            confetti.style.transform = 'rotate(' + rotation + 'deg)';
            if (position > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 20);
    }
}

const style = document.createElement('style');
style.innerHTML = `
    @keyframes heartBeat {
        0% { transform: scale(1); }
        14% { transform: scale(1.3); }
        28% { transform: scale(1); }
        42% { transform: scale(1.3); }
        70% { transform: scale(1); }
    }
    .animated-text {
        display: inline-block;
        animation: heartBeat 2s infinite;
    }
`;
document.head.appendChild(style);
wishBtn.addEventListener('click', function() {
    const now = new Date().getTime();
    if (now >= EXAM_DATE) {
        const wishMessage = document.getElementById('wishMessage');
        if (wishMessage) {
            wishMessage.style.display = 'block';
        } else {
            console.error('Không tìm thấy phần tử wishMessage');
        }

        if (!this.dataset.confettiCreated) {
            createConfetti();
            this.dataset.confettiCreated = 'true';
        }
        const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#8fd3f4', '#84fab0'];
        document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
        this.innerHTML = '<span class="animated-text">Thi Tốt Nhé! ❤️</span>';
        this.style.background = 'linear-gradient(to right, #ff758c, #ff7eb3)';
        this.style.color = 'white';
        this.disabled = true; 
    }
});
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
// Trò chơi click nhanh
let gameStarted = false;
let clickCount = 0;
let gameTimer;

document.getElementById('wishBtn').addEventListener('click', function() {
    setTimeout(() => {
        document.getElementById('gameSection').style.display = 'block';
    }, 1500);
});

document.getElementById('clickGameBtn').addEventListener('click', function() {
    if (!gameStarted) {
        gameStarted = true;
        clickCount = 0;
        this.textContent = "Click Nhanh Nào!";
        
        let timeLeft = 10;
        gameTimer = setInterval(() => {
            timeLeft--;
            document.getElementById('gameResult').innerHTML = `Thời gian còn lại: ${timeLeft}s | Số lần click: ${clickCount}`;
            
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                gameStarted = false;
                this.textContent = "Chơi Lại";
                document.getElementById('gameResult').innerHTML = `
                    <strong>Kết quả:</strong> ${clickCount} lần click trong 10 giây!<br>
                    ${getFunnyMessage(clickCount)}
                `;
            }
        }, 1000);
    }
    if (gameStarted) {
        clickCount++;
        const scoreAnim = document.createElement('div');
        scoreAnim.className = 'score-animation';
        scoreAnim.textContent = '+1';
        scoreAnim.style.left = (Math.random() * 100 + 20) + 'px';
        document.getElementById('gameSection').appendChild(scoreAnim);
        setTimeout(() => {
            scoreAnim.remove();
        }, 1000);
    }
});

function getFunnyMessage(score) {
    if (score < 20) return "Cố gắng lên, bạn có thể làm tốt hơn!";
    if (score < 50) return "Khá đấy! Ngón tay linh hoạt lắm!";
    if (score < 80) return "Xuất sắc! Bạn là máy đếm chuyên nghiệp!";
    return "QUÁ KHỦNG KHIẾP! Bạn có phải là siêu nhân không?";
}

console.log("%c© 2025 Harry_Phan - Trang chúc thi THPT", "color: #ff00ff; font-size: 12px;");
console.log("%cFacebook: https://www.facebook.com/haophan03", "color: #00ffff; font-size: 12px;");