$(document).ready(function () {
  $('ul.search-list a').hover(() => {
    $('ul.search-list a').each(()=>{
      if($(this).hasClass('is-active')){
        $(this).removeClass('is-active');
      }
    });
    $(this).addClass('is-active');
  });
});