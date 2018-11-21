const {
    BrowserWindow
} = require('electron');
const path = require('path');

class MyWindow {

    setTray(tray){
        this.tray = tray;
        return this;
    }

    createWindow(){

        this.mainWindow = new BrowserWindow({
          width: 300,
          height: 450,
          show: false,
          frame: false,
          fullscreenable: false,
          resizable: false,
        //   transparent: true,
          webPreferences: {
            // Prevents renderer process code from not running when mainWindow is
            // hidden
            backgroundThrottling: false
          }
        })
        this.mainWindow.loadURL(`file://${path.join(__dirname, '..' , 'view', 'index.html')}`)
      
        // Hide the window when it loses focus
        this.mainWindow.on('blur', () => {
          if (!this.mainWindow.webContents.isDevToolsOpened()) {
            this.mainWindow.hide()
          }
        })
    }
    
    createTimerWindow(){
        this.timerWindow = new BrowserWindow({
            width: 300,
            height: 150,
            show: false,
            frame: false,
            fullscreenable: false,
            resizable: false
          })
          this.timerWindow.loadURL(`file://${path.join(__dirname, '..', 'view', 'timer.html')}`)
    
        // Hide the window when it loses focus
        this.timerWindow.on('blur', () => {
            if (!this.timerWindow.webContents.isDevToolsOpened()) {
                this.timerWindow.hide()
            }
        })
        
    }
    
    toggleWindow(){
        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            this.showWindow();
        }
    }
    
    toogleTimerWindow(){
        if (this.timerWindow.isVisible()) {
            this.timerWindow.hide();
         } else {
            this.showtimerWindow();
         }
    }
      
    showWindow(){
        const position = this.getWindowPosition(this.mainWindow);
        this.mainWindow.setPosition(position.x, position.y, false);
        this.mainWindow.show();
        this.mainWindow.focus();
    }
    
    showtimerWindow(){
        const position = this.getWindowPosition(this.timerWindow);
        this.timerWindow.setPosition(position.x, position.y, false);
        this.timerWindow.show();
        this.timerWindow.focus();
    }
    
     getWindowPosition(window){
        const windowBounds = window.getBounds();
        const trayBounds = this.tray.getBounds();
      
        // Center window horizontally below the tray icon
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
      
        // Position window 4 pixels vertically below the tray icon
        const y = Math.round(trayBounds.y + trayBounds.height + 4);
      
        return {x: x, y: y};
    }
    
}



module.exports = MyWindow;