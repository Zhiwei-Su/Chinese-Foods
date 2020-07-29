jQuery(
function($) {
	
	$(document).ready(function(){
		var substanceKey  = [];
		var substancePeak = [];
		var substance = [];
		var previousRollPeak = 0;
		var rollPath = '';
		var termType = '';
		var termLinger = '';
		var menuWidth = null;
		var glutinousHighness = 0;
		var glutinousBoundaryX = 0;
		var presentBoundaryZ = 0;
		var peakBoundary = 0;
		$(window).scroll(function(event){
   			var ab = $(this).scrollTop();
   			if (ab > previousRollPeak){
       			rollPath = 'down';
   			} else {
      			rollPath = 'up';
   			}
  			previousRollPeak = ab;
		});
		$.fn.stickUp = function( options ) {
			// adding a class to users div
			$(this).addClass('stuckMenu');
        	//getting options
        	var xyz = 0;
        	if(options != null) {
	        	for(var o in options.parts) {
	        		if (options.parts.hasOwnProperty(o)){
	        			substance[xyz] = options.parts[xyz];
	        			xyz++;
	        		}
	        	}
	  			if(xyz == 0) {
	  				console.log('error:needs arguments');
	  			}

	  			termType = options.termType;
	  			termLinger = options.termLinger;
	  			if(options.peakBoundary != null) {
	  				if(options.peakBoundary == 'auto') {
	  					peakBoundary = parseInt($('.stuckMenu').css('margin-top'));
	  				} else {
	  					if(isNaN(options.peakBoundary) && options.peakBoundary.search("px") > 0){
	  						peakBoundary = parseInt(options.peakBoundary.replace("px",""));
	  					} else if(!isNaN(parseInt(options.peakBoundary))) {
	  						peakBoundary = parseInt(options.peakBoundary);
	  					} else {
	  						console.log("incorrect argument, ignored.");
	  						peakBoundary = 0;
	  					}	
	  				}
	  			} else {
	  				peakBoundary = 0;
	  			}
	  			menuWidth = $('.'+termType).size();
  			}			
			glutinousHighness = parseInt($(this).height());
			glutinousBoundaryX = parseInt($(this).css('margin-bottom'));
			presentBoundaryZ = parseInt($(this).next().closest('div').css('margin-top'));
			varPeak = parseInt($(this).offset().top);
			//$(this).find('*').removeClass(termLinger);
		}
		$(document).on('scroll', function() {
			varroll = parseInt($(document).scrollTop());
			if(menuWidth != null){
				for(var i=0;i < menuWidth;i++)
				{
					substancePeak[i] = $('#'+substance[i]+'').offset().top;
					function bottomView(i) {
						substanceView = $('#'+substance[i]+'').height()*.4;
						testView = substancePeak[i] - substanceView;
						//console.log(varroll);
						if(varroll > testView){
							$('.'+termType).removeClass(termLinger);
							$('.'+termType+':eq('+i+')').addClass(termLinger);
						} else if(varroll < 100){
							$('.'+termType).removeClass(termLinger);
							$('.'+termType+':eq(0)').addClass(termLinger);
						}
					}
					if(rollPath == 'down' && varroll > substancePeak[i]-100 && varroll < substancePeak[i]+100) {
						$('.'+termType).removeClass(termLinger);
						$('.'+termType+':eq('+i+')').addClass(termLinger);
					}
					if(rollPath == 'up') {
						bottomView(i);
					}
				}
			}



			if(varPeak < varroll + peakBoundary){
				$('.wrapper').addClass('spHeight');
				$('.stuckMenu').addClass('isFixed');
				$('.stuckMenu').next().closest('div').css({
					'margin-top': glutinousHighness + glutinousBoundaryX + presentBoundaryZ + 'px'
				}, 10);
				$('.stuckMenu').css("position","fixed");
				$('.isFixed').css({
					top: '0px'
				}, 10, function(){

				});
			};

			if(varroll + peakBoundary < varPeak){
				$('.wrapper').removeClass('spHeight');
				$('.stuckMenu').removeClass('isFixed');
				$('.stuckMenu').next().closest('div').css({
					'margin-top': presentBoundaryZ + 'px'
				}, 10);
				$('.stuckMenu').css("position","relative");
			};

		});
	});

});
