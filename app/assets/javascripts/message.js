$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    if(message.image_url != null){
      var imageHtml = `<img class="lower-message__image" src="${message.image_url}">`;
    }else{
      var imageHtml = '';
    }
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                    ${imageHtml}
                  </div>
                </div>`
    return html;
  }
  function autoScroll() {
    var obj = $('.messages');
    obj.get(0).scrollTop = obj.get(0).scrollHeight;
    obj.animate({scrollTop: obj.get(0).scrollHeight}, 'fast');
  }
  autoScroll();
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData =  new FormData(this);
    var url = $(this).attr('action')
    $('.form__submit').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(html).appendTo('.messages');
      $('.form__message').val('');
      autoScroll();
    })
    .fail(function(){
      alert('メッセージを送信できませんでした。');
    })
  })
})
