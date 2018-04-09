module ApplicationHelper
  def dateFormat(date)
    return date.strftime('%Y/%m/%d %H:%M');
  end
end
