const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const Student = require('./../models/student');
const xmlParser = require('./../utils/xml-parser');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.render('index', { title: 'XML Exporter' });
});

/* GET XML students file. */
router.get('/xml-data', (req, res) => {
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

router.post('/xml-data', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      return res.render('error', { message: 'No data found to generate XML!' });
    }

    const xmlString = xmlParser.parseStudents(students);
    const data = new FormData();

    data.append('xml-file', xmlString, 'data.xml');

    axios.post('http://localhost:4000/upload-xml', data, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en,q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`
      }
    })
    .then(() => {
      console.log(`Student's data sent succesfully!`);

      return res.render('index', { title: 'XML Exporter - Success' });
    })
    .catch((err) => {
      console.log(err);

      return res.render('error', { message: err.message });
    });
  }).select('-_id');
});

module.exports = router;

