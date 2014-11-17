!function($){

  var scriptLoader = $.Deferred()
    , wufooForms = [];

  $.fn.extend({
    wufooForm: function(options){
      return this.each(function(index, wrap){

        var $wrap = $(wrap)
          , formHash = wrap.id.substring(6);

        formOptions = $.extend({}, $.fn.wufooForm.defaults, {
          formHash: formHash
        }, options, $wrap.data());

        scriptLoader.done(function(){
          try {
            wufooForms[formHash] = new WufooForm();
            wufooForms[formHash].initialize(formOptions);
            wufooForms[formHash].display();
          } catch (e) {}
        });
      });
    }
  });

  $.fn.wufooForm.defaults = {
    userName: null,
    autoResize: true,
    height: 300,
    async: true,
    host: 'wufoo.com',
    header: 'show',
    ssl: window.location.protocol == 'https:'
  };

  (function(d, t) {
    var s = d.createElement(t);
    s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';

    s.onload = s.onreadystatechange = function(event) {
      var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return;
      scriptLoader.resolve();
    };
    var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr);
  })(document, 'script');

}(jQuery);
