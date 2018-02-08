const express = require('express');

const Student = require('./../models/student');
const xmlParser = require('./../utils/xml-parser');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.render('index', { title: 'XML Exporter' });
});

/* GET XML students file. */
router.get('/xml-data', (req, res, next) => {
  Student.find({}, (err, students) => {
    if (err) {
      return res.render('error', { message: 'No data found to generate XML!' });
    }

    const xmlString = xmlParser.parseStudents(students);

    res.contentType('application/xml');
    res.attachment('data.xml');
    res.status(200).send(xmlString);
  }).select('-_id');
});

module.exports = router;

