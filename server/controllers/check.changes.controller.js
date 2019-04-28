const crypto = require('crypto');
const request = require('request');
let legacyHashValue = null, currentHashValue = null;

exports.checkSiteChanges = (req, res, next) => {
    request('http://www.google.com.br', (error, response, body) => {
        if (!error) {
            let hash = crypto.createHash('sha256');
            hash.update(body);
            currentHashValue = hash.digest('hex');
            next();
        } else {
            res.status(400).json({ errors: [{ msg: error }] });
            res.end();
        };
    });
};

exports.checkHashValueChanged = (req, res) => {
    legacyHashValue = legacyHashValue || currentHashValue;
    res.status(200).json({ siteChanged: legacyHashValue === currentHashValue ? false : true });
    res.end();
};
