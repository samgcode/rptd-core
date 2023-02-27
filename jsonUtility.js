const fs = require('fs')
const Level = require('./Level')

class JsonUtility {
  createLevelFromFile(file) {
    let obj = fs.readFileSync(file, 'utf8', (err, data) => {
        if (err) throw err
        return JSON.parse(data)
      }
    );
    obj = JSON.parse(obj)

    return new Level(obj)
  }
  
  writeLevelToFile(levelData, file) {
    let json = JSON.stringify(levelData)
    fs.writeFileSync(file, json, 'utf8', (err) => {
      if(err) throw err
    }); 
    console.log(`tiles: ${levelData.tileCount}`)
    console.log(`entities: ${levelData.prefabCount}`)
    console.log("file write successful")
  }

  readFile(file) {
    let obj = fs.readFileSync(file, 'utf8', (err, data) => {
        if (err) throw err
        return JSON.parse(data)
      }
    );
    obj = JSON.parse(obj)

    return obj
  }
}

module.exports = new JsonUtility()