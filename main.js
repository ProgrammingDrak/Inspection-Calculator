function calculatePrice() {
    console.log("The Calclulate price function started.")
        const fullAddress = document.getElementById('propertyAddress');
        const distance = calculateDistance(fullAddress);
        const yearBuilt = document.getElementById('yearBuilt').value;
        const size = document.getElementById('size').value;
        const foundation = document.getElementById('foundation').value;

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

        // Location calculation
        price += distance * 0.15;

        // Using window.alert to show the result
        window.alert(`Estimated Price: $${price.toFixed(2)}`);

}

// Google function to calculate the distance from the inspector's address to the target property
function calculateDistance(propertyAddress) {
    console.log("The Calclulate distance function started.")
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: ['1010 Timrod St, Columbia, SC 29203'],
        destinations: [propertyAddress],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,  // miles and feet; for metric system use UnitSystem.METRIC
    }, callback);

    function callback(response, status) {
        if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.text;
                    var duration = element.duration.text;
                    var from = origins[i];
                    var to = destinations[j];
                    console.log('Distance from ' + from + ' to ' + to + ' is ' + distance + ', taking ' + duration);
                    // You can now use the distance to update the input field or display it
                    document.getElementById('distance').value = distance;  // Update the distance input box
                }
            }
        } else {
            console.error('Distance Matrix request failed due to ' + status);
        }
    }
}
