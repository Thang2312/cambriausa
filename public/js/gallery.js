$(document).ready(function () {
  let flyout;
  // setup Trade

  $('[tabindex=46] , ul.js-flyout a').hover(() => {
    if($('[tabindex=46]').hasClass('is-active')) {
      $('[tabindex=46]').removeClass('is-active');
    } else {
      $('[tabindex=46]').addClass('is-active');
    }
  });
  $('.main-nav__item').hover(function(){
    $('.main-nav__item').each((index, elem) => {
      elem.classList.remove('is-active');

    });
    $(this).addClass('is-active');
    flyout = $(this).data("flyout");
    $('.flyout__inner.js-flyout .flyout__links').each((index, elem) => {
      elem.style.display = 'none';
    });
    $('.flyout__inner.js-flyout ').each((index, elem) => {
      elem.classList.remove('is-active');
    });
    $(`.flyout__inner.js-flyout[data-flyout='${flyout}']`).addClass('is-active');
    $(`.flyout__inner.js-flyout[data-flyout='${flyout}'] .flyout__links`).css('display','block');
    $('.flyout-container.js-flyout-container').css('display','block');
  });
  $('.flyout-container.js-flyout-container').css('display','none');
});