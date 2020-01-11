module.exports.PMT = (ir, np, pv) => {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     */

    console.log(ir);
    console.log(np);
    console.log(pv);

    let pmt, pvif;

    if (ir === 0) return -pv / np;

    pvif = Math.pow(1 + ir, np);
    pmt = (-ir * pv * pvif) / (pvif - 1);

    return Math.abs((pmt / 4).toFixed(2));
};
