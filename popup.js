document.addEventListener('DOMContentLoaded', function() {
    const spentCoinsInput = document.getElementById('spent-coins');
    const earnedPixelsInput = document.getElementById('earned-pixels');
    const coinPriceInput = document.getElementById('coin-price');
    const dollarPriceInput = document.getElementById('dollar-price');
    const calculateBtn = document.getElementById('calculate-btn');
    const pixelsPriceElement = document.getElementById('pixel-price');
    const profitElement = document.getElementById('profit');
    const spentCoinsTomanElement = document.getElementById('spent-coins-toman-price');
    const earnedPixelsTomanElement = document.getElementById('earned-pixels-toman-price');
    const cppElement = document.getElementById('cost-p');

    // Add comma separator function
    function addCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Remove comma function
    function removeCommas(num) {
        return num.replace(/,/g, '');
    }

    // Format input fields to add commas
    function formatInput(inputElement) {
        inputElement.addEventListener('input', function() {
            let value = inputElement.value;
            value = removeCommas(value);
            inputElement.value = addCommas(value);
        });
    }

    // Attach the comma formatting to the input fields
    formatInput(spentCoinsInput);
    formatInput(earnedPixelsInput);
    formatInput(coinPriceInput);
    formatInput(dollarPriceInput);

    // Calculate button click event
    calculateBtn.addEventListener('click', function() {
        // Get and parse the inputs
        const spentCoins = parseFloat(removeCommas(spentCoinsInput.value)) || 0;
        const earnedPixels = parseFloat(removeCommas(earnedPixelsInput.value)) || 0;
        const coinPrice = parseFloat(removeCommas(coinPriceInput.value)) || 0;
        const dollarPrice = parseFloat(removeCommas(dollarPriceInput.value)) || 0;

        // Fetch PIXEL price from API
        fetch('https://api.binance.com/api/v3/avgPrice?symbol=PIXELUSDT')
            .then(response => response.json())
            .then(data => {
                const pixelPrice = parseFloat(data.price);

                // Calculate values
                const eachCoinTomanPrice = coinPrice / 100000;
                const spentCoinsTomanPrice = spentCoins * eachCoinTomanPrice;
                const earnedPixelsTomanPrice = earnedPixels * pixelPrice * dollarPrice;
                const profit = earnedPixelsTomanPrice - spentCoinsTomanPrice;
                const cpp = spentCoins/earnedPixels;
                const dollarProfit = profit / dollarPrice;
                const gpp = addCommas(cpp.toFixed(0).toString());

                // Update the results in the DOM
                if (spentCoins <= 0) {
                  cppElement.textContent = `Cost/Pixels: 0 coins`
                  
                } else {
                  cppElement.textContent = `Cost/Pixels: ${gpp} coins`;
                }
                pixelsPriceElement.textContent = `Price: $ ${pixelPrice.toFixed(4)}`;
                spentCoinsTomanElement.textContent = `Spent: ${addCommas(spentCoinsTomanPrice.toFixed(0))} Toman`;
                earnedPixelsTomanElement.textContent = `Earned: ${addCommas(earnedPixelsTomanPrice.toFixed(0))} Toman`;

                if (profit >= 0) {
                    profitElement.className = 'positive';
                } else {
                    profitElement.className = 'negative';
                }

                profitElement.textContent = `Profit: ${addCommas(profit.toFixed(0))} Toman ($${addComma(dollarProfit.toFixed(2)})`;
            })
            .catch(error => {
                console.error('Error fetching PIXEL price:', error);
            });
    });
});
