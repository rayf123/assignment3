const { Client } = require('pg');

const c = new Client({
    user: 'postgres', //change this if your user / pass is different
    password: 'postgres', //change this if your user / pass is different
    host: 'localhost',
    port: '5432', //change this if your PostgreSQL database is hosted elsewhere
    database: 'postgres'
})

c.connect().then(() => {
    console.log("Connected to PostgreSQL database")
    console.log("Initalizing table")

    c.query(`
    CREATE TABLE students (
        student_id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        enrollment_date DATE
    );`, (err, result) => {
        if (err) console.log(err)
        c.query(`INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
        ('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
        ('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
        ('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');`, (err, result) => {
            if (err) console.log(err)
            console.log("Closing connection")
            c.end().then(() => {
                console.log("Connection closed")
            }).catch(() => console.log("Error closing connection"))        
        })
    })

    


}).catch(() => {
    console.log("Error in connecting to PostgreSQL")
})