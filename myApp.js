require('dotenv').config();
const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

// let Person = mongoose.model('Person', personSchema);
let Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Mhammad IB",
    age: 24,
    favoriteFoods: ["Pizza", "Burger", "Fries"]
  });
  person.save((err, data) => {
    if (err) {
      console.error('Error saving document:', err);
      return done(err);
    }
    console.log('Document saved:', data);
    done(null, data);
  });
};


// const createAndSavePerson = (done) => {
//   const person = new Person({
//     name: "Mhammad IB",
//     age: 24,
//     favoriteFoods: ["Pizza", "Burger", "Fries"]
//   });
//   person.save((err, data) => {
//     if (err) return done(err);
//     console.log(data);
//     done(null, data);
//   });

// };

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });

};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });

};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });

};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.markModified('favoriteFoods');  // if favoriteFoods is of Mixed type

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return done(err);
      console.log(data);
      done(null, data);
    }
  );

};

const removeById = (personId, done) => {
  // Person.findByIdAndRemove({ _id: personId }, (err, data) => {
  //   if (err) return done(err);
  //   console.log(data);
  //   done(null, data);
  // });

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  // Person.deleteMany({ name: nameToRemove }, (err, data) => {
  //   if (err) return done(err);
  //   console.log(data);
  //   done(null, data);
  // });
};


// const removeManyPeople = (done) => {
//   const nameToRemove = "Mary";
//   Person.remove({ name: nameToRemove }, (err, data) => {
//     if (err) return done(err);
//     console.log(data);
//     done(null, data);
//   });
// };

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) //sort by name in ascending order
    .limit(2) //limit the result to 2 documents
    .select({ age: 0 }) //hide the age field from the result
    // .select('-age')//or
    .exec((err, data) => {
      if (err) return done(err);
      console.log(data);
      done(null, data);
    });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
