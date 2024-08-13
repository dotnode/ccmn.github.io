// 导航下拉菜单
$(function(){
    var x=true;
    $('.menu').click(function(){
        if(x){
            $(".nav").slideDown();
            $(".menu span").removeClass('glyphicon-menu-hamburger');
            $(".menu span").addClass('glyphicon-remove',1000, "easeInBack");
            x=false
        }else{
            $(".nav").slideUp();
            $(".menu span").removeClass('glyphicon-remove');
            $(".menu span").addClass('glyphicon-menu-hamburger',1000, "easeInBack" );
            x=true
        }
        $(".navigation .level-1 li").each(function(){
            
            var li =$(this).children('ul').find('li');
            if(li.length){
                var href = $(this).children('a').attr('href');
                $(this).children('a').attr('xhref',href);
                $(this).children('a').attr('href','#');
            }
        });
        var ax=true
        $('.navigation .level-1 li').click(function(){
            if(ax){
                $(this).children('ul').slideDown();
                //var xhref = $(this).children('a').attr('xhref');
                //$(this).children('a').attr('href',xhref);
                //console.log(xhref);
                ax=false
            }else{
                $(this).children('ul').slideUp();               
                ax=true
            }
        });
        //var li = $(".navigation .level-1 li ul").find('li');
    }); 
});