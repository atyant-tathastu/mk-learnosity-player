/* Learnosity custom question: embeds the MK lesson player in an iframe.
   Reads question.player_url + optional question.height. */
LearnosityAmd.define([], function () {
  function Question(init) {
    this.init = init;
    var q = (init && init.question) || {};
    var url = q.player_url || '';
    var height = q.height || 760;
    var html = '<iframe src="' + url + '" title="Interactive Lesson" ' +
      'style="width:100%;min-height:' + height + 'px;border:0;border-radius:8px;background:#fff" ' +
      'allow="autoplay; clipboard-write" loading="eager"></iframe>';
    var node = (init.$el && init.$el[0]) ? init.$el[0] : init.$el;
    if (node && node.innerHTML !== undefined) node.innerHTML = html;
    else if (init.$el && init.$el.html) init.$el.html(html);
    if (init.events && init.events.trigger) init.events.trigger('ready');
  }
  Question.prototype.resetResponse = function () {};
  return Question;
});
