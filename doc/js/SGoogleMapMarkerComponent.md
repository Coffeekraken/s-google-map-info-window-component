# SGoogleMapMarkerComponent

Extends **SGoogleMapComponentBase**

Provide a nice webcomponent wrapper around the google map marker api.


### Example
```html
	<s-google-map api-key="..." center="{lat: -25.363, lng: 131.044}">
	<s-google-map-marker api-key="..." position="{lat: -25.363, lng: 131.044}">
	</s-google-map-marker>
</s-google-map>
```
See more : [https://developers.google.com/maps/documentation/javascript/](https://developers.google.com/maps/documentation/javascript/)

Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### Google Map Marker API

Support all the google map marker API properties

Type : **{ Google.Map.Marker }**

Google Map Marker Options : [https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions)



## Properties


### map

Access the google map instance

Type : **{ Google.Map }**


### marker

Access the google map marker instance

Type : **{ Google.Map.Marker }**