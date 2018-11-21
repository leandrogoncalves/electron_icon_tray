const {
    Tray,
    nativeImage
} = require('electron');
const path = require('path');
//const jetpack = require('fs-jetpack');


const ChronoTray = class extends Tray {
    constructor(){
        const icon = process.platform === 'darwin' ? `dart.png` : `dart.png`;
        const iconPath = path.join(__dirname, '..','assets','img', icon);
        // console.log(jetpack.exists(iconPath)); //should be "file", otherwise you are not pointing to your icon file 
        let nimage = nativeImage.createFromPath(iconPath);
        super(nimage);
    }
}


module.exports = ChronoTray;