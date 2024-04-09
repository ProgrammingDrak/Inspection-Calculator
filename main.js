function calculatePrice() {
    const age = document.getElementById('age').value;
    const size = document.getElementById('size').value;
    const foundation = document.getElementById('foundation').value;
    const distance = document.getElementById('distance').value;
    let price = 0;

    // Age calculation
    if (age < 5) price -= 100;
    else if (age < 45) price += 100;

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

    document.getElementById('result').innerHTML = `Estimated Price: $${price.toFixed(2)}`;
}
