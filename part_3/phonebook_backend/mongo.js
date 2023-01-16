const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;
const nameInput = process.argv[2];
const numberInput = process.argv[3];

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: nameInput,
  number: numberInput,
  date: new Date(),
});

if (nameInput && numberInput) {
  person.save().then((result) => {
    console.log(`added ${nameInput} number ${numberInput} to the phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({})
    .then((result) => {
      console.log("Phonebook");
      result.forEach((person) => {
        console.log(person.name + " " + person.number);
      });
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
