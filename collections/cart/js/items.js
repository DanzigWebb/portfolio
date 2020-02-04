// #####################
// navigations
// #####################
var $navItems = $('.nav__item');
var $sections = $('.section');

// default position
var activeItem = $('.nav__item[data-target="resume"]');
showSect(activeItem)

$navItems.on('click', function (e) {
  showSect($(this));
  $(this).attr('data-target') === 'profile'
    ? $('.logo').addClass('show')
    : $('.logo').removeClass('show')
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

// #####################
// skills
// #####################
var $skillItems = $('.skill-content__item')

$skillItems.each(function () {
  var $value = $(this).attr('data-value');
  for (var i = 1; i <= 7; i++) {
    i > $value
      ? $(this).append('<span class="coil coil--off"></span>')
      : $(this).append('<span class="coil"></span>')
  }
})