const request = require('request')
const fs = require('fs-extra')

const url = 'http://www.tingban.cn/webapi/audios/list?id=1100000119561&pagesize=20&pagenum=1&sorttype=-1&_=1536158933905'

request.get(url, (err, res, body) => {
  const arr = JSON.parse(body).result.dataList
  fs.ensureDirSync("./mp3")
  arr.forEach(v => {
    const { audioName:name, mp3PlayUrl: url} = v
    request.get(url).pipe(fs.createWriteStream("./mp3/" + name + ".mp3"))
  })
})