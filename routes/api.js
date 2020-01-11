const express = require('express');
const router = express.Router();
const dbHelper = require('../helpers/dbHelper');

const validateData = data => {
    let missing = [];

    if (!data.AmountRequired) missing.push('AmountRequired');
    if (!data.Term) missing.push('Term');
    if (!data.Title) missing.push('Title');
    if (!data.FirstName) missing.push('FirstName');
    if (!data.LastName) missing.push('LastName');
    if (!data.Mobile) missing.push('Mobile');
    if (!data.Email) missing.push('Email');

    return missing;
};

router.post('/quote', function(req, res) {
    const missingData = validateData(req.body);

    if (missingData.length != 0) {
        res.send('Missing Data: ' + missingData.join(', '));
    } else {
        dbHelper.addRecord(req.body, result => {
            res.send(req.get('Host') + '/view/' + result);
        });
    }
});

module.exports = router;
