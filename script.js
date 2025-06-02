function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 10) + "px";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 300);
