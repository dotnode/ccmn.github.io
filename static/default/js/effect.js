/*--------------------------------------------------

--------------------------------------------------*/
//二级分类展开
$('#classIfi li').on('click',function(){
  var h = $(this).find('.ClassBoxHeight').height();
  var $this = $(this);
  if($this.hasClass('active')){
    $this.find('.ClassBox').animate({
        height:'0'
    },500);
    setTimeout(function(){
        $this.removeClass('active');
    },500);
  }else{
    $this.find('.ClassBox').animate({
        height:h
    },500);
    $(this).addClass('active');
  }
});
if($('#myCarousel').length){
  $('.carousel').carousel();
};

//列表页分类展开
$(".hyfla").on('click',function(){
  var h = $(".zymore .hyflul ul").height();
  if($(".zymore .hyflul").hasClass("active")){
    $(".zymore .hyflul").animate({ height:'28'},500);
    $(".hyfla").removeClass('active');
    setTimeout(function(){
      $(".zymore .hyflul").removeClass("active");
    },500)
  }else{
    $(".zymore .hyflul").addClass("active");
    $(".zymore .hyflul").animate({ height:h},500);
    $(".hyfla").addClass('active');
  };
});
if($('.hyfla').length && $('.hyflul ul').height() <= 28){
    $('.hyfla').hide();
}

//列表页地区展开
$(".hyfla1").on('click',function(){
  var h = $(".zymore1 .hyflul1 ul").height();
  if($(".zymore1 .hyflul1").hasClass("active")){
    $(".zymore1 .hyflul1").animate({ height:'28'},500);
    $(".hyfla1").removeClass('active');
    setTimeout(function(){
      $(".zymore1 .hyflul1").removeClass("active");
    },500)
  }else{
    $(".zymore1 .hyflul1").addClass("active");
    $(".zymore1 .hyflul1").animate({ height:h},500);
    $(".hyfla1").addClass('active');
  };
});
if($('.hyfla1').length && $('.hyflul1 ul').height() <= 28){
    $('.hyfla1').hide();
}
//企业库tab标签切换
$('.building .classifiBuilding li').on('mouseover',function(){
  var id = $(this).attr('id');
  var index = id.replace("top_", "");
  $(this).parents('.classifiBuilding').find(".CompanyClass").hide();
  $("#class_"+index).show();
  $(this).parents('.company_list_box').find(".top ul").hide();
  $("#company_"+index).show();
  $(this).parents('.company_list_box').find(".productrightimgbox ul").hide();
  $("#product_"+index).show();
  $(this).parents('.classifiBuilding').find('.company_topmenu li').removeClass('active');
  $(this).addClass('active');
});

//友情链接切换
$('.friendLink .titlenew li').on('mouseover',function(){
  $('.friendLink .titlenew li').removeClass('Themebg');
  $(this).addClass('Themebg');
  $('.friendLink .LinkBox').hide();
  if($(this).hasClass('li1')){
    $('.friendLink .LinkBox1').show();
  }else if($(this).hasClass('li2')){
    $('.friendLink .LinkBox2').show();
  }else if($(this).hasClass('li3')){
    $('.friendLink .LinkBox3').show();
  }else if($(this).hasClass('li4')){
    $('.friendLink .LinkBox4').show();
  }
})
//首页tab标签页
$('#table li').on('mouseover',function(){
  $('#table li').removeClass('active');
  $(this).addClass('active');
    $('.centantBox .box1').hide();
    $('.centantBox .box2').hide();
    $('.centantBox .box3').hide();
  if($(this).hasClass('li1')){
    $('.centantBox .box1').show();
  }else if($(this).hasClass('li2')){
    $('.centantBox .box2').show();
  }else if($(this).hasClass('li3')){
    $('.centantBox .box3').show();
  }
});
$('#table2 li').on('mouseover',function(){
  $('#table2 li').removeClass('active');
  $(this).addClass('active');
    $('.centantBox .box4').hide();
    $('.centantBox .box5').hide();
  if($(this).hasClass('li4')){
    $('.centantBox .box4').show();
  }else if($(this).hasClass('li5')){
    $('.centantBox .box5').show();
  }
});
//详情页效果
//立即询价弹出框
  $('#Inquiry').on('click',function(){
      var thisBox = $(this).parent().find('.popBox');
      if($(this).hasClass('active')){
          $(this).removeClass('active');
          thisBox.hide();
          $('#Black_bg').hide();
      }else{
          $(this).addClass('active');
          thisBox.show();
          $('#Black_bg').show();
      }
  });
  //立即询价弹出框关闭
  $('.close').on('click',function(){
      $('#Inquiry').removeClass('active');
      var thisBox = $('.close').parent().parent().parent();
      thisBox.hide();
      $('.Mainbusiness').removeClass('active');
      $('#Black_bg').hide();
  });
  //多图切换
  $('.proImg li').on('click',function(){
    var src = $(this).find('img').attr('src');
    console.log(src);
    $('#proImg').attr('src',src);
    $('.proImg li').removeClass('active');
    $(this).addClass('active');
  })
  //tab标签页
  $('#titleTable li').on('click',function(){
    $('#titleTable li').removeClass('active');
    $(this).addClass('active');
      $('.storeXq .box1').hide();
      $('.storeXq .box2').hide();
      $('.storeXq .box3').hide();
    if($(this).hasClass('li1')){
      $('.storeXq .box1').show();
    }else if($(this).hasClass('li2')){
      $('.storeXq .box2').show();
    }else if($(this).hasClass('li3')){
      $('.storeXq .box3').show();
    }
  })

  
  $(function(){
      var closepics = getCookie('closepics');
      if(closepics=='1'){
          $(".CrownImg").hide();
      }else{
          $(".CrownImg").show();
      }
  })
  function setCookie(cookieName,value){
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = cookieName + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
  function getCookie(cookieName) {
    var arr,reg=new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
  



 