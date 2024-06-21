import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { PlayerInfo } from './playerInfo'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    WindowsHills: new ImageSource('images/windows-hills.jpg'),
    Level3bg: new ImageSource('images/Template_bg_level_3'),
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
    FightScene: new ImageSource('images/Fightscene_Background.png'),
    PlayerInfoBG: new ImageSource('images/bg-playerinfo.png'),
    battleambush: new ImageSource('images/battleambush.png'),
    ambushengage:new ImageSource('images/ambushengage.png'),
    bmxbrainiac:new ImageSource('images/bmxbrainiac.png'),
    crittercamono:new ImageSource('images/crittercamono.png'),
    critterzumbi:new ImageSource('images/critterzumbi.png'),
    punkcritter:new ImageSource('images/punkcritter.png'),
    petuninja:new ImageSource('images/petuninja.png'),
    profacacia:new ImageSource('images/profacacia.png'),
    scarecrow:new ImageSource('images/scarecrow.png'),
    sparringsparsparringpartner:new ImageSource('images/sparringsparsparringpartner.png'),
    symphonyofroses:new ImageSource('images/symphonyofroses.png'),
    thegardener:new ImageSource('images/thegardener.png'),
    toblowuupmate:new ImageSource('images/toblowuupmate-os.png'),
    obliterate: new ImageSource('images/obliterate.png'),
    blast: new ImageSource('images/blastattack.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }