"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _coffeekrakenSGoogleMapComponentBase = require("coffeekraken-s-google-map-component-base");

var _coffeekrakenSGoogleMapComponentBase2 = _interopRequireDefault(_coffeekrakenSGoogleMapComponentBase);

var _whenAttribute = require("coffeekraken-sugar/js/dom/whenAttribute");

var _whenAttribute2 = _interopRequireDefault(_whenAttribute);

var _previous = require("coffeekraken-sugar/js/dom/previous");

var _previous2 = _interopRequireDefault(_previous);

var _next = require("coffeekraken-sugar/js/dom/next");

var _next2 = _interopRequireDefault(_next);

var _uniqid = require("coffeekraken-sugar/js/utils/uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @name 		SGoogleMapInfoWindowComponent
 * @extends 	SGoogleMapComponentBase
 * Provide a simple, declarative and powerful webcomponent wrapper to create google info window inside an s-google-map-marker component.
 *
 * @example 	html
 * <s-google-map center="{lat: -25.363, lng: 131.044}">
 * 	<s-google-map-marker position="{lat: -25.363, lng: 131.044}">
 * 		<s-google-map-info-window>
 *   		<h3>Info window content</h3>
 *   		<p>Aliquam rhoncus nibh vitae enim sodales posuere. Aliquam erat volutpat.</p>
 * 		</s-google-map-info-window>
 * 	</s-google-map-marker>
 * </s-google-map>
 * @see 	https://www.npmjs.com/package/google-maps
 * @see 	https://developers.google.com/maps/documentation/javascript/
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

var SGoogleMapInfoWindowComponent = function (_SGoogleMapComponentB) {
	_inherits(SGoogleMapInfoWindowComponent, _SGoogleMapComponentB);

	function SGoogleMapInfoWindowComponent() {
		_classCallCheck(this, SGoogleMapInfoWindowComponent);

		return _possibleConstructorReturn(this, (SGoogleMapInfoWindowComponent.__proto__ || Object.getPrototypeOf(SGoogleMapInfoWindowComponent)).apply(this, arguments));
	}

	_createClass(SGoogleMapInfoWindowComponent, [{
		key: "shouldComponentAcceptProp",


		/**
   * Should accept component props
   * @definition 		SWebComponent.shouldComponentAcceptProp
   * @protected
   */
		value: function shouldComponentAcceptProp(prop) {
			return true;
		}

		/**
   * Component will mount
   * @definition 		SWebComponent.componentWillMount
   * @protected
   */

	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			_get(SGoogleMapInfoWindowComponent.prototype.__proto__ || Object.getPrototypeOf(SGoogleMapInfoWindowComponent.prototype), "componentWillMount", this).call(this);
		}

		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */

	}, {
		key: "componentMount",
		value: function componentMount() {
			var _this2 = this;

			_get(SGoogleMapInfoWindowComponent.prototype.__proto__ || Object.getPrototypeOf(SGoogleMapInfoWindowComponent.prototype), "componentMount", this).call(this);

			// get the map instance to use for this marker.
			// this is grabed from the parent node that need to be a google-map component
			if (!this.marker || !this.map) {
				throw "The \"" + this._componentNameDash + "\" component has to be a direct child of a \"SGoogleMapMarkerComponent\"";
			}

			this._uniqid = (0, _uniqid2.default)();

			// set a uniq id for the info window
			this.children[0].setAttribute(this._componentNameDash + "-id", this._uniqid);

			// search close buttons to add the id as value
			[].forEach.call(this.querySelectorAll("[" + this._componentNameDash + "-close]"), function (closeElm) {
				closeElm.setAttribute(_this2._componentNameDash + "-close", _this2._uniqid);
			});

			// init info window
			this._infoWindow = new this.google.maps.InfoWindow({
				content: this.innerHTML
			});

			this.google.maps.event.addListener(this._infoWindow, "domready", function (e) {
				[].forEach.call(document.querySelectorAll(".gm-style-iw"), function (infoViewElm) {
					// get the previous
					var preview = (0, _previous2.default)(infoViewElm, "div");
					if (!preview.hasAttribute("hided")) {
						preview.setAttribute("hided", true);
						preview.style.display = "none";
					}
					// next is the close button
					var closeBtn = (0, _next2.default)(infoViewElm, "button, div");
					if (closeBtn && !closeBtn.hasAttribute("hided")) {
						closeBtn.setAttribute("hided", true);
						closeBtn.style.display = "none";
					}
				});
			});

			this.google.maps.event.addListener(this.map, "click", function () {
				// close
				_this2.setProp("opened", false);
			});

			this.map.getDiv().addEventListener("click", function (e) {
				if (e.target && e.target.hasAttribute(_this2._componentNameDash + "-close")) {
					var id = e.target.getAttribute(_this2._componentNameDash + "-close");
					if (id === _this2._uniqid) {
						_this2.setProp("opened", false);
					}
				}
			});

			// listen for marker click
			this.marker.addListener("click", this._onMarkerClick.bind(this));

			// open if opened props is true
			if (this.props.opened) {
				this._open();
			}
		}

		/**
   * Component unmount
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */

	}, {
		key: "componentUnmount",
		value: function componentUnmount() {
			_get(SGoogleMapInfoWindowComponent.prototype.__proto__ || Object.getPrototypeOf(SGoogleMapInfoWindowComponent.prototype), "componentUnmount", this).call(this);
		}

		/**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   * @protected
   */

	}, {
		key: "componentWillReceiveProp",
		value: function componentWillReceiveProp(name, newVal, oldVal) {
			switch (name) {
				case "opened":
					if (newVal) this._open();else this._close();
					break;
			}
		}

		/**
   * Render the component
   * Here goes the code that reflect the this.props state on the actual html element
   * @definition 		SWebComponent.render
   * @protected
   */

	}, {
		key: "render",
		value: function render() {
			_get(SGoogleMapInfoWindowComponent.prototype.__proto__ || Object.getPrototypeOf(SGoogleMapInfoWindowComponent.prototype), "render", this).call(this);
		}

		/**
   * On click on marker
   * @param 		{MouseEvent} 		e 		The click event
   */

	}, {
		key: "_onMarkerClick",
		value: function _onMarkerClick(e) {
			// open the info window
			this.setProp("opened", true);
		}

		/**
   * Open the window
   */

	}, {
		key: "open",
		value: function open() {
			this.setProp("opened", true);
		}
	}, {
		key: "_open",
		value: function _open() {
			if (this._opened) return;
			this._opened = true;
			this._infoWindow.open(this.map, this.marker);
		}

		/**
   * Close the window
   */

	}, {
		key: "close",
		value: function close() {
			this.setProp("opened", false);
		}
	}, {
		key: "_close",
		value: function _close() {
			if (!this._opened) return;
			this._opened = false;
			this._infoWindow.close();
		}

		/**
   * Access the google map instance
   * @type 	{Google.Map}
   */

	}, {
		key: "map",
		get: function get() {
			return this.parentNode.marker.map;
		}

		/**
   * Access the google map marker instance
   * @type 	{Google.Map.Marker}
   */

	}, {
		key: "marker",
		get: function get() {
			return this.parentNode.marker;
		}

		/**
   * Access the infoWindow map instance
   * @type 	{Google.Map.InfoWindow}
   */

	}, {
		key: "infoWindow",
		get: function get() {
			return this._infoWindow;
		}
	}], [{
		key: "defaultCss",

		/**
   * Default css
   * @definition 		SWebComponent.defaultCss
   * @protected
   */
		value: function defaultCss(componentName, componentNameDash) {
			return "\n\t\t\t" + componentNameDash + " {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t.gm-style-iw {\n\t\t\t\ttop:auto !important; left:0 !important;\n\t\t\t\tbottom: 0 !important;\n\t\t\t\twidth:100% !important;\n\t\t\t}\n\t\t\t.gm-style-iw > div:first-child {\n\t\t\t\tdisplay:block !important;\n\t\t\t}\n\t\t\t.gm-style-iw,\n\t\t\t.gm-style-iw > *,\n\t\t\t.gm-style-iw > * > * {\n\t\t\t\toverflow:visible !important;\n\t\t\t}\n\t\t";
		}

		/**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
   */

	}, {
		key: "defaultProps",
		get: function get() {
			return {
				/**
     * Set if the popup window is opened or not
     * @prop
     * @type 	{Boolean}
     */
				opened: false

				/**
     * @name 	Google Map Info Window API
     * Support all the google map info window API properties
     * @prop
     * @type 	{Google.Map.Marker}
     * @see 	https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions 	Google Map Marker Options
     */
			};
		}

		/**
   * Mount dependencies
   * @definition 		SWebComponent.mountDependencies
   * @protected
   */

	}, {
		key: "mountDependencies",
		get: function get() {
			return [function () {
				return (0, _whenAttribute2.default)(this.parentNode, "inited");
			}];
		}

		/**
   * Physical props
   * @definition 		SWebComponent.physicalProps
   * @protected
   */

	}, {
		key: "physicalProps",
		get: function get() {
			return ["opened"];
		}
	}]);

	return SGoogleMapInfoWindowComponent;
}(_coffeekrakenSGoogleMapComponentBase2.default);

exports.default = SGoogleMapInfoWindowComponent;