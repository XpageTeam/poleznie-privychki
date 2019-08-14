$(window).on("load", function () {
	loaded();

	if($('.tovar-info').length){
		var breadcrumbs = $('.bread-crumbs').clone();
		var title = $('.tovar__title').clone();

		$('.col-xs-12').prepend(title);
		$('.col-xs-12').prepend(breadcrumbs);



	}


});

class Xpage{
	set height(height){
		this.Height = height;
	}
	get height(){
		return this.Height;
	}

	set width(width){
		this.Width = width;
	}
	get width(){
		return this.Width;
	}

  constructor(){
    this.init();
    this.ready(() => {
    	this.width = window.innerWidth;
    	this.height = window.innerHeight;
    });
  }
  init(){
    this.body = $("body");
    this.html = $("html");

    this.bindEvents();
  }
  bindEvents(){

  }
  ready(func, params = {type: "document"}){
  	if (window.frameCacheVars !== undefined)
		    BX.addCustomEvent("onFrameDataReceived" , (json) => {
		    	func();
		    });
		else if (typeof(BX) != "undefined")
		    BX.ready(() => {
		    	func();
		    })
		else if (params.type = "document")
			document.addEventListener('DOMContentLoaded', func);
  }
  onScroll(func = () => {}){
		window.onload = (e) =>{
			func(e, window.pageYOffset || 0);
		};
  	window.onscroll = (e) => {
  		func(e, window.pageYOffset || 0);
  	};
  	document.body.addEventListener("touchmove", (e) =>{
  		func(e, window.pageYOffset || 0);
  	});
  }
}

let X = new Xpage();

let loaded = () => {
	$("body").addClass("loaded").removeClass("loading");
};

