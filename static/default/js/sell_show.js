 $('#closeInquiry,#submitInquiry').click(function (){
        $('#foBox').hide();
    })
    $('.TopBoxFix li').on('click',function(){
        $('.titleTable li').removeClass('active');
        if($(this).hasClass('li1')){
            $('.titleTable .li1').addClass('active');
        }else if($(this).hasClass('li2')){
            $('.titleTable .li2').addClass('active');
        }else{
            $('.titleTable .li3').addClass('active');
        }
    })
     //企业产品推荐滚动js
    var w = $('.Boxproul .boxUl li').width()+10;
    var num = $('.Boxproul .boxUl li').size();
    i =0;
    $('#Boxproul .boxUl').css('width',w * num);
    function next(){
        if(i < num-1){
            i++;
        }else{
            i=0;
        }
        $('#Boxproul .boxUl').animate({
            left:-w*i
        },500);
        $('.round .listnum').removeClass('active');
        $('.round .listnum').eq(i).addClass('active');
    }
    function prev(){
        if( i > 0) {
            i--;
        }else{
            i = num-1;
        }
        $('#Boxproul .boxUl').animate({
            left:-w*i
        },500);
    }
    $('.round .listnum').click(function(){
        i = $(this).index();
        $('.round .listnum').removeClass('active');
        $(this).addClass('active');
        $('#Boxproul .boxUl').animate({
            left:-w*i
        },500);
    });
    $('.boxBox .prev').click(function(){
        prev();
    });
    $('.boxBox .next').click(function(){
        next();
    });
     timer = setInterval(next,3000);
    $('#Boxproul').on('mouseover',function(){
        clearInterval(timer);
    });
    $('#Boxproul').on('mouseout',function(){
        timer = setInterval(next,3000);
    });
    //图片选择
    $('.proImg ul.clearfix li').on('click',function(){
        $('.proImg li').removeClass('active');
        $(this).addClass('active');
        var src = $(this).attr('src');
        $('#proImg').attr('src',src);
    });
    //点击放大图片
    function ImgBig(){
        if($('#ImgBoxsrc').hasClass('active')){
            $('#ImgBoxsrc').removeClass('active');
        }else{
            $('#ImgBoxsrc').addClass('active');
            $('#ImgBoxsrc').css('line-height',$(window).height()+'px');
        }
    }    
    $('#proImg').on('click',function(){
        $('#ImgBoxsrc img').attr('src',$(this).attr('src'));
        ImgBig();
    });
    $('#closeBoxsrc').on('click',function(){   
        ImgBig();
    })
    //回到顶部
    $("#return_top").click(function(){
        $('html,body').animate({
            scrollTop:'0'
        },1000);
    });
    //到630显示顶部
    var adTop = $('#adBox').offset().top;
    $(window).scroll(function () {
       var scrollTop = $(document).scrollTop();
        if(scrollTop>630){
            $('.TopBoxFix').show();
            setTimeout(function(){
                $('.TopBoxFix').addClass('active');
            },100)
        }else{
            $('.TopBoxFix').removeClass('active');
            setTimeout(function(){
                $('.TopBoxFix').hide();
            },100)
        }
        //广告现实效果
        var h = $('#xc_right').height() - $('.xc_left').height() ;
        if( h >= 0){
            if(scrollTop > adTop){
                    $('#adBox').addClass('active');
            }else{
                    $('#adBox').removeClass('active');
            }
        }
    });
    //点击回滚
    $('.TopBoxFix li').on('click',function(){
        var top = $('#titleTable').offset().top;
        $('html,body').animate({
            scrollTop:top
        },500);
    });
    function showTopTip(msg){
        $("#showTopTip").html(msg);
        $("#showTopTip").show();
    }
    function hideTopTip(){
        $("#showTopTip").hide();
    } 