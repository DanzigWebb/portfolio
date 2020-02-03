const fixedButton = () => {
  const offsetTop = $('.jackpot').offset().top;
  const btn = $('.btn-wrap');
  btn.css('top', offsetTop)
}
fixedButton()
$(window).resize(() => {
  fixedButton()
});