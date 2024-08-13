/*--------------------------------------------------

--------------------------------------------------*/
function xiaoheiModule(i, o) {
	Dd('destoon_search').action = DTPath+'api/search.php';
	Dd('destoon_moduleid').value = i;
	searchid = i;
	var lis = Dd('search_module').getElementsByTagName('li');
	for(var i=0;i<lis.length;i++) {
		lis[i].className = lis[i] == o ? 'orange' : '';
	}
}


	var $mainNav     = $(".J-mainNav"),
		$li_index    = $mainNav.find(".m_zl .fd-clr"),
	    $float_layer = $(".float-layer"),
		$content     = $float_layer.find(".text-content"),
		i            = 0;

	function navToggle(par1, par2) {
		$float_layer.removeClass(par1).addClass(par2);
	}

	$mainNav.mouseenter(function() {
		navToggle("hide", "show");
		$float_layer.animate({
			left:215
		}, 200);
	});
	$mainNav.mouseleave(function() {
		navToggle("show", "hide");
		$li_index.eq(i).removeClass("active").siblings().removeClass("active");
		$float_layer.css("left",215);
	});

	$li_index.mouseover(function() {
		i = $(this).index();
		$content.eq(i).removeClass("hide").addClass("show").siblings().addClass("hide").removeClass("show");
		$li_index.eq(i).addClass("active").siblings().removeClass("active");
	});

jQuery(".slideBox").slide({mainCell:".bd ul",effect:"left",autoPlay:true});
jQuery(".trade").slide({mainCell:".bd ul",autoPage:true,effect:"top",autoPlay:true,vis:3,pnLoop:false});
jQuery(".help-tab").slide({effect:"left",pnLoop:false});
