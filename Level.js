class Level {
  constructor({ LevelName="", Creator="", Description="", Music=1, Slot0Gun=-1, Slot1Gun=-1, Slot2Gun=-1, InitialHealth=5, InitialEnergy=30, Sections=[] }) {
    this.LevelName = LevelName
    this.Creator = Creator
    this.Description = Description
    this.Music = Music
    this.Slot0Gun = Slot0Gun
    this.Slot1Gun = Slot1Gun
    this.Slot2Gun = Slot2Gun
    this.InitialHealth = InitialHealth
    this.InitialEnergy = InitialEnergy
    this.Sections = Sections
    this.tileCount = 0
    this.prefabCount = 0
    this.channelsUsed = []
  }

  get nextFreeChannel() {
    let channel = -1
    this.channelsUsed.forEach((ch, index) => {
      if(!ch) {
        channel = index
      }
    })

    return channel
  }

  setLevelData({ 
    LevelName=this.LevelName,Creator=this.Creator,Description=this.Description,Music=this.Music,Slot0Gun=this.Slot0Gun,
    Slot1Gun=this.Slot1Gun,Slot2Gun=this.Slot2Gun,InitialHealth=this.InitialHealth,InitialEnergy=this.InitialEnergy
  }) {
    this.LevelName = LevelName
    this.Creator = Creator
    this.Description = Description
    this.Music = Music
    this.Slot0Gun = Slot0Gun
    this.Slot1Gun = Slot1Gun
    this.Slot2Gun = Slot2Gun
    this.InitialHealth = InitialHealth
    this.InitialEnergy = InitialEnergy
  }

  createSection({ Name="", Music=1, LevelBounds={x:0, y:0, z:0, w:0}, spanwPointX=0, spawnPointY=0 }) {
    this.Sections.push({ 
      Name, 
      SpawnPoint: {x: spanwPointX, y: spawnPointY, magnitude: 0, sqrMagnitude: 0}, 
      LevelBounds, 
      Music, 
      T0: "", D: "", BG0: "", SS: "", H: "", M: "", 
      Prefabs: [], Paths: [] 
    })
  }

  addTile({ sectionId=0, ID=0, layer="T0", x, y }) {
    this.tileCount++;
    this.Sections[sectionId][layer] += `${ID}(${x},${y})`
  }

  addPath({ sectionId=0, path }) {
    this.Sections[sectionId].Paths.push(path);
  }
    
  addPrefab({ sectionId=0, ID, x, y, Properties={} }) {
    this.prefabCount++;
    this.Sections[sectionId].Prefabs.push({ID, Position: {x, y}, Properties})
  }

  addBooster({ sectionId=0, x, y, Strength=30, Channel=-2, StartActive=true, Direction=0 }) {
    const _channel = (channel === -2) ? this.nextFreeChannel : Channel
    this.addPrefab({ 
      sectionId, ID: 1, x, y, 
      Properties: {Strength, Channel: _channel, StartActive, Direction}
    })
    return _channel
  }
  
  addButton({ sectionId=0, x, y, Channel=-2 }) {
    const _channel = (channel === -2) ? this.nextFreeChannel : Channel
    this.addPrefab({ sectionId, ID: 200, x, y, Properties: {Channel: _channel}})
    return _channel
  }

  addCheckPoint({ sectionId=0, x, y, isLevelEnd=false }) {
    if(!isLevelEnd) {
      this.addPrefab({ sectionId, ID: null, x, y})
    } else {
      this.addPrefab({ sectionId, ID: 7, x, y})
    }
  }


  addCrate({ sectionId=0, x, y }) {
    this.addPrefab({ sectionId, ID: 3, x, y, Properties: {}})
  }

  
  addMovingPlatform({ sectionId=0, ID=4, x, y, Size={x:1,y:1}, Channel=-2, PathEnabled=false, PathID=0, InitialPointID=0, Speed=3, Reversed=false, PauseDuration=0 }) {
    const _channel = (channel === -2) ? this.nextFreeChannel : Channel
    this.addPrefab({
      sectionId,
      ID,
      x, y,
      Properties: {
        Size,
        Channel: _channel,
        PathEnabled, PathID, InitialPointID,
        Speed, Reversed, PauseDuration
      }
    })
    return _channel
  }

  addToggleWall({ sectionId=0, x, y, Size={x:1,y:1}, Channel=-2, PathEnabled=false, PathID=0, InitialPointID=0, Speed=3, Reversed=false, PauseDuration=0 }) {
    const _channel = (channel === -2) ? this.nextFreeChannel : Channel
    this.addMovingPlatform({
      sectionId,
      ID: 201,
      x, y, Size,
      Channel: _channel,
      PathEnabled, PathID, InitialPointID,
      Speed, Reversed, PauseDuration
    })
    return _channel
  }
}



module.exports = Level