module.exports = {
    createTableApplications: `
       CREATE TABLE IF NOT EXISTS applications(
           id VARCHAR(150),
           firstName VARCHAR(150),
           lastName VARCHAR(150),
           email VARCHAR(150) UNIQUE,
           phoneNumber VARCHAR(20) UNIQUE,
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
      userName VARCHAR(150) UNIQUE,
      password VARCHAR(150),
      createdAt VARCHAR(100)
    )
    `,
    insertApplicant: (id, firstName, lastName, email, phoneNumber, location, cv, status, createdAt, mimetype) => `
       INSERT INTO applications(id, firstName, lastName, email, phoneNumber, location, cv, status, createdAt, mimetype)
       VALUES('${id}', '${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${location}', '${cv}', '${status}', '${createdAt}', '${mimetype}')
    `,
    getApplicants: (from) => `
       SELECT * FROM applications ORDER BY firstName LIMIT ${from}, 10
    `,
    getCV: (id) => `
       SELECT cv, mimetype FROM applications WHERE id = '${id}'
    `,
    updateApplication: (id, status) => `
       UPDATE applications SET status = '${status}' WHERE id = '${id}'
    `,
    insertUser: (id, userName, password, createdAt) => `
       INSERT INTO users(id, userName, password, createdAt)
       VALUES('${id}', '${userName}', '${password}', '${createdAt}')
    `,
    getUser: (userName) => `
       SELECT userName, password FROM users WHERE userName = '${userName}'
    `
}