import SGoogleMapComponentBase from "coffeekraken-s-google-map-component-base";
import __whenAttribute from "coffeekraken-sugar/js/dom/whenAttribute";
import __previous from "coffeekraken-sugar/js/dom/previous";
import __next from "coffeekraken-sugar/js/dom/next";
import __uniqid from "coffeekraken-sugar/js/utils/uniqid";
import __style from "coffeekraken-sugar/js/dom/style";

/**
 * @name 		SGoogleMapInfoWindowComponent
 * @extends 	SGoogleMapComponentBase
 * Provide a simple, declarative and powerful webcomponent wrapper to create google info window inside an s-google-map-marker component.
 *
 * @example 	html
 * <s-google-map center="{lat: -25.363, lng: 131.044}">
 * 	<s-google-map-marker position="{lat: -25.363, lng: 131.044}">
 * 		<s-google-map-info-window>
 * 			<div class="my-cool-google-info-window">
 *  	 		<h3>Info window content</h3>
 *   			<p>Aliquam rhoncus nibh vitae enim sodales posuere. Aliquam erat volutpat.</p>
 * 			</div>
 * 		</s-google-map-info-window>
 * 	</s-google-map-marker>
 * </s-google-map>
 * @see 	https://www.npmjs.com/package/google-maps
 * @see 	https://developers.google.com/maps/documentation/javascript/
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

export default class SGoogleMapInfoWindowComponent extends SGoogleMapComponentBase {
	/**
	 * Default css
	 * @definition 		SWebComponent.defaultCss
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				display: none;
			}
			.gm-style-iw {
				background-color: transparent !important;
				border-radius: 0 !important;
				padding: 0 !important;
				box-shadow: none !important;
			}
			.gm-style-iw-t:before,
			.gm-style-iw-t:after,
			.gm-style-iw:after,
			.gm-style-iw:before {
				display: none !important;
			}
			.gm-style-iw,
			.gm-style-iw > *,
			.gm-style-iw > * > * {
				overflow:visible !important;
			}
			.gm-style-iw [aria-label][draggable="false"].gm-ui-hover-effect {
				display: none !important;
			}
		`;
	}

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
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
	static get mountDependencies() {
		return [
			function() {
				return __whenAttribute(this.parentNode, "inited");
			}
		];
	}

	/**
	 * Physical props
	 * @definition 		SWebComponent.physicalProps
	 * @protected
	 */
	static get physicalProps() {
		return ["opened"];
	}

	/**
	 * Should accept component props
	 * @definition 		SWebComponent.shouldComponentAcceptProp
	 * @protected
	 */
	shouldComponentAcceptProp(prop) {
		return prop !== "mounted";
	}

	/**
	 * Component will mount
	 * @definition 		SWebComponent.componentWillMount
	 * @protected
	 */
	componentWillMount() {
		super.componentWillMount();
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();

		// get the map instance to use for this marker.
		// this is grabed from the parent node that need to be a google-map component
		if (!this.marker || !this.map) {
			throw `The "${
				this._componentNameDash
			}" component has to be a direct child of a "SGoogleMapMarkerComponent"`;
		}

		// init info window
		this._infoWindow = new this.google.maps.InfoWindow({
			content: this.innerHTML
		});

		this.google.maps.event.addListener(this.map, "click", () => {
			// close
			this.setProp("opened", false);
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
	componentUnmount() {
		super.componentUnmount();
	}

	/**
	 * Component will receive prop
	 * @definition 		SWebComponent.componentWillReceiveProp
	 * @protected
	 */
	componentWillReceiveProp(name, newVal, oldVal) {
		switch (name) {
			case "opened":
				if (newVal) this._open();
				else this._close();
				break;
		}
	}

	/**
	 * Render the component
	 * Here goes the code that reflect the this.props state on the actual html element
	 * @definition 		SWebComponent.render
	 * @protected
	 */
	render() {
		super.render();
	}

	/**
	 * On click on marker
	 * @param 		{MouseEvent} 		e 		The click event
	 */
	_onMarkerClick(e) {
		if (this.props.opened) {
			this.setProp("opened", false);
		} else {
			// open the info window
			this.setProp("opened", true);
		}
	}

	/**
	 * Open the window
	 */
	open() {
		this.setProp("opened", true);
	}
	_open() {
		if (this._opened) return;
		this._opened = true;
		this._infoWindow.open(this.map, this.marker);
	}

	/**
	 * Close the window
	 */
	close() {
		this.setProp("opened", false);
	}
	_close() {
		if (!this._opened) return;
		this._opened = false;
		this._infoWindow.close();
	}

	/**
	 * Access the google map instance
	 * @type 	{Google.Map}
	 */
	get map() {
		return this.parentNode.marker.map;
	}

	/**
	 * Access the google map marker instance
	 * @type 	{Google.Map.Marker}
	 */
	get marker() {
		return this.parentNode.marker;
	}

	/**
	 * Access the infoWindow map instance
	 * @type 	{Google.Map.InfoWindow}
	 */
	get infoWindow() {
		return this._infoWindow;
	}
}
