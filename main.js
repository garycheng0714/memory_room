// 回憶資料庫
const memories = {
  campfire: { 
    date: "營火", 
    text: "在這裡放的柴火，燒了整晚，話題也沒停過。" 
  },
  unicorn: { 
    date: "小馬游泳圈", 
    text: "說好只是拿來拍照，結果整晚都靠在牠身上。" 
  },
  person: { 
    date: "我的最愛", 
    text: "手機滑不停，卻還是願意坐在這裡陪到最後。" 
  },
  shoes: { 
    date: "鞋子", 
    text: "剛跑完就直接脫在這，鞋帶都沒解開。" 
  }
};

// DOM 元素選取
const veil = document.getElementById('veil');
const photoFrame = document.getElementById('photoFrame');
const memoryDate = document.getElementById('memoryDate');
const memoryText = document.getElementById('memoryText');
const closeBtn = document.getElementById('closeBtn');

// 綁定熱點點擊事件
document.querySelectorAll('[data-key]').forEach(el => {
  el.addEventListener('click', () => {
    const key = el.dataset.key;
    const memory = memories[key];
    
    if (!memory) return;

    photoFrame.style.backgroundImage = "url('assets/room.png')";
    memoryDate.textContent = memory.date;
    memoryText.textContent = memory.text;
    veil.classList.add('open');
  });
});

// 關閉 Modal 邏輯
function closeModal() {
  veil.classList.remove('open');
}

closeBtn.addEventListener('click', closeModal);

veil.addEventListener('click', (e) => {
  if (e.target === veil) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});