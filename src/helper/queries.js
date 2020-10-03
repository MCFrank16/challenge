module.exports = {
    createTableApplications: `
       CREATE TABLE IF NOT EXISTS applications(
           id VARCHAR(150),
           firstname VARCHAR(150),
           lastname VARCHAR(150),
           email VARCHAR(150) UNIQUE,
           phonenumber VARCHAR(20) UNIQUE,
           location VARCHAR(150),
           status VARCHAR(100),
           cv TEXT,
           mimetype TEXT,
           createdAt VARCHAR(100)
       )
    `,
    createTableUsers: `
    CREATE TABLE IF NOT EXISTS users(
      id VARCHAR(150),
      username VARCHAR(150) UNIQUE,
      password VARCHAR(150),
      createdAt VARCHAR(100)
    )
    `,
    insertApplicant: (id, firstname, lastname, email, phonenumber, location, cv, status, createdAt, mimetype) => `
       INSERT INTO applications(id, firstName, lastName, email, phoneNumber, location, cv, status, createdAt, mimetype)
       VALUES('${id}', '${firstname}', '${lastname}', '${email}', '${phonenumber}', '${location}', '${cv}', '${status}', '${createdAt}', '${mimetype}')
    `,
    getApplicants: (from) => `
       SELECT * FROM applications ORDER BY firstname LIMIT ${from}, 10
    `,
    getCV: (id) => `
       SELECT cv, mimetype FROM applications WHERE id = '${id}'
    `,
    updateApplication: (id, status) => `
       UPDATE applications SET status = '${status}' WHERE id = '${id}'
    `,
    insertUser: (id, username, password, createdAt) => `
       INSERT INTO users(id, userName, password, createdAt)
       VALUES('${id}', '${username}', '${password}', '${createdAt}')
    `,
    getUser: (username) => `
       SELECT username, password FROM users WHERE username = '${username}'
    `
}