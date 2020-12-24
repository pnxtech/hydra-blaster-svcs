document.addEventListener('DOMContentLoaded', function(event) {
  window.app = new App(config);
  window.stor = window.app.getStor();
  resetDOM()
});

window.onresize = function(event) {
  resetDOM();
}

document.addEventListener('init', function(event) {
  resetDOM();
  const navItem = document.querySelectorAll('#menu ons-list-item');
  navItem.forEach((element)=> {
    element.addEventListener('click', loadPage);
  });

  const openNav = document.querySelectorAll('ons-toolbar-button');
  openNav.forEach((element) => {
    element.addEventListener('click', openMenu);
  });

  if (event.target.matches('#about')) {
    window.app.handleAboutPageSetup();
  }
  else if (event.target.matches('#settings')) {
    window.app.handleSettingsPageSetup();
  }
  else if (event.target.matches('#blaster')) {
    window.app.handleBlasterPageSetup();
  }
});

function loadPage(event) {
  let page = this.getAttribute('href');
  let content = document.getElementById('content');
  let menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
}

function openMenu (event) {
  let menu = document.getElementById('menu');
  menu.open();
}

function resetDOM() {
  let element = document.getElementById('app-container');
  element.style.backgroundColor = 'black';
  if (window.orientation === undefined) {
    element.style.width = '30rem';
    element.style.margin = '0 auto 0 auto';
  }
}
