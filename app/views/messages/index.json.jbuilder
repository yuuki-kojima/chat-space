json.array! @new_messages.each do |message|
  json.user_name   message.user.name
  json.created_at  dateFormat(message.created_at)
  json.content     message.content
  json.image_url   message.image.url
  json.id          message.id
end
