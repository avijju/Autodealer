jQuery(function($) {
	var styleSwitcher = {

		initialized : false,

		initialize : function() {

			var $this = this;

			if (this.initialized)
				return;
			this.initialized = true;

			// Style Switcher CSS
			$("head").append($('<link rel="stylesheet">').attr("href", "assets/js/theme-option/style-switcher/assets/css/font-awesome.css"));
			$("head").append($('<link rel="stylesheet">').attr("href", "assets/js/theme-option/style-switcher/assets/css/theme_panel.css"));
			$("head").append($('<link rel="stylesheet">').attr("href", "http://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css"));

			$("head").append($('<script />').attr("assets/js/theme-option/style-switcher/assets/js/jquery.easing.js"));
			$("head").append($('<script />').attr("src", "http://code.jquery.com/ui/1.11.1/jquery-ui.js"));

			$("head").append($('<link rel="stylesheet/less">').attr("href", "assets/js/theme-option/style-switcher/assets/css/skin.less"));

			$.getScript("assets/js/theme-option/style-switcher/assets/js/less.js", function(data, textStatus, jqxhr) {
				$("body").append('<div id="theme_panel"></div> <div id="all-headers" />');
				$("#theme_panel").load("assets/js/theme-option/style-switcher/switcher.html");

				setTimeout(function() {
					$this.build();
					$this.events();

					if ($.cookie("skin") != null) {
						$this.setColor($.cookie("skin"));
					}
					if ($.cookie("initialized") == null) {
						$this.container.find("h4 a").click();
						$.cookie("initialized", true);
					}
					if ($.cookie("sticky") != null) {
						$this.stickyHeader($.cookie("sticky"));
					}
					if ($.cookie("layout") != null) {
						$this.layoutStyle($.cookie("layout"));
					}
					if ($.cookie("header") != null) {
						headerStyle($.cookie("header"), $.cookie("index"), $.cookie("main_index"))
					}
						if ($.cookie("transitionlayer") != null) {
						$this.transitionlayerfun($.cookie("transitionlayer"));
					}
						

				}, 100)

				setTimeout(function() {
					if ($.cookie("header") != null) {
						$('.header-items').removeClass('select-active')

						$('#header-style .theme-pager li').removeClass('current');
						//alert($.cookie("main_index"))

						$('.header-items-slider').eq($.cookie("main_index")).find('.header-items').eq($.cookie("index")).addClass('select-active')
						$('#header-style .theme-pager li').eq($.cookie("main_index")).addClass('current');
						var headerItemsWidth = $('.header-items-slider').width();
						lefty = $.cookie("main_index") * headerItemsWidth;

						$('.header-group').css('marginLeft', -lefty);

					} else {

						$('.header-items').removeClass('select-active')

						$('#header-style .theme-pager li').removeClass('current');
						$('.header-items-slider').eq(0).find('.header-items').eq(0).addClass('select-active')
						$('#header-style .theme-pager li').eq(0).addClass('current');

						$('.header-group').css('marginLeft', 0);
					}

				}, 500)

			});

		},

		build : function() {

			var $this = this;

			this.container = $("#theme_panel");

			// Colors Skins
			var colors = [{
				"Hex" : "#e1cc3f",
				"colorName" : "default"
			}, {
				"Hex" : "#28c2e4",
				"colorName" : "skyBlue"
			}, {
				"Hex" : "#d5586d",
				"colorName" : "pink"
			}, {
				"Hex" : "#9fb035",
				"colorName" : "green"
			}, {
				"Hex" : "#935397",
				"colorName" : "purple"
			}, {
				"Hex" : "#2ba09a",
				"colorName" : "greenblue"
			}, {
				"Hex" : "#f2ba66",
				"colorName" : "orange"
			}, {
				"Hex" : "#b33b1c",
				"colorName" : "darkred"
			}, {
				"Hex" : "#f0a01a",
				"colorName" : "darkyellow"
			}, {
				"Hex" : "#7e8588",
				"colorName" : "greyish"
			}];
			var colorList = this.container.find('.swatches');

			$.each(colors, function(i, value) {

				var color = $("<li />").append($("<a class='color-fill' />").css("background-color", colors[i].Hex).attr({
					"data-color-hex" : colors[i].Hex,
					"data-color-name" : colors[i].colorName,
					"href" : "#",
					"title" : colors[i].colorName
				}).append($('<i/>').addClass('fa fa-check active-color')));

				colorList.append(color);

			});

			colorList.find("a").removeClass('color-fillactive')
			colorList.find('li:first').find("a").addClass('color-fillactive')

			colorList.find("a").click(function(e) {
				e.preventDefault();
				$this.setColor($(this).attr("data-color-hex"));
			});
			
					// fonts List
			var fontFamily = [{
				'familyName' : "'Montserrat',sans-serif"
			}, {
				'familyName' : "'Open Sans', sans-serif"
			}, {
				'familyName' : "'Libre Baskerville', sans-serif"
			}];

			//fonts List Builder
			var fontList = this.container.find('#fonts .select-font')
			$.each(fontFamily, function(i, value) {
				var fonts = $("<option />").text(fontFamily[i].familyName);
				fontList.append(fonts);
			});

			//fonts List events
			fontList.change(function(e) {
				$this.setFamily($(this).val());
			});

		},

		events : function() {

			var $this = this;

			// switcher on-off
			$(document).on('click', '#theme_panel .theme-setting i', function() {

				var left = $('#theme_panel').outerWidth();
				if (!$('#theme_panel').hasClass('active')) {
					$('#theme_panel').addClass('active');
					$('#theme_panel').animate({
						'left' : 0
					}, 1000, 'easeInBack')
				} else {
					$('#theme_panel').removeClass('active');
					$('#theme_panel').animate({
						'left' : -left
					}, 1000, 'easeOutBack')
				}

				//for custom slider
				$this.slider();

			})
			//on off latest
			$(document).on('click', '.theme-heading', function() {

				$('.theme-heading').removeClass('on');
				$('.theme_panel_option').slideUp('normal');
				$('.fa-minus').removeClass('fa-minus');

				if ($(this).next().is(':hidden') == true) {
					$(this).addClass('on');
					$(this).next().slideDown('normal');
					$(this).find('.fa-plus').addClass('fa-minus');
				} else {
					$(this).find('.fa-plus').removeClass('fa-minus');
				}
			});
			$(document).on('mouseover', '.theme-heading', function() {
				$(this).addClass('over');
			}).mouseout(function() {
				$(this).removeClass('over');
			});
			$('.theme_panel_option').hide();

			//Radio active
			$(document).on('click', '#layout .layout-column', function() {
				$('#layout .layout-column').removeClass('radio-active')
				$(this).addClass('radio-active')
				var layoutStyle = $(this).attr('data-layout')
				styleSwitcher.layoutStyle(layoutStyle)
			})

			$(document).on('click', '#sticky .layout-column', function() {
				$('#sticky .layout-column').removeClass('radio-active');
				$(this).addClass('radio-active');
				var sticky = $(this).attr('rel');
				styleSwitcher.stickyHeader(sticky,$(this));
			});
			// Active Devices
			$(document).on('click', '.device-highlight', function() {
				$('.iphone-p-active').removeClass('iphone-p-active')
				$(this).addClass('iphone-p-active');

			})

			$(document).on('click', '.header-items', function() {
				$('.select-active').removeClass('select-active')
				$(this).addClass('select-active')
			})
			// Active Pages
			$(document).on('click', '.page-group a', function() {
				$('.active-page').removeClass('active-page')
				$(this).addClass('active-page')
			})
			$(document).on('click', '.header-group .header-items', function() {
				$('#header').removeClass();
				var headername = $(this).attr('rel')
				var main_ind = $(this).closest('.header-items-slider').index();
				var ind = $(this).index();
				headerStyle(headername, ind, main_ind)
			})
			
			//Effect Section function
			$(document).on('click', '#theme_effect .layout-column', function() {
				$('#theme_effect .layout-column').removeClass('radio-active')
				$(this).addClass('radio-active')
				var transitionVal = $(this).attr('rel');
				$.cookie('transitionlayer', transitionVal);
				styleSwitcher.transitionlayerfun(transitionVal)
				if($.cookie('transitionlayer')=='yes'){
					$('html,body').scrollTop(0)
					  location.reload();
				}
				})
				
				
				
				//======================
			headerStyle = function(headername, ind, main_ind) {
				$('#header').html('')
				$('#header').addClass(headername)
				$("#all-headers").load("assets/js/theme-option/style-switcher/header-styles.html", function(responseTxt, statusTxt, xhr) {
					if (statusTxt == "success") {
						var i = 0;
						header = new Array();
						$("#all-headers").find('header').each(function() {
							header[i] = $(this).html()
							i++
						})

						$("#all-headers").hide()

						//if (headername == "left-right") {
							//$('#header').html(header[2])
						//} else 
						if (headername == "center-aligned") {
							$('#header').html(header[1])
						} else {
							$('#header').html(header[0])
							
							if (headername == "headerStyle-3" || headername == "headerStyle-4" || headername == "headerStyle-5" || headername == "headerStyle-6" || headername == "headerStyle-7" || headername == "headerStyle-8" || headername == "headerStyle-10" || headername == "headerStyle-11" || headername == "headerStyle-12" || headername == "headerStyle-12")  {
								

								$('#header .logo>img').attr('src', 'assets/img/logo-right.png');
							} else if (headername == "headerStyle-4") {
								
								$('#header .logo>img').attr('src', 'assets/img/logo-right.png');
							}
						}

					}
				});

				$.cookie("header", headername);
				$.cookie("index", ind);
				$.cookie("main_index", main_ind);
			}
			var headerHeight = $('#header').outerHeight();
			var st = $(window).scrollTop();
			stickOnScroll = function() {
				if ($.cookie('sticky') == "intelligent") {
					
					$('#header').removeClass('normal');
					$('#header').next().addClass('top-m');
					$('#header').addClass('intelligent');
					
					var pos = $(window).scrollTop();

					if (pos > headerHeight) {
						if (pos > st) {						
							$('#header').addClass('simple');
							$('#header.simple').removeClass('down');
							$('#header.simple').addClass('fixed up');

						} else {
							$('#header.simple').removeClass('up');
							$('#header.simple').addClass('fixed down');

						}
						st = pos;

					} else {
						$('#header.simple').removeClass('fixed down up simple');
					}
					if (pos == $(document).height() - $(window).height()) {
						$('#header.simple').removeClass('up');
						$('#header.simple').addClass('fixed down');
					}

				} else  if ($.cookie('sticky') == "fix"){
					
					$('#header').next().addClass('top-m');
					$('#header').addClass('simple fixed');
					$('#header').removeClass('down up');
					$('#header').removeClass('intelligent');
					$('#wrapper').css({
						paddingTop : 0
					});
				}
				else  {

					$('#header.simple').removeClass('fixed down up simple');
					$('#header').addClass('normal');
					$('.top-m').removeClass('top-m');
					$('#header').removeClass('intelligent');
					$('#wrapper').css({
						paddingTop : 0
					});
				}
			};
			stickOnScroll();
			$(window).scroll(function() {
				stickOnScroll();
			});
			// end for sticky header
		},

		setColor : function(color) {

			less.modifyVars({
				skinColor : color
			});

			$.cookie("skin", color);
			this.container.find(".swatches").find('.color-fill').removeClass('color-fillactive');
			this.container.find(".swatches a[data-color-hex=" + color + "]").addClass('color-fillactive');
		},
			setFamily : function(fontFamily) {
			less.modifyVars({
				fontFamily : fontFamily
			});
			$('#fonts .select-font').find('option').each(function() {
				if ($(this).val() == fontFamily) {
					$(this).attr('selected', 'selected')
				}
			})
			$.cookie("fontFamily", fontFamily);
		},

		stickyHeader : function(sticky,$this) {
			setTimeout(function(){
				stickOnScroll();
				$('#sticky .layout-column').removeClass('radio-active');
				if ($this != '') {
					$($this).addClass('radio-active');
				} else {
					$("#sticky-" + sticky).addClass("radio-active");
					//console.log($("#sticky-fix").attr("class"));
				}
				//console.log(sticky); 
			},100);
			$.cookie('sticky', sticky);
		},
		
		transitionlayerfun : function(transitionVal){
				if (transitionVal == 'yes') { $('html,body').scrollTop(0)
					$('#theme_effect .layout-column').removeClass('radio-active');
					$('#theme-transition.layout-column').addClass('radio-active');
					$('.animate-effect').each(function() {
					$(this).addClass('anim-section');
				//animSection();
		
					});
				
					
				//stickOnScroll()
				//$('#sticky .layout-column').removeClass('radio-active')
				//$('#sticky-yes').addClass('radio-active')
			} else {
						$('#theme_effect .layout-column').removeClass('radio-active');
					$('.animate-effect').removeClass('anim-section');
					$('#theme-translate.layout-column').addClass('radio-active');
				//stickOnScroll()
				//$('#layout .layout-column').removeClass('radio-active')
				//$('#sticky-no').addClass('radio-active')
			}
			$.cookie('transitionlayer', transitionVal);
			
		},
		layoutStyle : function(layout) {
			if (layout == 'fullWidth') {
				$('#wrapper').removeClass('boxed');
				$('#layout .layout-column').removeClass('radio-active');
				$('#full-width').addClass('radio-active');
			} else {
				$('#wrapper').addClass('boxed');
				$('#layout .layout-column').removeClass('radio-active');
				$('#boxed').addClass('radio-active');
			}
			$.cookie('layout', layout);
		},

		reset : function() {
			$.removeCookie("skin");
			$.removeCookie("layout");
			$.removeCookie("pattern");
			$.cookie("showSwitcher", true);
			window.location.reload();
		},

		slider : function() {
			var headerItemsLength = $('.header-items-slider').length;
			var headerItemsWidth = $('.header-items-slider:first-child').width();
			var totalWidth = headerItemsLength * headerItemsWidth;
			$('.header-group').width(totalWidth);

			$(document).on('click', '#header-style .theme-pager li', function() {
				$('#header-style .theme-pager li').removeClass('current');
				$(this).addClass('current');
				ind = $(this).index();
				lefty = ind * headerItemsWidth;
				$('.header-group').animate({
					'marginLeft' : -lefty
				}, 500);

			});
		}
	};

	styleSwitcher.initialize();

})