(function($) {
	$.fn.disperse = function(options) {
		
		// Sensible default options
		var settings = $.extend({
			'zIndex': 1000,
			'base': 4,
			'factor': 5,
			'type': 'linear'
		}, options);
		
		// We get common ancestor of all elements
		var parents = null;
		this.each(function() {
			// We get all the parents of the first element 
			if (parents == null) {
				parents = $(this).parents();
			}
			// Then we filter them to only keep those which contain the other elements
			else {
				parents = parents.has($(this));
			}
		});
		var parent = parents.first();
		
		// We get the calculated dimensions of the parent
		var parentWidth = parent.width();
		var parentHeight = parent.height();
		
		// The minimum z-index
		zindex = settings.zIndex;
		
		// The number of elements on each ellipse (except the first one at the center)
		var base = settings.base;
		
		// The size of the set of elements
		var size = this.size();
		
		// The number of remaining elements to dispose
		var remaining = this.size();
		
		// The number of ellipses we're going to use
		var ellipses = Math.ceil((remaining - 1) / base);
		
		// The random factor
		var factor = settings.factor;
		
		// The type of arrangement
		var type= settings.type;
		
		// The list of horizontal radii of the ellipses
		var horizontalRadii = [];
		
		// The list of vertical radii of the ellipses
		var verticalRadii = [];
		
		if (type == 'linear') {
			var horizontalInterval = parentWidth / (2 * (ellipses + 1));
			var verticalInterval = parentHeight / (2 * (ellipses + 1));
			for (var i = 0; i <= ellipses; i++) {
				horizontalRadii.push(i * horizontalInterval);
				verticalRadii.push(i * verticalInterval);
			}
		} else {
			for (var i = 0; i <= ellipses; i++) {
				horizontalRadii.push(parentWidth/2 - parentWidth / Math.pow(2, i + 1));
				verticalRadii.push(parentHeight / 2 - parentHeight / Math.pow(2, i + 1));
			}
		}
		console.log(horizontalRadii);
		console.log(verticalRadii);
		
		// A flag indicating if we're on a even ellipse (ellipse 0, the center is considered odd, so the first one is even)
		var even = false;
		
		// Number of elements on last ellipse
		var last = (remaining - 1) % base;
		
		this.each(function(index) {
			var element = $(this);
			var weight = element.attr('data-weight') || 1;
			
			// New dimensions based on the weight
			var width = element.width()*weight;
			var height = element.height()*weight;
			
			// New x,y coordinates of the element
			var x = 0;
			var y = 0;
			
			// We randomize thing a little bit
			var rx = parentWidth / (2 * factor * (Math.ceil(index/base) + 1)) * (Math.random() - 0.5);
			var ry = parentHeight / (2 * factor * (Math.ceil(index/base) + 1)) * (Math.random() - 0.5);
			var ro = ((Math.PI / 2) * Math.random() / factor) - (Math.PI / 2) / (2 * factor);
			var ra = ((Math.PI / 2) * Math.random() / factor) - (Math.PI / 2) / (2 * factor);
			
			// If it's the first element
			if (index == 0) {
				x = parentWidth / 2 - width / 2;
				y = parentHeight / 2 - height / 2;
			}
			// Else
			else {
				var horizontalRadius = horizontalRadii[Math.ceil(index/base)];
				var verticalRadius = verticalRadii[Math.ceil(index/base)];
				
				// Number of elements to place on this ellipse
				var number = Math.max(last, Math.min(remaining, base));
				
				// Angle separating 2 elements on the ellipse
				var angle = 2 * Math.PI / number;
				
				// Angular offset
				var offset = ((index - 1) % base) * angle;
				
				// On even ellipses we add an offset equal to the half of the angle between to elements
				if (even) {
					offset += Math.PI / number; 
				}
				
				x = parentWidth / 2 + horizontalRadius * Math.cos(offset + ro) - width / 2;
				y = parentHeight / 2 + verticalRadius * Math.sin(offset + ro) - height / 2;
			}
			
			// Repositioning the element to the calculated coordinates and resizing to the calculated size
			element.css({
				position: 'absolute',
				left: (x + rx) + 'px',
				top: (y + ry) + 'px',
				width: width + 'px',
				height: height + 'px',
				zIndex: 1000 + remaining,
				transform: 'rotate(' + ra + 'rad)'
			});
			
			// If we finished to fill the current ellipse, we switch from even to odd (or the opposite)
			if ((size - remaining) % 4 == 0) {
				even = !even;
			}
			remaining--;
		});
	};
})(jQuery);


