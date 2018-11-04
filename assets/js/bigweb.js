  
$(document).ready(function(){

    console.log("jestem bigweb");
  
	var audio = document.getElementById("bgmusic");
	audio.volume = 0.05;

	$('.close-container').click(function(){
		$('.container.game').hide();
	});

	
  
	//ar websiteTagVal = $("figure").attr('website');
	$("figure").each(function(){
		var websiteTagVal = $(this).attr('website');
		var fileExtension = websiteTagVal != 'holopedia' ? 'png' : 'gif';
		$(this).find('img').attr('src', 'images/hexes/' + websiteTagVal + '-presents.' + fileExtension);
		$('.screenshot, .website_description').hide();
  
		$(this).click(function(e){
			e.preventDefault();
			enableHex($(this));
		});
	
	});
	
	enableHex($('figure[website="quantum-foundation"]'));
	
	function enableHex($this) {
		var websiteTagVal = $this.attr('website');
		var src = $this.find('img').attr('src');
			var href = $this.find('a').attr('href');
			var html = $this.find('.subdiv').html();

			if (href == '#2048') {
				$(".hexPortal").find("a").click(function(e){
					e.preventDefault();
					$('.container.game').show();
				});
			}
			else {
				$(".hexPortal").find("a").unbind( "click" );
			}
			
			changeImage($(".hexPortal").find("img"), src);
			
			$(".hexPortal").find("a").attr('href', href);
			
			
			changeWithFadeEffect($(".siteTitle h2"), function() {$(".siteTitle h2").html(html)});
			changeWithFadeEffect($(".hexPortal").find(".portal-subtitle"), function() {$(".hexPortal").find(".portal-subtitle").html(html);});
			$(".reightSideRedirectLink").attr('href', href);
            
            changeImage($(".satelitePortal").find("img"), '');
			$(".satelitePortal").find("a").attr('href', '' );
			
			isSocialMedia($this, 'facebook', 'https://www.{0}.com/{1}');
			isSocialMedia($this, 'twitter', 'https://www.{0}.com/{1}');
			isSocialMedia($this, 'youtube', 'https://www.{0}.com/channel/{1}');		
			isSocialMedia($this, 'wordpress', 'http://www.{1}.{0}.com');	
			isSocialMedia($this, 'simplesite', 'http://www.{1}.{0}.com');
			isSocialMedia($this, 'pinterest', 'https://www.{0}.dk/{1}/');
            isSocialMedia($this, 'panoramafirm', 'https://panoramafirm.pl/{0}.html');
			
			
			
			var fileExtension = websiteTagVal != 'telebiofeedback' ? 'jpg' : 'gif';
			$('.rightSide .screenshot').prepend('<span class="helper"></span>');
			$('.rightSide .screenshot img').attr('src', 'images/screenshots/' + websiteTagVal + '-website-screenshot.' + fileExtension);
			$('.rightSide .website_description').html($this.attr('website-description'));
			
				$('.screenshot, .website_description').show().addClass('rotated');

	}
	
	function changeImage($image, src) {
		changeAttribute($image, 'src', src);
	}
	
	function changeAttribute($el, attr, val) {	
		changeWithFadeEffect($el, function() {$el.attr(attr, val)});
	}

	function changeWithFadeEffect($el, func) {
		$el.fadeOut(400, func ).fadeIn(600);
	}
	
	function isSocialMedia($el, medium, url) {

		var mediumId = $el.attr(medium + "-id");

		if (mediumId){
			changeImage($(".satelitePortal." + medium).find("img"), 'images/satelite/'+medium+'.png');
			$(".satelitePortal." + medium).find("a").attr('href', url.format(medium, mediumId));
		}
		
	}
	
	

});

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};
  
    var transformProp = Modernizr.prefixed('transform');

    function Carousel3D ( el ) {
      this.element = el;

      this.rotation = 0;
      this.panelCount = 0;
      this.totalPanelCount = this.element.children.length;
      this.theta = 0;

      this.isHorizontal = true;

    }

    Carousel3D.prototype.modify = function() {

      var panel, angle, i;

      this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
      this.theta = 360 / this.panelCount;

      // do some trig to figure out how big the carousel
      // is in 3D space
      this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

      for ( i = 0; i < this.panelCount; i++ ) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        //panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
        // rotate panel, then push it out in 3D space
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
      }

      // hide other panels
      for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
      }

      // adjust rotation so panels are always flat
      this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

      this.transform();

    };

    Carousel3D.prototype.transform = function() {
      // push the carousel back in 3D space,
      // and rotate it
      this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    };



    var init = function() {


      var carousel = new Carousel3D( document.getElementById('carousel') ),
          panelCountInput = document.getElementById('panel-count'),
          axisButton = document.getElementById('toggle-axis'),
          navButtons = document.querySelectorAll('#navigation button'),

          onNavButtonClick = function( event ){
            var increment = parseInt( event.target.getAttribute('data-increment') );
            carousel.rotation += carousel.theta * increment * -1;
            carousel.transform();
          };

      // populate on startup
      carousel.panelCount = parseInt( panelCountInput.value, 10);
      carousel.modify();


      axisButton.addEventListener( 'click', function(){
        carousel.isHorizontal = !carousel.isHorizontal;
        carousel.modify();
      }, false);
	  
      panelCountInput.addEventListener( 'change', function( event ) {
        carousel.panelCount = event.target.value;
        carousel.modify();
      }, false);

      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }

      document.getElementById('toggle-backface-visibility').addEventListener( 'click', function(){
        carousel.element.toggleClassName('panels-backface-invisible');
      }, false);

      setTimeout( function(){
        document.body.addClassName('ready');
      }, 0);

    };

    window.addEventListener( 'DOMContentLoaded', init, false);