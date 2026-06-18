/* Scorer for the equivalent-fraction applet — formative: completion = full score. */
LearnosityAmd.define([], function () {
  function Scorer(init) { this.init = init; }
  Scorer.prototype.isValid = function () {
    var r = this.init && this.init.response;
    return !!(r && r.value && r.value.length >= 4);
  };
  Scorer.prototype.score = function () { return this.isValid() ? 1 : 0; };
  Scorer.prototype.maxScore = function () { return 1; };
  Scorer.prototype.canValidateResponse = function () { return true; };
  return Scorer;
});
