const {
    app,
    ipcMain,
    Menu
} = require('electron');

const ChronoTray = require('./app/chronotray');
const MyWindow = require('./app/mywindow');

let chronotray = null;
let mywindow = null;

// Don't show the app in the doc
app.dock.hide();

app.on('ready', () => {
    mywindow = new MyWindow();
    mywindow.createWindow();
    mywindow.createTimerWindow();
    createTray(mywindow);
});

app.on('window-all-closed',() => {
	if (tray) tray.destroy();
});

const createTray = (mywindow) => {
    chronotray = new ChronoTray();

    mywindow.setTray(chronotray);
    chronotray.setToolTip('Este é um app em electron');
    chronotray.on('right-click', () => mywindow.toggleWindow() );
    chronotray.on('double-click', () => mywindow.toggleWindow() );
    chronotray.on('click', (event, bounds) => mywindow.toogleTimerWindow() );

    let menuTemplate = [
        {
            label: "Cronometro",
            click: () => {
                mywindow.toogleTimerWindow();
            }
        },
        {
            label: "Fechar",
            click(){
                app.quit();
            }
        }
    ];

    chronotray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
    ipcMain.on('closeTimerWindow', () => mywindow.toogleTimerWindow() );
}



