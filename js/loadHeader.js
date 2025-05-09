let basepath =
window.location.pathname.includes('/pages/')
  ? '../components/header.html'
  : 'components/header.html';

fetch(basePath)
    .then(response => response.text())
    .then(data => {

document.getElementById('header-placeholder').innerHTML = data;
    });