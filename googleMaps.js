/*
    Copyright 2023 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  */
    "use strict";

    const CONFIGURATION = {
      "ctaTitle": "Schedule an Inspection",
      "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":false,"mapTypeControl":false,"streetViewControl":false,"zoom":11,"zoomControl":true,"maxZoom":22,"mapId":""},
      "mapsApiKey": "AIzaSyDHubCbP4M8rjg6bV4uupfkel6FINpR_FA",
      "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":true}
    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES =
        new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'location',
      'locality',
      'administrative_area_level_1',
      'postal_code',
      'country',
    ];

    function getFormInputElement(componentType) {
      return document.getElementById(`${componentType}-input`);
    }

    function fillInAddress(place) {
      function getComponentName(componentType) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
                component.short_name :
                component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType) {
        return (componentType === 'location') ?
            `${getComponentName('street_number')} ${getComponentName('route')}` :
            getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        getFormInputElement(componentType).value = getComponentText(componentType);
      }
    }

    function renderAddress(place, map, marker) {
      if (place.geometry && place.geometry.location) {
        map.setCenter(place.geometry.location);
        marker.position = place.geometry.location;
      } else {
        marker.position = null;
      }
    }

    async function initMap() {
      const {Map} = google.maps;
      const {AdvancedMarkerElement} = google.maps.marker;
      const {Autocomplete} = google.maps.places;

      const mapOptions = CONFIGURATION.mapOptions;
      mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
      mapOptions.center = mapOptions.center || {lat: 37.4221, lng: -122.0841};

      const map = new Map(document.getElementById('gmp-map'), mapOptions);
      const marker = new AdvancedMarkerElement({map});
      const autocomplete = new Autocomplete(getFormInputElement('location'), {
        fields: ['address_components', 'geometry', 'name'],
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert(`No details available for input: '${place.name}'`);
          return;
        }
        renderAddress(place, map, marker);
        fillInAddress(place);
      });
    }