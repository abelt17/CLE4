import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { PlayerInfo } from './playerInfo'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    WindowsHills: new ImageSource('images/windows-hills.jpg'),
    BridgeHome: new ImageSource('images/bridge_home.jpg'),
    PixelArtBridge: new ImageSource('images/level1-bridge.png'),
    Spider: new ImageSource('images/spider.png'),
    Cursor: new ImageSource('images/black-dot.png'),
    Level1bg: new ImageSource('images/bg-level1.png'),
    Podiums: new ImageSource('images/podiums.jpg'),
    Jake: new ImageSource('images/jake.png'),
    Bazookerlilly: new ImageSource('images/bazookerlilly.png'),
    Chomperdaisy: new ImageSource('images/chomperdaisy.png'),
    Incinerose: new ImageSource('images/incinerose.png'),
    Sparringspar: new ImageSource('images/sparringspar.png'),
    Critter1: new ImageSource('images/critter1.png'),
    Critter2: new ImageSource('images/critter2.png'),
    Critter3: new ImageSource('images/critter3.png'),
    Villa: new ImageSource('images/villa-baobab.png'),
    FightScene: new ImageSource('images/Placeholder_FightScene_Background.png'),
    PlayerInfoBG: new ImageSource('images/bg-playerinfo.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }