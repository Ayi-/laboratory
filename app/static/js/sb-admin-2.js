$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    urll = window.location;//当前url

    var element = $('ul.nav a').filter(function() {
        pn = this.pathname;//过滤的url
        //console.log(pn+':'+this.pathname.split('/')[1]+','+ urll.pathname.split('/')[1] );
        //console.log(urll.pathname+'\nur'+urll.pathname.split('/')[1]);
        // 针对多级目录的xxx/aaa和xxx/ccc进行处理，统一识别xxx/开头的都是同级
        return urll.pathname == this.pathname || urll.pathname.split('/')[1] == this.pathname.split('/')[1];
    }).filter(function()
        {

            if(this.href == urll || urll.href.indexOf(this.href) == 0)
                $(this).addClass('active');
            return true
        })
        .parent()
        .parent()
        .addClass('in')
        .parent();

    if (element.is('li')) {
        element.addClass('active');
    }
});
