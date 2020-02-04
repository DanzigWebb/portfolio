$(document).ready(function () {
  // #####################
  // navigations
  // #####################
  var $navItems = $('.nav__item');
  var $sections = $('.section');
  var animDuration = 400
  // default position
  var activeItem = $('.nav__item[data-target="contact"]');
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

    function slideDown(item) {
      setTimeout(() => {
        item.slideDown(animDuration)
      }, animDuration);
    }

    function slideUp(item) {
      item.slideUp(animDuration)
    }

    $sections.each(function () {
      $(this).is($targetSection)
        ? slideDown($(this))
        : slideUp($(this))
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

  // #####################
  // portfolio
  // #####################
  var $portfolioItems = $('.portfolio-items')
  $portfolioItems.isotope({
    // options
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });
  filterPortfolio()
  function filterPortfolio() {
    var $btns = $('.filters__btn');
    $btns.on('click', function () {

      $btns.not($(this)).removeClass('active')
      $(this).addClass('active')

      var filter = '.' + $(this).attr('data-filter');
      if (filter === '.') filter = '';

      $portfolioItems.isotope({ filter: filter })

    })
  }
});