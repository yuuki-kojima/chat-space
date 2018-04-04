$(document).on('turbolinks:load', function() {

  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${user.name}</p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    return html;
  }

  var obj = $('#user-search-field');
  obj.val('');
  obj.on("keyup", function() {
    var input = obj.val();
    console.log(input);
    if(input != ''){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = buildHTML(user);
            $(html).appendTo('#user-search-result');
          });
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました。');
      })
    }else{
      $("#user-search-result").empty();
    }

  });

  $(document).on("click", ".user-search-add", function(){
    target = $(this);
    var userId = target.attr("data-user-id")
    var userName = target.attr("data-user-name")
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $(html).appendTo('#chat-group-users');
    target.parent().remove();
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });

});
