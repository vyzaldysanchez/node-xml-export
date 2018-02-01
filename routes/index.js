const express = require('express');
const xml = require('js2xmlparser');

const router = express.Router();
const Student = require('./../models/student');

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

    const xmlString = xml.parse('students', students.map(({ name, lastName, cardId, career, financialRequest }) => ({
      student: {
        name,
        lastName,
        cardId,
        career,
        financialRequest
      }
    })));

    res.contentType('application/xml');
    res.attachment('data.xml');
    res.status(200).send(xmlString);
  }).select('-_id');
});

module.exports = router;

