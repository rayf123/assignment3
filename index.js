const { Client } = require('pg')

const c = new Client({
    user: 'postgres', //change this if your user / pass is different
    password: 'postgres', //change this if your user / pass is different
    host: 'localhost',
    port: '5432', //change this if your PostgreSQL database is hosted elsewhere
    database: 'postgres'
})

async function addStudent(first_name, last_name, email, enrollment_date) {
    console.log(`Calling addStudent(${first_name}, ${last_name}, ${email}, ${enrollment_date})`)
    await c.query(`INSERT INTO students (first_name, last_name, email, enrollment_date) 
    VALUES ('${first_name}', '${last_name}', '${email}', '${enrollment_date}');`)
}

async function getAllStudents() {
    console.log("Calling getAllStudents()")
    const result = await c.query('SELECT * FROM students;')
    return result.rows
}

async function updateStudentEmail(student_id, new_email){
    console.log(`Calling updateStudentEmail(${student_id}, ${new_email})`)
    await c.query(`UPDATE students SET email = '${new_email}' WHERE student_id = ${student_id};`)
}

async function deleteStudent(student_id) {
    console.log(`Calling deleteStudent(${student_id})`)
    await c.query(`DELETE FROM students WHERE student_id = ${student_id};`)
}

c.connect().then(async () => {
    console.log("Connected to PostgreSQL database")
    console.log(await getAllStudents())

    await addStudent("Ray", "Fan", "ray.fan@comp3005.com", "1900-01-01")

    await updateStudentEmail(1, 'newemail@comp3005.com')

    await deleteStudent(2)

    console.log("Closing connection")
    c.end().then(() => {
        console.log("Connection closed")
    }).catch(() => console.log("Error closing connection"))
}).catch((e) => {
    console.error(e)
})