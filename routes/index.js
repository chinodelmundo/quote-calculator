const express = require('express');
const router = express.Router();
const dbHelper = require('../helpers/dbHelper');
const calcHelper = require('../helpers/calcHelper');

/* Home page. */
router.get('/', function(req, res, next) {
    res.send('Please use the URL given.');
});

/* Quote Form page. */
router.get('/view/:id', function(req, res, next) {
    const id = req.params.id;

    dbHelper.getRecord(id, result => {
        if (result) {
            res.render('index', { data: result });
        } else {
            res.render('index', {
                error: 'ID not found in the database.'
            });
        }
    });
});

/* Calculate Quote Page */
router.post('/view/:id', function(req, res, next) {
    const id = req.params.id;

    dbHelper.getRecord(id, result => {
        res.render('quote', { data: result });
    });
});

/* Update Database */
router.post('/update', function(req, res, next) {
    const data = formatData(req.body);

    dbHelper.updateRecord(data, () => {
        res.redirect(307, '/view/' + data.ID);
    });
});

/* Success Page */
router.post('/success', function(req, res, next) {
    res.render('success');
});

// Functions
const formatData = data => {
    if (data.option == '1') {
        // Update All Fields.
        const pmtValue = calcHelper.PMT(
            0.02 / 12,
            data.term * 12,
            parseFloat(data.amountRequired) + 300
        );
        const totalAmount = pmtValue * data.term * 12 * 4;
        const interest =
            parseFloat(totalAmount) - (parseFloat(data.amountRequired) + 300);

        return {
            ID: data.id,
            AmountRequired: data.amountRequired,
            AmountRequiredFormatted:
                '$' + data.amountRequired.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            Term: data.term,
            Title: data.title,
            FirstName: data.firstName,
            LastName: data.lastName,
            Mobile: data.mobile,
            Email: data.email,
            PMT: pmtValue,
            TermMonthly: data.term * 12,
            TotalAmount: totalAmount
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            Interest: interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        };
    } else if (data.option == '2') {
        // Update Name, Mobile, Email.
        return {
            ID: data.id,
            FirstName: data.firstName,
            LastName: data.lastName,
            Mobile: data.mobile,
            Email: data.email
        };
    } else if (data.option == '3') {
        // Update Amount, Term, and Calculations.
        const pmtValue = calcHelper.PMT(
            0.02 / 12,
            data.term * 12,
            parseFloat(data.amountRequired) + 300
        );
        const totalAmount = pmtValue * data.term * 12 * 4;
        const interest =
            parseFloat(totalAmount) - (parseFloat(data.amountRequired) + 300);

        return {
            ID: data.id,
            AmountRequired: data.amountRequired,
            AmountRequiredFormatted:
                '$' + data.amountRequired.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            Term: data.term,
            PMT: pmtValue,
            TermMonthly: data.term * 12,
            TotalAmount: totalAmount
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            Interest: interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        };
    }
};

module.exports = router;