X.ready(() =>{




	/**Адаптив*/

		// $(".submenu__list").each((i, el) => {
		// 	var $this = $(el);

		// 	$this.closest(".submenu__col").addClass("js__have-sub");
		// });

		X.onScroll((e, scroll) => {

			if ($(".promo-list").length)
				if (scroll + X.height - 200 >= $(".promo-list").offset().top){
					$(".promo__one").each((i, el) => {
						let $this = $(el);

						setTimeout(() => {
							$this.addClass("js__animated");
						}, 300 * i);
					})
				}

			if ($(".useful__img").length)	
				if (scroll + X.height - 300 >= $(".useful__img").offset().top)
					$(".useful__img").addClass("js__animated");

			if ($(".main-about__img").length)	
				if (scroll + X.height - 300 >= $(".main-about__img").offset().top)
					$(".main-about__img").addClass("js__animated");
		});

		$(".burger").click(function(){

			$(this).toggleClass("js-active");

			$("body").toggleClass("js-menu-opened");

		});

		$(".head__menu").append("<div class='head__menu-footer js__moved-phone'></div>");

		$(".js__moved-phone").append($('.footer-phone').clone())
			.append($('.footer-call').clone());

		let adaptiveLinks = [];

		if ($(".head__btn .new-btn").length)
			adaptiveLinks.push({
				name: "В ресторан",
				link: $(".head__btn .new-btn").attr("href"),
				postfix: "to-rest"
			});

		adaptiveLinks.push({
			name: "Личный кабинет",
			link: $(".head-links__link--lc").attr("href"),
			postfix: "lc",
		});

		for (var key in adaptiveLinks){
			let link = adaptiveLinks[key];
			$(".menu").prepend("<li class='menu__el js__moved-head-link js__moved-head-link--"+link.postfix+"'>\
				<a class='menu__link' href='"+link.link+"'>"
				+link.name+"</a></li>")
		}

		$(".menu__el.sub .menu__link").click(function(e){

			if ($(window).width() <= 1000){
				let $this = $(this);

				$(".js-submenu-opened").each((i, el) => {
					let $this = $(el);

					if ($(e.target).is($this) || $this.has(e.target).length)
						return

					$this.find(".submenu").slideUp(300);

					$this.removeClass("js-submenu-opened");
				});

				$this.closest(".sub").toggleClass("js-submenu-opened");

				$this.next(".submenu").slideToggle(300)

				return false;
			}
		});

		$(".catalog-filter__btn").click(function(){
			let $this = $(this);
			let tmpText = $this.text();

			$this.text($this.attr("data-toggle-text"));
			$this.attr("data-toggle-text", tmpText);

			$(".catalog-filter").slideToggle(300);
		});

	/**!Адаптив*/

	$("body").on("click", ".forms-input-cont .rating__list:not(.js__voted) .rating__start", function(){
		let $this = $(this);
		let index = $this.index(),
			$rating = $this.closest("ul");

		$rating.find("li").each((i, el) => {
			let $this = $(el);

			if ($this.index() <= index)
				$this.addClass("active");
		});

		// $rating.addClass("js__voted");

		$rating.next("input").val((index+1)/2);

	});

	$(".text-page table").each((i, el) => {
		let $this = $(el);

		$this.wrap("<div class='table-wrap'></div>")
	});

	$(".new-slider").each((i, el) => {
		let $this = $(el);

		$this.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			slide: ".new-slider__slide",
			fade: true,
			appendArrows: $this.closest(".new").find(".new__title-arrows")
		});

		if ($this.find(".new-slider__slide").length <= 1){
			$this.closest(".new").find(".new__title-arrows").remove()
		}
	});

	$(".share").click(function(){
		let $this = $(this);

		$this.closest("div").find(".tovar__share-yashare").toggleClass("js__visible");
	});

	$("body").on("click", (e) =>{
		if (!$(e.target).is($(".tovar__share")) && !$(".tovar__share").has(e.target).length)
			$(".tovar__share-yashare").removeClass("js__visible");
	});

	$(".filter-checks__list").jScrollPane({
		autoReinitialise: true,
	});

	$(".categories__one-title").click(function(){
		let $this = $(this);

		$this.next(".categories__one-main").slideToggle(300);

		$this.closest(".categories__one").toggleClass("closed");
	});

	$(".filter__one-title-cont").click(function(){
		let $this = $(this);

		$this.next(".filter__one-block").slideToggle(300)
	});

	$(".fancybox").fancybox({
		beforeShow: () =>{
			$("body").addClass("fancy-active")
		},
		afterClose: () =>{
			$("body").removeClass("fancy-active")
		},
		// afterShow: () => {
		// 	//alert()
		// 	if (!$(window).width() > 767)
		// 		setTimeout(()=>{
		// 			$(".fancybox-wrap").css({
		// 				top: $(".fancybox-overlay").offset().top
		// 			})
		// 		}, 300);

		//   // document.addEventListener('touchmove', addSafariCutch);
			
		// }
	});

	$(".price-filter").each((i, el) => {
		let $this = $(el);

		let $range = $this.find(".range"),
			$min = $this.find("input[data-min]"),
			$max = $this.find("input[data-max]");

		let min = parseInt($min.attr("data-min")),
			max = parseInt($max.attr("data-max"));

		$range.slider({
			animate: "normal",
			min: min,
			max: max,
			values: [parseInt($min.val()), parseInt($max.val())],
			range: true,
			step: 10,
			slide: (e, ui) =>{
				$min.val(parseInt(ui.values[0]));
				$max.val(parseInt(ui.values[1]));
			}
		});

		$this.find(".price-filter__input").on("keyup", function(){
			let id, val;

			if ($(this).attr("data-min")){
				id = 0;
				val = (+$(this).val() < min ? min : +$(this).val());
			}else{
				id = 1;
					val = (+$(this).val() > max ? max : +$(this).val());
			}

			$range.slider("values", id, parseInt(val));
		});
	});

	$(".main-slider").slick({
		arrows: !1,
		dots: !0,
		slidesToScroll: 1,
		slidesToShow: 1,
		slide: ".main-slider__slide",
		autoplay: true,
		fade: true,
		autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
				}
			}
		]
	});

	$(".bestseller--slider").each((i, el) => {
		let $this = $(el);

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			appendArrows: $this.closest(".bestsellers__cont").find(".new__title-arrows"),
			responsive: [
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 2
					}
				},
				{	
					breakpoint: 660,
					settings: {
						slidesToShow: 1
					}
				}
			]
		})
	});

	$(".partners").slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		slide: ".partners__slide",
		responsive: [
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 4
					}
				}
			]
	});

	$(".tovar-big-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: ".tovar-big-slider__slide",
		asNavFor: ".tovar-smallslider",
		fade: true,
	});

	$(".tovar-smallslider").slick({
		slidesToScroll: 1,
		slidesToShow: 3,
		vertical: true,
		verticalSwiping: true,
		slide: ".tovar-smallslider__slide",
		arrows: false,
		asNavFor: ".tovar-big-slider",
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					vertical: false,
					verticalSwiping: false,
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 1000,
				settings: {
					vertical: false,
					verticalSwiping: false,
					slidesToShow: 3,
				}
			}
		]
	});

	$(".tabs-tab").click(function(){
		let $this = $(this);

		if ($this.hasClass("active"))
			return

		let id = $this.attr("data-id"),
			$parent = $this.closest(".tabs");

		$parent.find(".tabs-tab.active, .tabs-content.active").removeClass("active");

		$this.addClass("active");
		$parent.find(".tabs-content[data-id='"+id+"']").addClass("active");
	});






});