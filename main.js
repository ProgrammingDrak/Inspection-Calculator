function calculatePrice() {
    const distance = document.getElementById('distance').value;
    const yearBuilt = document.getElementById('yearBuilt').value;
    const size = document.getElementById('size').value;
    const foundation = document.getElementById('foundation').value;

    let price = 0;

    // Age calculation
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearBuilt;
    if (age < 5) price -= 100;
    else if (yearBuilt > 1980) price += 100;

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
    console.log("Hello World");
}

