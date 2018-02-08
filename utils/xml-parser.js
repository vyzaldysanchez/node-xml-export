const xml = require('js2xmlparser');

const parser = {
  parseStudents(students) {
    const mappedStudents = students.map(({ name, lastName, cardId, career, financialRequest }) => ({
      student: {
        name,
        lastName,
        cardId,
        career,
        financialRequest
      }
    }));

    return xml.parse('students', mappedStudents);
  }
};

module.exports = parser;

