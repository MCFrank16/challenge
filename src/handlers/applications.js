const { v4 } = require('uuid');
const fs = require('fs');
const { errorMessage } = require('../middlewares/multer');
const db = require('../helper/db');
const { insertApplicant, getApplicants, getCV, updateApplication, deleteApplication } = require('../helper/queries');

async function submitApplication(req, res) {
   try {
    if (!req.body) return res.status(400).send({ status: 'failed', message: "fill all the fields" });

    const { firstname, lastname, email, phonenumber, location} = req.body;

    const cv = req.file.path;
    const id = v4().toString();
    const mimetype = req.file.mimetype;
    await db.database.exec(insertApplicant(id, firstname, lastname, email, phonenumber, location, cv, 'pending', new Date().toLocaleString(), mimetype));

    res.status(201).redirect('/');
   } catch(err) {
       console.debug(err);
       res.status(500).send();
   } 
}

async function getApplications(req, res, next) {
    var { from } = (req.query || {});
    from = parseInt(from, 10);
    if (!from) {
        from = 0;
    }
    try {
        const applications = await db.database.all(getApplicants(from));
        req.applications = applications;
        return next();
    } catch(err) {
        return err;
    }
}

async function getApplicationCV(req, res){
    try {
        var { id } = (req.params || {});
        const a = await db.database.all(getCV(id));
        if (a.length === 0) return res.status(404).send({ message: 'application not found'});
        const { cv, mimetype } = a[0];
        res.writeHead(200, {
            'Content-Type': mimetype,
            'Content-Disposition': `attachment; cv.${mimetype.split('/')[1]}`
        });
        const fileStream = fs.createReadStream(cv);
        fileStream.pipe(res);
    } catch (error) {
        console.debug(err);
        res.status(500).send();
    }
}

async function updateStatus(req, res){
    const { status } = req.query;

    var { id } = (req.params || {});
    try {
        if (!status) return res.status(400).send();
        await db.database.exec(updateApplication(id, status));
        res.status(200).redirect('/resources');
    } catch (error) {
       console.debug(error);
       res.status(500).send();
    }
}

async function removeApplication(req, res){
    var { id } = (req.params || {});
    try {
        await db.database.exec(deleteApplication(id));
        res.status(200).send();
    } catch (error) {
        console.debug(error);
        res.status(500).send()
    }

}

module.exports = { getApplications, submitApplication, getApplicationCV, updateStatus, removeApplication };
