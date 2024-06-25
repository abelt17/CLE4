import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { PlayerInfo } from './playerInfo'
import { VillaBaobab } from './levels'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    WindowsHills: new ImageSource('images/windows-hills.jpg'),
    Level1bg: new ImageSource('images/bg-level1.png'),
    Level2bg: new ImageSource('images/bg-level2.png'),
    Level3bg: new ImageSource('images/bg_level3.png'),
    BridgeHome: new ImageSource('images/storyimg.png'),
    PixelArtBridge: new ImageSource('images/level1-bridge.png'),
    Spider: new ImageSource('images/spider.png'),
    Cursor: new ImageSource('images/black-dot.png'),
    Podiums: new ImageSource('images/podiums.jpg'),
    Jake: new ImageSource('images/jake.png'),
    Bazookerlilly: new ImageSource('images/bazookerlilly.png'),
    Chomperdaisy: new ImageSource('images/chomperdaisy.png'),
    Incinerose: new ImageSource('images/incinerose.png'),
    Sparringspar: new ImageSource('images/sparringspar.png'),
    Player1: new ImageSource('images/player1.png'),
    Player2: new ImageSource('images/player2.png'),
    Player3: new ImageSource('images/player3.png'),
    Villa: new ImageSource('images/villa-baobab.png'),
    FightScene: new ImageSource('images/Fightscene_Background.png'),
    PlayerInfoBG: new ImageSource('images/bg-playerinfo.png'),
    battleambush: new ImageSource('images/battleambush.png'),
    ambushengage: new ImageSource('images/ambushengage.png'),
    bmxbrainiac: new ImageSource('images/bmxbrainiac.png'),
    crittercamono: new ImageSource('images/crittercamono.png'),
    critterzumbi: new ImageSource('images/critterzumbi.png'),
    punkcritter: new ImageSource('images/punkcritter.png'),
    petuninja: new ImageSource('images/petuninja.png'),
    profacacia: new ImageSource('images/profacacia.png'),
    scarecrow: new ImageSource('images/scarecrow.png'),
    sparringsparsparringpartner: new ImageSource('images/sparringsparsparringpartner.png'),
    symphonyofroses: new ImageSource('images/symphonyofroses.png'),
    thegardener: new ImageSource('images/thegardener.png'),
    thegnome: new ImageSource('images/thegnome.png'),
    toblowuupmate: new ImageSource('images/toblowuupmate-os.png'),
    obliterate: new ImageSource('images/obliterate.png'),
    blast: new ImageSource('images/blastattack.png'),
    sparringspar: new ImageSource('images/sparringspar.png'),
    VillaBaobabInside: new ImageSource('images/villa-baobab-inside.png'),
    BaobabDoor: new ImageSource('images/baobab-door.png'),
    TitleScreen: new ImageSource('images/title.png'),
    StoneBridge: new ImageSource('images/stone-bridge.png'),
    Hefbrug: new ImageSource('images/hefbrug.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }