class Util
    
  constructor: () ->
    # console.log(@timeConverter(1474784222));
    # console.log(@unixtime2JpDate(1474784222));

  unixtime: () =>
    Math.floor(new Date().getTime() / 1000)
  

  zeroPad: (n, pad) =>
    ('0' + n).slice -1 * pad

  ###*
  # unixtime -> date
  ###
  timeConverter: (UNIX_timestamp, locate) =>
    if !locate
      locate = 'en'
    a = new Date(UNIX_timestamp * 1000)
    months = [
      'Jan'
      'Feb'
      'Mar'
      'Apr'
      'May'
      'Jun'
      'Jul'
      'Aug'
      'Sep'
      'Oct'
      'Nov'
      'Dec'
    ]
    if locate == 'ja'
      months = [
        '1'
        '2'
        '3'
        '4'
        '5'
        '6'
        '7'
        '8'
        '9'
        '10'
        '11'
        '12'
      ]
    year = a.getFullYear()
    month = months[a.getMonth()]
    date = @zeroPad(a.getDate(), 2)
    hour = @zeroPad(a.getHours(), 2)
    min = @zeroPad(a.getMinutes(), 2)
    sec = @zeroPad(a.getSeconds(), 2)
    time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    if locate == 'ja'
      time = year + '年' + month + '月' + date + '日 ' + hour + '時' + min + '分' + sec + '秒'
    time

  unixtime2JpDate: (UNIX_timestamp) =>
    @timeConverter UNIX_timestamp, 'ja'

 module.exports = Util