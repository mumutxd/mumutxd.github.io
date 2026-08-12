/* Animasyonlar.
   .js sınıfı eklenmeden hiçbir öge gizlenmez; JavaScript çalışmayan
   bir tarayıcıda site eksiksiz görünür. Hareket azaltma tercihi olan
   kullanıcılarda kertenkele takibi ve paralaks hiç başlamaz. */

(function () {
  document.documentElement.classList.add('js');

  // Açılış: sayfa çizildikten bir kare sonra giriş sıralaması başlar
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('yuklendi');
    });
  });

  // Kaydırınca beliren bloklar
  if ('IntersectionObserver' in window) {
    var izleyici = new IntersectionObserver(function (girisler) {
      girisler.forEach(function (g) {
        if (g.isIntersecting) {
          g.target.classList.add('gorunur');
          izleyici.unobserve(g.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.anim').forEach(function (el) {
      izleyici.observe(el);
    });
  } else {
    document.querySelectorAll('.anim').forEach(function (el) {
      el.classList.add('gorunur');
    });
  }

  // Kertenkele eşlik eder: kaydırdıkça yukarı kayar (paralaks),
  // fare hareketine yumuşakça eğilir. Dokunmatik cihazda sadece paralaks.
  var azalt = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var parcalar = Array.prototype.slice.call(document.querySelectorAll('.motif-ic'));

  if (!azalt && parcalar.length) {
    var hedefX = 0, hedefY = 0;   // farenin istediği konum (-0.5 .. 0.5)
    var anlikX = 0, anlikY = 0;   // yumuşatılmış konum
    var inceFare = window.matchMedia('(pointer: fine)').matches;

    if (inceFare) {
      window.addEventListener('mousemove', function (e) {
        hedefX = e.clientX / window.innerWidth - 0.5;
        hedefY = e.clientY / window.innerHeight - 0.5;
      }, { passive: true });
    }

    var kare = function () {
      anlikX += (hedefX - anlikX) * 0.055;
      anlikY += (hedefY - anlikY) * 0.055;
      var kayma = window.scrollY || window.pageYOffset || 0;

      for (var i = 0; i < parcalar.length; i++) {
        var p = parcalar[i];
        var hiz = parseFloat(p.getAttribute('data-hiz')) || 0.1;
        var fare = parseFloat(p.getAttribute('data-fare')) || 12;
        var tx = anlikX * fare;
        var ty = -kayma * hiz + anlikY * fare;
        var don = anlikX * 3;
        p.style.transform =
          'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) ' +
          'rotate(' + don.toFixed(2) + 'deg)';
      }
      requestAnimationFrame(kare);
    };
    requestAnimationFrame(kare);
  }
})();
