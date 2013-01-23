# jQuery.disperse

A jQuery plugin to disperse DOM elements. I tried to reproduce the effect seen when you throw cards or photos on the floor.

## Usage

You need to import the script after jQuery of course :
```
<script type="text/javascript" src="jquery.disperse.js"></script>
```

Here is how you call it :
```
<script type="text/javascript">
	$("ul li").disperse();
</script>
```

## Configuration

The plugin uses some sensible defaults values to randomize the effect but you can configure some settings :
- `zIndex` : as elements can overlap (and surely will), the plugin needs to set decreasing z-indexes on the elements. You can provide the minimum value (max is min + number of elements)
- `base` : the elements are disposed on concentric ellipses (except for the first one at the center). You can choose the number of elements on each ellipse.
- `factor` : a randomization factor. It must be positive. Decreasing the factor increases the randomness of the effect.
- `type` : the type of arrangement. Currently there are two arrangements : 'linear' or 'exponential' indicating how the ellipses radii grow.

The `data-weight` attribute on each elements (defaults to 1 if not provided) tells the plugin to scale up ( > 1) or down ( < 1) the element.