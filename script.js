const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

const currentPath = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');
const aliasMap = {
  'putnam-map.html': 'putnam.html'
};
const activePath = aliasMap[currentPath] || currentPath;
navLinks.forEach((link) => {
  if (link.getAttribute('href') === activePath || (activePath === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

const thoughtMap = document.querySelector('.thought-map');
const topicNodes = document.querySelectorAll('.topic-node');
const topicDetails = document.querySelectorAll('.topic-detail');
const backButtons = document.querySelectorAll('.back-button');

if (thoughtMap && topicNodes.length) {
  topicNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const topic = node.dataset.topic;
      const cx = parseFloat(node.dataset.cx);
      const cy = parseFloat(node.dataset.cy);
      const xPercent = (cx / 1200) * 100;
      const yPercent = (cy / 700) * 100;

      thoughtMap.style.setProperty('--zoom-origin-x', `${xPercent}%`);
      thoughtMap.style.setProperty('--zoom-origin-y', `${yPercent}%`);
      thoughtMap.classList.add('zoomed');

      topicNodes.forEach((n) => {
        n.classList.toggle('topic-active', n.dataset.topic === topic);
      });

      topicDetails.forEach((detail) => {
        detail.classList.toggle('active', detail.dataset.topic === topic);
      });
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      thoughtMap.classList.remove('zoomed');
      topicNodes.forEach((n) => n.classList.remove('topic-active'));
      topicDetails.forEach((detail) => detail.classList.remove('active'));
    });
  });
}
