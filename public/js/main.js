(function() {
  $(document).ready(init);

  function init() {
    setListeners();
  }

  function setListeners() {
    $('#toggleAll').on('click', function() {
      state = $(this).hasClass('on');
      $(this).toggleClass('on');
      $('input[type="checkbox"]').prop("checked", state);
    });
  }
}());