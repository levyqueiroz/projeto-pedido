const images = [
  'img/foto1.jpg',
  'img/foto2.jpg',
  'img/foto3.jpg',
  'img/foto4.jpg',
  'img/foto5.jpg',
  'img/foto6.jpg',
];

let currentIndex = 0;
const imageElement = document.getElementById('carouselImage');

function showImage(index) {
  imageElement.style.opacity = 0;
  setTimeout(() => {
    imageElement.src = images[index];
    imageElement.style.opacity = 1;
  }, 300);
}

function startCarousel() {
  showImage(currentIndex);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 3000);
}

// Contador
function startCounter(startDate) {
  const timer = document.getElementById('timer');

  function updateTimer() {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0)   { hours += 24; days--; }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) { months += 12; years--; }

    timer.textContent = `${years} anos, ${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Ações ao clicar em "Aceitar"
const acceptBtn = document.getElementById('acceptButton');
const initialScreen = document.getElementById('initialScreen');
const content = document.getElementById('content');

acceptBtn.addEventListener('click', () => {
  const now = new Date();
  localStorage.setItem('startDate', now.toISOString());

  initialScreen.style.display = 'none';
  content.style.display = 'block';

  startCarousel();
  startCounter(now);
});

// Se já foi aceito antes, carrega automaticamente
const savedDate = localStorage.getItem('startDate');
if (savedDate) {
  initialScreen.style.display = 'none';
  content.style.display = 'block';
  startCarousel();
  startCounter(new Date(savedDate));
}

// BOTÃO SECRETO + HORA DO ACEITAR
const timerDiv = document.getElementById('timer');
let clickCount = 0;

// Criando os elementos
const secretArea = document.createElement('div');
secretArea.style.marginTop = '20px';
secretArea.style.display = 'none';
secretArea.style.flexDirection = 'column';
secretArea.style.alignItems = 'center';
secretArea.style.gap = '10px';

const resetButton = document.createElement('button');
resetButton.textContent = 'Resetar';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '1em';
resetButton.style.borderRadius = '10px';
resetButton.style.border = 'none';
resetButton.style.cursor = 'pointer';
resetButton.style.background = '#fff';
resetButton.style.color = '#d8214f';

const acceptTimeDiv = document.createElement('div');
acceptTimeDiv.style.fontSize = '0.9em';
acceptTimeDiv.style.color = '#fff';

const closeButton = document.createElement('button');
closeButton.textContent = 'Fechar área secreta';
closeButton.style.padding = '6px 12px';
closeButton.style.fontSize = '0.8em';
closeButton.style.border = 'none';
closeButton.style.borderRadius = '6px';
closeButton.style.cursor = 'pointer';
closeButton.style.background = '#ffccd5';
closeButton.style.color = '#000';

secretArea.appendChild(acceptTimeDiv);
secretArea.appendChild(resetButton);
secretArea.appendChild(closeButton);
document.body.appendChild(secretArea);


// Evento para abrir a área secreta ao clicar 3x no contador
timerDiv.addEventListener('click', () => {
  clickCount++;
  if (clickCount >= 3) {
    const savedDate = localStorage.getItem('startDate');
    if (savedDate) {
      const data = new Date(savedDate);
      const formatted = `${data.toLocaleDateString('pt-BR')} às ${data.toLocaleTimeString('pt-BR')}`;
      acceptTimeDiv.textContent = `Você aceitou em: ${formatted}`;
    } else {
      acceptTimeDiv.textContent = 'Data não encontrada.';
    }

    secretArea.style.display = 'flex';
  }

  setTimeout(() => {
    clickCount = 0;
  }, 2000);
});

// Resetar
resetButton.addEventListener('click', () => {
  localStorage.removeItem('startDate');
  location.reload();
});

// Fechar área secreta
closeButton.addEventListener('click', () => {
  secretArea.style.display = 'none';
});

