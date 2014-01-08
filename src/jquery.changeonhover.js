(function($){
    
    $.changeOnHover = function(el, options){
        var base = this;

        base.$el = $(el);
        base.el = el;
        
        base.init = function(){
            base.options = $.extend({},$.changeOnHover.defaultOptions, options);
            base.elementChangers = [];

            if (base.options.searchChildren) {
                base.$el.find('[data-change-hover]').each(function() {
                    if ($(this).attr('data-change-hover')) {
                        base.elementChangers.push($(this));
                        $(this).attr('data-change-hold', $(this).html());
                    }
                });
            }

            if (base.$el.attr('data-change-hover')) {
                base.elementChangers.push(base.$el);
                base.$el.attr('data-change-hold', base.$el.html());
            }

            base.$el.mouseenter(function() {
                console.dir(base.elementChangers);
                for(var i = 0; i < base.elementChangers.length; i++) {
                    base.elementChangers[i].html(base.elementChangers[i].attr('data-change-hover'));
                }
            });

            base.$el.mouseleave(function() {
                for(var i = 0; i < base.elementChangers.length; i++) {
                    base.elementChangers[i].html(base.elementChangers[i].attr('data-change-hold'));
                }
            });
        };

        base.init();
    };
    
    $.changeOnHover.defaultOptions = {
        searchChildren: false,
        holdingAttr: 'data-change-hold',
        changeToAttr: 'data-change-hover'
    };
    
    $.fn.changeOnHover = function(options){
        return this.each(function(){
            (new $.changeOnHover(this, options));
        });
    };
})(jQuery);