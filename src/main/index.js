import { app, BrowserWindow } from 'neutrinojs';

var win = null;

function createWindow() {
  app.log('creating window');

  win = new BrowserWindow({
    width: 1000,
    height: 800,
    title: 'Lyra Music Player'
  });

  win.loadURL('file://' + __dirname + '/index.html');

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

export default app;
