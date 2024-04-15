const path = require('path')
const multer = require('multer')
const fs = require('fs')
function storageMake(targetPath,fileName,source){
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(path.join(__dirname, targetPath))){
                fs.mkdirSync(path.join(__dirname, targetPath));
            }
            cb(null, path.join(__dirname, targetPath))
        },
        filename: (req, file, cb) => {
            // console.log(file)
            cb(null, fileName)
        }
    })
    return multer({storage}).single(source)
}

// const upload = multer({storage})

module.exports = {storageMake}