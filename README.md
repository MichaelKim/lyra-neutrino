# Lyra Neutrino

A port of my music player [Lyra](https://github.com/LenKagamine/lyra), written using [Neutrino](https://github.com/LenKagamine/neutrino).

This project acts as a proof of concept for Neutrino, and allows me to work on Neutrino using a real application. As I continue adding features to Neutrino, I can steadily bring this up to state of Lyra (Electron).

## Main Differences

Neutrino doesn't support any Node features (aside from `__dirname`, `fs.readFile` and `fs.writeFile`), so any npm module that relies on them can't be run in Neutrino. For Lyra, this consists of most of the YouTube integration. Instead, all of the YouTube logic is extracted into a companion server (located in `server/`).

Also, some native GUI elements are not implemented yet, namely context menues and file dialogs. So, this currently doesn't support any local playback or video saving.

## Features

- Playback
  - Volume control
  - Shuffle
  - Skip forward / back 10 seconds
  - Skip to previous / next song
- Playlists
  - Create and delete playlists
  - Play songs in a playlist
- YouTube
  - Search for YouTube videos
  - YouTube video playback
  - Autoplay
  - Shows related videos

## Development

To run locally, clone this repo along with [Neutrino](https://github.com/LenKagamine/neutrino). Place them in the same directory, then build Neutrino. Make sure to place the built executable inside `path/to/neutrino/lib`. If you use CMake, the provided config should already do it.

Then, run the following:

```
npm install
npm run dev
```

This will do four things:

1. Start the Express server
2. Build everything using Webpack
3. Serve the web (renderer) files (like Electron)
4. Start Neutrino

To build the (unpacked) production version,

```
npm run dist
```

Host the Express server located in `server/` to `localhost:8080`, and run the executable in `dist/lyra-neutrino-unpacked/lyra-neutrino(.exe)`.

## Issues

- Windows
  - The [webview](https://github.com/LenKagamine/webview) used by Neutrino can't navigate to local HTML files. So, running the unpacked production build won't work.
- MacOS
  - Webkit / Safari doesn't support the Opus audio format.
  - For some reason, Webkit thinks the audio streams are twice as long than they actually are.
  - Sometimes, audio doesn't start until the window regains focus.
