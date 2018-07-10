/*
 * miniPaint - https://github.com/viliusle/miniPaint
 * author: Vilius L.
 */

import config from './../../config.js';
import Helper_class from './../../libs/helpers.js';

var Helper = new Helper_class();

var template = `
		<span class="trn bold hex">Hex:</span>
		<input type="text" class="color_hex" id="color_hex" value="#000000" />
		<br />
		<div class="main_color_rgb">
			<div>
				<span class="trn red">Red:</span>
				<input id="rgb_r" type="number" />
				<br />				
				<span class="trn green">Green:</span>
				<input id="rgb_g" type="number" />
				<br />
				<span class="trn blue">Blue:</span>
				<input id="rgb_b" type="number" />
				<br />
				<span class="trn alpha">Alpha:</span>
				<input id="rgb_a" type="number" />
			</div>
			<div>
				<span class="trn">Hue:</span>
				<input id="hsl_h" type="number" />
				<br />				
				<span class="trn">Sat:</span>
				<input id="hsl_s" type="number" />
				<br />
				<span class="trn">Lum:</span>
				<input id="hsl_l" type="number" />
			</div>
		</div>
`;

class GUI_colors_class {

	render_main_colors() {
		document.getElementById('toggle_colors').innerHTML = template;
		this.render_colors();
		this.set_events();
	}

	set_events() {
		var _this = this;

		var rbg_input_ids = ['rgb_r', 'rgb_g', 'rgb_b', 'rgb_a'];
		for (var i in rbg_input_ids) {
			var target = document.getElementById(rbg_input_ids[i]);
			target.addEventListener('input', function (e) {
				_this.set_color_rgb(this);
			}, false);
		}

		var hsl_input_ids = ['hsl_h', 'hsl_s', 'hsl_l'];
		for (var i in hsl_input_ids) {
			var target = document.getElementById(hsl_input_ids[i]);
			target.addEventListener('input', function (e) {
				_this.set_color_hsl(this);
			}, false);
		}

		//colors
		document.getElementById('color_hex').addEventListener('keyup', function (e) {
			_this.set_color_manual(e);
		}, false);
		document.getElementById('main_color').addEventListener('change', function (e) {
			_this.set_color(this);
		}, false);
	}

	render_colors(ignore_id) {
		document.getElementById("color_hex").value = config.COLOR;
		document.getElementById("main_color").value = config.COLOR;

		var colors = Helper.hex2rgb(config.COLOR);
		document.getElementById("rgb_r").value = colors.r;
		document.getElementById("rgb_g").value = colors.g;
		document.getElementById("rgb_b").value = colors.b;
		document.getElementById("rgb_a").value = config.ALPHA;

		var hsl = Helper.rgbToHsl(colors.r, colors.g, colors.b);
		if (ignore_id !== 'hsl_h')
			document.getElementById("hsl_h").value = hsl.h;
		if (ignore_id !== 'hsl_s')
			document.getElementById("hsl_s").value = hsl.s;
		if (ignore_id !== 'hsl_l')
			document.getElementById("hsl_l").value = hsl.l;
	}

	set_color(object) {
		if (object.id == 'main_color')
			config.COLOR = object.value;
		else
			config.COLOR = Helper.rgb2hex_all(object.style.backgroundColor);

		document.getElementById("main_color").value = config.COLOR;
		document.getElementById("color_hex").value = config.COLOR;
		var colors = Helper.hex2rgb(config.COLOR);
		document.getElementById("rgb_r").value = colors.r;
		document.getElementById("rgb_g").value = colors.g;
		document.getElementById("rgb_b").value = colors.b;

		//also set alpha to max
		if (config.ALPHA == 0) {
			config.ALPHA = 255;
			document.getElementById("rgb_a").value = config.ALPHA;
		}

		this.render_colors();
	}

	set_color_manual(event) {
		var object = event.target;
		if (object.value.length == 6 && object.value[0] != '#') {
			config.COLOR = '#' + object.value;
			this.render_colors();
		}
		if (object.value.length == 7) {
			config.COLOR = object.value;
			this.render_colors();
		}
		else if (object.value.length > 7) {
			object.value = config.COLOR;
		}
	}

	set_color_rgb(object) {
		var value = parseInt(object.value);
		if (isNaN(value) || value < 0) {
			object.value = 0;
			return false;
		}
		if (value > 255) {
			object.value = 255;
			return false;
		}
		config.COLOR = Helper.rgbToHex(
			document.getElementById("rgb_r").value,
			document.getElementById("rgb_g").value,
			document.getElementById("rgb_b").value
			);
		config.ALPHA = document.getElementById("rgb_a").value;

		this.render_colors(object.id);
	}

	set_color_hsl(object) {
		var value = parseInt(object.value);
		if (isNaN(value) || value < 0) {
			object.value = 0;
			return false;
		}
		if (value > 255) {
			object.value = 255;
			return false;
		}
		var rgb = Helper.hslToRgb(
			document.getElementById("hsl_h").value / 255,
			document.getElementById("hsl_s").value / 255,
			document.getElementById("hsl_l").value / 255
			);
		config.COLOR = Helper.rgbToHex(rgb[0], rgb[1], rgb[2]);

		this.render_colors(object.id);
	}

	/**
	 * change global alpha value
	 * 
	 * @param {int} value
	 */
	change_alpha(value) {
		config.ALPHA = parseInt(value);
		document.getElementById("rgb_a").value = config.ALPHA;
	}

}

export default GUI_colors_class;
