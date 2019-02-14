# SGoogleMapInfoWindowComponent

Extends **SGoogleMapComponentBase**

Provide a simple, declarative and powerful webcomponent wrapper to create google info window inside an s-google-map-marker component.


### Example
```html
	<s-google-map center="{lat: -25.363, lng: 131.044}">
	<s-google-map-marker position="{lat: -25.363, lng: 131.044}">
		<s-google-map-info-window>
			<div class="my-cool-google-info-window">
 	 		<h3>Info window content</h3>
  			<p>Aliquam rhoncus nibh vitae enim sodales posuere. Aliquam erat volutpat.</p>
			</div>
		</s-google-map-info-window>
	</s-google-map-marker>
</s-google-map>
```
See : **See more** : [https://developers.google.com/maps/documentation/javascript/](https://developers.google.com/maps/documentation/javascript/)

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### opened

Set if the popup window is opened or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### Google Map Info Window API

Support all the google map info window API properties

Type : **{ Google.Map.Marker }**

See : **Google Map Marker Options** : [https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions)



## Properties


### map

Access the google map instance

Type : **{ Google.Map }**


### marker

Access the google map marker instance

Type : **{ Google.Map.Marker }**


### infoWindow

Access the infoWindow map instance

Type : **{ Google.Map.InfoWindow }**


## Methods


### open

Open the window


### close

Close the window