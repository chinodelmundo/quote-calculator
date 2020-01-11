$(document).ready(function() {
    $('.edit-link-info').click(() => {
        $('.info-container').toggle();
    });
    $('.edit-link-finance').click(() => {
        $('.finance-container').toggle();
    });

    // Sliders
    let amountReqSlider = document.getElementById('amount-required');
    let amountReqOutput = document.getElementById('amount-required-value');
    amountReqOutput.innerHTML = '$' + numberWithCommas(amountReqSlider.value);

    amountReqSlider.oninput = function() {
        amountReqOutput.innerHTML = '$' + numberWithCommas(this.value);
    };

    let termSlider = document.getElementById('term');
    let termOutput = document.getElementById('term-value');
    termOutput.innerHTML = termSlider.value;

    termSlider.oninput = function() {
        termOutput.innerHTML = this.value;
    };
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
