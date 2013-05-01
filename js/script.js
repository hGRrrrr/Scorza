

var site;
site = (function () {
    var self,
        options,
        animateTime = 1560;

        i = 0;

    var animateBg = function (bool) {
        var a = (i += (bool)? 150 : -150);
        $("#bg1").animate({
            backgroundPosition: (a) +'px 0px'
        }, animateTime );

        $("#bg2").animate({
            backgroundPosition: a*2 +'px 0px'
        }, animateTime );
        console.log(a, a*2);
    }

    var retime = function () {
        setTimeout((function() {
            var j = 0;
            var time = ['past', 'simple', 'future']
            $('.content').each(function() {
                $(this).attr('id', time[j]);
                j++
            })
        }), animateTime)

    }

    var getPage = function (url, success) {
        $.ajax({
            'url': url,
            'success': success
        })
    }


    var init = function (params) {
        options = $.extend(params || {});
        self = $.extend(this);
    };

    init.prototype = {
        slide : function (bool) {
            animateBg(bool);
            $((bool)? "#past" : "#simple").animate({
                left: ((bool)? '0' : '-33%'),
                width: ((bool)? 'show' : 'hide')
            }, 1500);
            var div = (bool)? $("#future") : $("#past");
            (bool)? div.removeAttr('style').hide().insertBefore($("#past")) : div.removeAttr('style').insertAfter($("#future"));
            retime();
        },

        showNewPage : function () {
           /* getPage('tpl/page2.html', function(msg) {
                console.log(msg)
                $("#future .page").empty().html(msg);
                self.slide(false);
                retime();
            })               */

            self.slide(false);
            retime();
        },

        showOldPage : function () {
            self.fromRight();
            retime();
        }
    }
    return init;
}());

var Site = new site;

$(document).ready(function () {
                 $('#wrap').click(function() {
                     Site.showNewPage();
                 })

})