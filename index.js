import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
dotenv.config()

const app = express()
const upload = multer()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file
  res.status(200).json({ name: originalname, type: mimetype, size: size })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
