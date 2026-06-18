/* Learnosity custom question: equivalent-fraction multiplier applet.
   Base 2/3; tap x2,x3,x4,x5 in turn — each cuts every piece finer; the learner
   writes the new fraction (2k/3k). Self-contained (bar drawn as inline SVG). */
LearnosityAmd.define([], function () {
  var BASE_N = 2, BASE_D = 3, MULT = [2, 3, 4, 5];

  function norm(s) { return (s || '').trim().toLowerCase().replace(/\s+/g, ''); }

  function barSvg(k) {
    var W = 480, H = 88, n = BASE_D * k, cw = W / n, shaded = BASE_N * k, r = '';
    for (var i = 0; i < n; i++) {
      r += '<rect x="' + (i * cw) + '" y="2" width="' + cw + '" height="' + (H - 4) +
        '" fill="' + (i < shaded ? '#9CC3F0' : '#FFFFFF') + '" stroke="#1565C0" stroke-width="1.2"/>';
    }
    for (var b = 1; b < BASE_D; b++) {
      var x = b * k * cw;
      r += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + H + '" stroke="#1565C0" stroke-width="3"/>';
    }
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:520px">' + r + '</svg>';
  }

  function Question(init) {
    this.init = init;
    var done = 0, activeK = null, resp = [];
    if (init.response && init.response.value) { resp = init.response.value.slice(); done = resp.length; }
    var node = (init.$el && init.$el[0]) ? init.$el[0] : init.$el;

    function save() {
      init.response = { value: resp.slice() };
      if (init.events && init.events.trigger) init.events.trigger('changed');
    }

    function render() {
      var k = activeK || (done > 0 ? MULT[done - 1] : 1);
      var chips = MULT.map(function (m, i) {
        var cls = i < done ? 'done' : (((i === done && activeK === null) || activeK === m) ? 'active' : '');
        var dis = (i < done || (i !== done && activeK !== m) || (activeK !== null && activeK !== m)) ? 'disabled' : '';
        return '<button class="mc-chip ' + cls + '" data-k="' + m + '" data-i="' + i + '" ' + dis + '>&times;' + m + '</button>';
      }).join('');
      var ask = activeK !== null
        ? '<div class="mc-ask">You tapped &times;' + activeK + '. Each piece was cut into ' + activeK +
          ', so write the fraction now shaded: <input class="mc-in" type="text" aria-label="new fraction" placeholder="?/?">' +
          '<button class="mc-check">Check</button><div class="mc-fb"></div></div>'
        : '';
      var doneMsg = done === MULT.length
        ? '<div class="mc-done">The shaded length never moved — only the cuts got finer. ' +
          '2/3 = 4/6 = 6/9 = 8/12 = 10/15 are all the same amount.</div>' : '';
      node.innerHTML =
        '<style>.mc-wrap{font-family:inherit;color:#2B2B2B}.mc-hint{font-size:13px;color:#555;margin-bottom:8px}' +
        '.mc-bar{background:#F4F6F8;padding:14px;border-radius:8px;display:flex;justify-content:center}' +
        '.mc-chips{display:flex;gap:8px;margin:12px 0;flex-wrap:wrap}.mc-chip{padding:10px 16px;font-size:16px;font-weight:600;border:0;border-radius:6px;background:#E6ECF2;cursor:pointer}' +
        '.mc-chip.active{background:#1565C0;color:#fff}.mc-chip.done{background:#2E7D32;color:#fff}.mc-chip:disabled{opacity:.45;cursor:default}' +
        '.mc-ask{margin-top:8px;font-size:16px;line-height:1.8}.mc-in{width:84px;font-size:16px;padding:6px;text-align:center;border:1px solid #aaa;border-radius:4px}' +
        '.mc-check{margin-left:8px;padding:8px 14px;background:#1565C0;color:#fff;border:0;border-radius:6px;cursor:pointer}' +
        '.mc-fb{margin-top:8px;font-size:14px;color:#C22300}.mc-done{margin-top:12px;background:#E8F3EC;padding:12px;border-radius:8px;font-size:15px}</style>' +
        '<div class="mc-wrap"><div class="mc-hint">Tap each multiplier in turn — &times;2, then &times;3, &times;4, &times;5.</div>' +
        '<div class="mc-bar">' + barSvg(k) + '</div><div class="mc-chips">' + chips + '</div>' + ask + doneMsg + '</div>';
      bind();
    }

    function bind() {
      Array.prototype.forEach.call(node.querySelectorAll('.mc-chip'), function (b) {
        b.addEventListener('click', function () {
          var i = +b.getAttribute('data-i'), m = +b.getAttribute('data-k');
          if (i !== done || activeK !== null) return;
          activeK = m; render();
        });
      });
      var chk = node.querySelector('.mc-check');
      if (chk) chk.addEventListener('click', function () {
        var inp = node.querySelector('.mc-in'), fb = node.querySelector('.mc-fb');
        var expected = (BASE_N * activeK) + '/' + (BASE_D * activeK);
        if (norm(inp.value) === norm(expected)) { resp.push(expected); done++; activeK = null; save(); render(); }
        else { fb.textContent = 'Each piece was cut into more, so shaded and total both scaled by the same factor. Try again.'; }
      });
    }

    this.render = render;
    render();
    if (init.events && init.events.trigger) init.events.trigger('ready');
  }
  Question.prototype.resetResponse = function () {};
  return Question;
});
