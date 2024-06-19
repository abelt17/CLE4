import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    WindowsHills: new ImageSource('images/windows-hills.jpg'),
    BridgeHome: new ImageSource('images/bridge_home.jpg'),
    PixelArtBridge: new ImageSource('images/pixel-art-bridge.png'),
    Spider: new ImageSource('images/spider.png'),
    Cursor: new ImageSource('images/black-dot.png'),
    Zone1: new ImageSource('images/zone1.png'),
    Bazookerlilly: new ImageSource('images/bazookerlilly.png'),
    Chomperdaisy: new ImageSource('images/chomperdaisy.png'),
    Incinerose: new ImageSource('images/incinerose.png'),
    Sparringspar: new ImageSource('images/sparringspar.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }