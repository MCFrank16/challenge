const { v4 } = require('uuid');
const fs = require('fs');
const { errorMessage } = require('../middlewares/multer');
const db = require('../helper/db');
const { insertApplicant, getApplicants, getCV, updateApplication } = require('../helper/queries');

async function submitApplication(req, res) {
   if (req.errorFile  === errorMessage) return res.status(400).send({ status: 'failed', message: errorMessage });
   if (!req.body) return res.status(400).send({ status: 'failed', message: "fill all the fields" });
   try {
    const { firstName, lastName, email, phoneNumber, location} = req.body;
    if (!(firstName || lastName || email || phoneNumber || location)) {
        return res.status(400).send({ status: 'failed', message: "fill all the fields" });
    }
    const cv = req.file.path;
    const id = v4().toString();
    const mimetype = req.file.mimetype;
    await db.database.exec(insertApplicant(id, firstName, lastName, email, phoneNumber, location, cv, 'submitted', Date.now().toString(), mimetype));
    res.status(201).send({message: 'application sent'});
   } catch(err) {
       console.debug(err);
       res.status(500).send();
   } 
}

async function getApplications(req, res) {
    var { from } = (req.query || {});
    from = parseInt(from, 10);
    if (!from) {
        from = 0;
    }
    try {
        const applications = await db.database.all(getApplicants(from));
        res.status(200).send({ applications });
    } catch(err) {
        console.debug(err);
        res.status(500).send();
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
    const { status } = req.body;
    var { id } = (req.params || {});
    try {
        if (!status) return res.status(400).send();
        await db.database.exec(updateApplication(id, status));
        res.status(200).send();
    } catch (error) {
       console.debug(error);
       res.status(500).send();
    }
}

module.exports = { getApplications, submitApplication, getApplicationCV, updateStatus };
