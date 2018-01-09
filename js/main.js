$(function() {
  var $cursors = $('.cursor');
  setInterval(function() {
    $cursors.toggle();
  }, 500);
});