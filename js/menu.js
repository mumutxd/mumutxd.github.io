/* Menü aç/kapat.
   JavaScript çalışmasa bile alt bilgideki menü her sayfada durduğu için
   sayfalar arası geçiş bozulmaz. */

(function () {
  var acDugme    = document.getElementById('menuAc');
  var kapatDugme = document.getElementById('menuKapat');
  var katman     = document.getElementById('menu');

  if (!acDugme || !kapatDugme || !katman) return;

  function ac() {
    katman.setAttribute('data-acik', 'true');
    acDugme.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    kapatDugme.focus();
  }

  function kapat() {
    katman.setAttribute('data-acik', 'false');
    acDugme.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    acDugme.focus();
  }

  acDugme.addEventListener('click', ac);
  kapatDugme.addEventListener('click', kapat);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && katman.getAttribute('data-acik') === 'true') kapat();
  });
})();
