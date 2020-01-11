$(document).ready(function() {
    // Title Select
    var optionValues = [];
    $('#select-title option').each(function() {
        if ($.inArray(this.value, optionValues) > -1) {
            $(this).remove();
        } else {
            optionValues.push(this.value);
        }
    });

    $('#select-title').formSelect();

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
