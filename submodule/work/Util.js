(function() {
  var Util,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Util = (function() {
    function Util() {
      this.unixtime2JpDate = bind(this.unixtime2JpDate, this);
      this.timeConverter = bind(this.timeConverter, this);
      this.zeroPad = bind(this.zeroPad, this);
      this.unixtime = bind(this.unixtime, this);
    }

    Util.prototype.unixtime = function() {
      return Math.floor(new Date().getTime() / 1000);
    };

    Util.prototype.zeroPad = function(n, pad) {
      return ('0' + n).slice(-1 * pad);
    };


    /**
     * unixtime -> date
     */

    Util.prototype.timeConverter = function(UNIX_timestamp, locate) {
      var a, date, hour, min, month, months, sec, time, year;
      if (!locate) {
        locate = 'en';
      }
      a = new Date(UNIX_timestamp * 1000);
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (locate === 'ja') {
        months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      }
      year = a.getFullYear();
      month = months[a.getMonth()];
      date = this.zeroPad(a.getDate(), 2);
      hour = this.zeroPad(a.getHours(), 2);
      min = this.zeroPad(a.getMinutes(), 2);
      sec = this.zeroPad(a.getSeconds(), 2);
      time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
      if (locate === 'ja') {
        time = year + '年' + month + '月' + date + '日 ' + hour + '時' + min + '分' + sec + '秒';
      }
      return time;
    };

    Util.prototype.unixtime2JpDate = function(UNIX_timestamp) {
      return this.timeConverter(UNIX_timestamp, 'ja');
    };

    return Util;

  })();

  module.exports = Util;

}).call(this);
