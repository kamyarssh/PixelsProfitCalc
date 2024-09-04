document.addEventListener('DOMContentLoaded', function() {
    const spentCoinsInput = document.getElementById('spentCoins');
    const earnedPixelsInput = document.getElementById('earnedPixels');
    const coinPriceInput = document.getElementById('coinPrice');
    const dollarPriceInput = document.getElementById('dollarPrice');
    
    const eachCoinTomanOutput = document.getElementById('eachCoinToman');
    const spentCoinsTomanOutput = document.getElementById('spentCoinsToman');
    const earnedPixelsTomanOutput = document.getElementById('earnedPixelsToman');
    const profitOutput = document.getElementById('profit');
    
    const calculateButton = document.getElementById('calculate');

    // Fetch the Pixel price from Binance API
    fetch('https://api.binance.com/api/v3/avgPrice?symbol=PIXELUSDT')
        .then(response => response.json())
        .then(data => {
            const pixelPrice = parseFloat(data.price); // Get the Pixel price in USD

            calculateButton.addEventListener('click', function() {
                const spentCoins = parseFloat(spentCoinsInput.value);
                const earnedPixels = parseFloat(earnedPixelsInput.value);
                const coinPrice = parseFloat(coinPriceInput.value);
                const dollarPrice = parseFloat(dollarPriceInput.value);
                
                if (isNaN(spentCoins) || isNaN(earnedPixels) || isNaN(coinPrice) || isNaN(dollarPrice)) {
                    alert('Please enter valid numbers for all inputs.');
                    return;
                }

                // Calculations
                const eachCoinTomanPrice = coinPrice / 100000;
                eachCoinTomanOutput.value = eachCoinTomanPrice.toLocaleString();

                const spentCoinsTomanPrice = spentCoins * eachCoinTomanPrice;
                spentCoinsTomanOutput.value = spentCoinsTomanPrice.toLocaleString();

                const earnedPixelsTomanPrice = earnedPixels * pixelPrice * dollarPrice;
                earnedPixelsTomanOutput.value = earnedPixelsTomanPrice.toLocaleString();

                const profit = earnedPixelsTomanPrice - spentCoinsTomanPrice;
                profitOutput.value = profit.toLocaleString();

                // Color the profit output based on its value
                if (profit >= 0) {
                    profitOutput.style.color = 'green';
                } else {
                    profitOutput.style.color = 'red';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the Pixel price:', error);
            alert('Failed to fetch Pixel price. Please try again later.');
        });
});