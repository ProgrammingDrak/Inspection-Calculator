function calculatePrice() {
    console.log("The Calclulate price function started.")
        const fullAddress = document.getElementById('propertyAddress');
        const yearBuilt = document.getElementById('yearBuilt').value;
        const size = document.getElementById('size').value;
        const foundation = document.getElementById('foundation').value;
        const inspectorAddress = '1010 timrod st Columbia SC 29203';

        let price = 0;

        // Age calculation
        const currentYear = new Date().getFullYear();
        const age = currentYear - yearBuilt;
        if (age < 5) price -= 100;
        else if (yearBuilt <= 1980) price += 100;

        // Size calculation
        if (size < 1200) price += 325;
        else if (size < 2000) price += 350;
        else if (size < 2500) price += 400;
        else if (size < 3000) price += 450;
        else if (size < 3500) price += 500;

        // Foundation calculation
        if (foundation === 'crawlspace') price += 100;
        // Distance calculation
        price += distance * 0.15;

        // Using window.alert to show the result
        window.alert(`Estimated Price: $${price.toFixed(2)}`);

}

function initMap() {
    const inspectorAddress = '1010 timrod st Columbia SC 29203';
    const fullAddress = '441 griffin road greenville sc'
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 55.53, lng: 9.4 },
      zoom: 10,
    });
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = inspectorAddress;
    const destinationA = fullAddress;
    const request = {
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
  
    // put request on page
    document.getElementById("request").innerText = JSON.stringify(
      request,
      null,
      2,
    );
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // put response
      document.getElementById("response").innerText = JSON.stringify(
        response,
        null,
        2,
      );
  
      // show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;
  
      deleteMarkers(markersArray);
  
      const showGeocodedAddressOnMap = (asDestination) => {
        const handler = ({ results }) => {
          map.fitBounds(bounds.extend(results[0].geometry.location));
          markersArray.push(
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              label: asDestination ? "D" : "O",
            }),
          );
        };
        return handler;
      };
  
      for (let i = 0; i < originList.length; i++) {
        const results = response.rows[i].elements;
  
        geocoder
          .geocode({ address: originList[i] })
          .then(showGeocodedAddressOnMap(false));
  
        for (let j = 0; j < results.length; j++) {
          geocoder
            .geocode({ address: destinationList[j] })
            .then(showGeocodedAddressOnMap(true));
        }
      }
    });
  }
  
  function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
  
    markersArray = [];
  }
  
  window.initMap = initMap;