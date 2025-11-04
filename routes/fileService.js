const express = require('express');
const multer = require('multer');
const {v4 : uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const router = express.Router();

require('dotenv').config();

const UPLOAD_BASE = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
if(!fs.existsSync(UPLOAD_BASE))
    fs.mkdirSync(UPLOAD_BASE, {recursive: true});

router.post("/upload/:folder", (req, res)=>{
    const folder = req.params.folder || "default";
    const uploadPath = path.join(UPLOAD_BASE, folder);

    if(!fs.existsSync(uploadPath))
        fs.mkdirSync(uploadPath, {recursive: true});

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, uploadPath);    
        },
        filename: function(req, file, cb){
            const ext = path.extname(file.originalname);
            const randomName = uuidv4() + ext;
            cb(null, randomName);
        }
    });

    const upload = multer({storage: storage}).single("file");
    upload(req, res, function(err){
        if(err)
            return res.status(500).json({error : err.message   });
        if(!req.file)
            return res.status(400).json({error: 'No file upladed'});

        res.json({
            originalname: req.file.originalname,
            randomName: req.file.filename,
            size: req.file.size,
            folderPath: path.posix.join(folder, req.file.filename)
        });
    });
});


router.get("/get/:folder/:filename", (req, res)=>{
    const {folder, filename} = req.params;
    const filePath = path.join(UPLOAD_BASE, folder, filename); // ./uploads/document/abc.png => C:\upload\document\abc.png
    if(!fs.existsSync(filePath))
        return res.status(500).join({error: 'File not found'})
    res.sendFile(path.resolve(filePath));
});

module.exports = router;