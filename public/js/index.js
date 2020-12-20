
document.addEventListener('init', (event) => {
  const navItem = document.querySelectorAll('#menu ons-list-item');
  navItem.forEach((element)=> {
    element.addEventListener('click', loadPage);
  });

  const openNav = document.querySelectorAll('ons-toolbar-button');
  openNav.forEach((element) => {
    element.addEventListener('click', openMenu);
  });
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
