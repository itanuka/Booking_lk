const Movie = require('../models/movie');

const Employee = require('../models/employee');      // import employee tharusha

const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const movies = require('../data/movies');
const employees = require('../data/employees'); //matin

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env'})

connectDatabase();

const seedMovies = async () => {
    try {
        await Movie.deleteMany();
        console.log('Movies are deleted');

        await Movie.insertMany(movies)
        console.log('All Movies are added');

        process.exit();

    } catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedMovies()

//tharusha
const seedEmployees = async () => {
    try{

        await Employee.deleteMany(); //delete all the e
        console.log('Employees are deleted');

        await Employee.insertMany(employees)
        console.log('All Employees are added')

        process.exit();

    }catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedEmployees()