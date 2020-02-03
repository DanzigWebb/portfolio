// #####################
// navigations
// #####################
var $navItems = $('.nav__item');
var $sections = $('.section');

// default position
var activeItem = $('.nav__item:last');
showSect(activeItem)

$navItems.on('click', function (e) {
  showSect($(this))
});

function showSect(item) {

  $navItems.not(item).removeClass('active');
  item.addClass('active');

  var $navTarget = item.attr('data-target');
  var $targetSection = $('#' + $navTarget);

  $sections.each(function () {
    $(this).is($targetSection)
      ? $(this).slideDown()
      : $(this).slideUp()
  });
}
