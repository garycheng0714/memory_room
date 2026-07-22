const ROOM_IMG = "assets/river_all.jpg"

// 回憶資料庫
const memories = {
    campfire: [
      { date: "營火 · 起飛", text: "跑一跑就飛起來惹", img: "assets/camping_fly.jpg" },
      { date: "營火 · 序幕", text: "", img: "assets/camping_dinner.jpg" },
      { date: "營火 · 第一晚", text: "饒：你怎麼沒跟我說，露營要喝很多酒。", img: "assets/camping_rao.jpg" },
      { date: "營火 · 第一碗", text: "這傢伙照片太少了，只有鞋酒照", img: "assets/camping_drink2.jpg" },
    ],
    unicorn: [
      { date: "身騎白馬", text: "是誰住在深海的大鳳梨裡。", img: "assets/river_all.jpg" },
      { date: "身騎白馬", text: "說好只是拿來拍照，結果整晚都躺在它身上。", img: "assets/river_girls.jpg" },
      { date: "身騎白馬", text: "總有不想面對棒子的時候。", img: "assets/river_headless.jpg" },
      { date: "身騎白馬", text: "饒：是誰在搖啦！！一定是 Ben！！", img: "assets/river_boys.jpg" }
    ],
    person: [
      { date: "我的最愛", text: "", img: "assets/rao_birthday.jpg" },
      { date: "我的最愛", text: "", img: "assets/rao_love.jpg" },
      { date: "我的最愛", text: "", img: "assets/rao_together.jpg" },
      { date: "我的最愛", text: "", img: "assets/rao_dame.jpg" },
    ],
    shoes: [
      { date: "鞋子", text: "", img: "assets/trail_birthday.jpg" },
      { date: "鞋子", text: "", img: "assets/trail_seven.jpg" },
      { date: "鞋子", text: "", img: "assets/trail_moutain.jpg" },
      { date: "鞋子", text: "", img: "assets/trail_haowei.jpg" },
    ]
  };
 
  const veil = document.getElementById('veil');
  const photoTrack = document.getElementById('photoTrack');
  const dotsWrap = document.getElementById('dots');
  const memoryDate = document.getElementById('memoryDate');
  const memoryText = document.getElementById('memoryText');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
 
  let currentSlides = [];
  let currentIndex = 0;
 
  function renderSlide(){
    const slides = photoTrack.querySelectorAll('.photo-slide');
    slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
    photoTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
 
    const dots = dotsWrap.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
 
    const m = currentSlides[currentIndex];
    memoryDate.textContent = m.date;
    memoryText.textContent = m.text;
 
    const multi = currentSlides.length > 1;
    prevBtn.classList.toggle('hidden', !multi);
    nextBtn.classList.toggle('hidden', !multi);
    dotsWrap.style.display = multi ? 'flex' : 'none';

    fitViewportSize();
  }

  function fitViewportSize(){
    const viewport = document.querySelector('.photo-viewport');
    const polaroid = document.querySelector('.polaroid');
    const activeSlide = photoTrack.querySelectorAll('.photo-slide')[currentIndex];
    const img = activeSlide?.querySelector('img');
    if(!img) return;

    const apply = () => {
      const maxW = Math.min(window.innerWidth * 0.86, 480); // 卡片最大寬度上限
      const maxH = window.innerHeight * 0.6;
      const ratio = img.naturalWidth / img.naturalHeight;

      let w = maxW;
      let h = w / ratio;
      if(h > maxH){
        h = maxH;
        w = h * ratio;
      }
      viewport.style.height = h + 'px';
      polaroid.style.width = w + 'px';
    };

    if(img.complete && img.naturalWidth) apply();
    else img.onload = apply;
  }
 
  function openMemory(key){
    const slides = memories[key];
    if(!slides) return;
    currentSlides = slides;
    currentIndex = 0;
 
    photoTrack.innerHTML = '';
    dotsWrap.innerHTML = '';
    slides.forEach((s, i) => {
      const div = document.createElement('div');
      div.className = 'photo-slide';

      const img = document.createElement('img');
      img.src = s.img;
      img.alt = s.date;
      div.appendChild(img);
      photoTrack.appendChild(div);

      const dot = document.createElement('div');
      dot.className = 'dot';
      dotsWrap.appendChild(dot);
    });
 
    veil.classList.add('open');
    renderSlide();
  }
 
  document.querySelectorAll('[data-key]').forEach(el => {
    el.addEventListener('click', () => openMemory(el.dataset.key));
  });
 
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    renderSlide();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentSlides.length;
    renderSlide();
  });
 
  function closeModal(){ veil.classList.remove('open'); }
  closeBtn.addEventListener('click', closeModal);
  veil.addEventListener('click', (e) => { if(e.target === veil) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
    if(veil.classList.contains('open')){
      if(e.key === 'ArrowLeft') prevBtn.click();
      if(e.key === 'ArrowRight') nextBtn.click();
    }
  });

  