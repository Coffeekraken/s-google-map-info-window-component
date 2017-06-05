module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-google-map-info-window-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<div class="container">
					<h1 class="h1 m-b-small">
						Coffeekraken s-google-map-info-window-component
					</h1>
					<p class="p m-b-bigger">
						Provide a simple, declarative and powerful webcomponent wrapper to create google info window inside an s-google-map-marker component.
					</p>
					<s-google-map api-key="AIzaSyDCD2MPJFbXBkc5hNB5p8v21XcpeIo_5Mw" zoom="2" center="{lat: -25.363, lng: 131.044}">
						<s-google-map-marker api-key="AIzaSyDCD2MPJFbXBkc5hNB5p8v21XcpeIo_5Mw" position="{lat: -25.363, lng: 131.044}">
							<s-google-map-info-window opened>
								<div class="my-cool-google-info-window">
									<h1 class="h5 m-b">Hello World</h1>
									<p class="p">Donec eu consequat nisl. Nullam faucibus rutrum lorem at vehicula. Praesent ut fermentum augue. Proin convallis semper magna, et viverra augue fermentum in. Sed vel sagittis quam, a eleifend quam.</p>
								</div>
							</s-google-map-info-window>
						</s-google-map-marker-component>
					</s-google-map>
				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				body {
					background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
				}
				.container {
					@include s-position(absolute, middle, center);
					min-width:80vw;
				}
				s-google-map {
					@include s-depth(5);
					@include s-ratio(16/9);
					border:5px white solid;
				}
				.my-cool-google-info-window {
					min-width: s-rem(250px);
					position:relative;
					left:50%;
					@include s-translate(-50%);
					@include s-depth(4);
					padding:s-rem(20px);
					@include s-bubble(
						$color : #fff,
						$side : bottom,
						$align : center
					);
				}
			`
		},
		js : {
			language : 'js',
			data : `
				import 'webcomponents.js/webcomponents-lite'
				import SGoogleMapComponent from 'coffeekraken-s-google-map-component'
				import SGoogleMapMarkerComponent from 'coffeekraken-s-google-map-marker-component'
				import SGoogleMapInfoWindowComponent from './dist/index'
			`
		}
	}
}
