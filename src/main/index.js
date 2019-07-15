import { app } from 'neutrinojs';

function createWindow() {
  app.log('creating window');
}

app.on('ready', createWindow);
