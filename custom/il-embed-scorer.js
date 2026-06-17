/* Trivial scorer — the interactive lesson is formative; completion = full score. */
LearnosityAmd.define([], function () {
  function Scorer(init) { this.init = init; }
  Scorer.prototype.isValid = function () { return true; };
  Scorer.prototype.score = function () { return 1; };
  Scorer.prototype.maxScore = function () { return 1; };
  Scorer.prototype.canValidateResponse = function () { return true; };
  return Scorer;
});
