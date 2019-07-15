// @flow strict

/*
  YouTube related utility methods

  Some of the packages that are used for YouTube integration
  require some setup before running (e.g. ffmpeg, googleapis).
  Moving all of them to this file helps centralize the setup
  code, and avoid duplication across the codebase.
*/

// import { setTags } from './util';

import type { SongID, VideoSong } from './types';

export async function getStreamURL(id: SongID): Promise<string> {
  const res = await fetch(`http://localhost:5000/yt/url?id=${id}`);
  const url = res.text();
  return url;
}

// export function downloadVideo(id: SongID) {
//   /*
//     This method fetches the audio of a YouTube video, and downloads it
//     to download.mp3, while converting to a mp3 file. Once it finishes,
//     it renames the file to the title of the video, applies metadata tags,
//     and returns the new song object.
//   */

//   let info, currDuration;
//   const dlPath = path.join(storage.getDataPath(), `download-${id}.mp3`);

//   const emitter = new events.EventEmitter();

//   const stream = ytdl(id, { quality: 'highestaudio' }).on('info', ytinfo => {
//     info = ytinfo;
//   });

//   /*
//     ffmpeg's progress event contains a "percent" property, but
//     it can be really inaccurate at times.

//     The info object from ytdl contains a "length_seconds" value,
//     but it's only precise to seconds. The progress event from ffmpeg
//     has a precision of 0.01s, but doesn't contain total duration information.

//     The following calculation uses ytdl's info as an approximate duration
//     to calculate percent downloaded. Then, it uses the last duration from
//     ffmpeg's progress to store as song duration metadata.
//   */

//   ffmpeg(stream)
//     .audioBitrate(128)
//     .on('progress', progress => {
//       const [h, m, s] = progress.timemark.split(':').map(Number);
//       currDuration = h * 3600 + m * 60 + s;

//       const percent = Math.min(100 * (currDuration / info.length_seconds), 100);

//       emitter.emit('progress', percent);
//     })
//     .save(dlPath)
//     .on('end', async () => {
//       await setTags(dlPath, {
//         title: info.title,
//         artist: info.author.name
//       });

//       // Sanitize for file name
//       const safeName = info.title.replace(/[/\\?%*:|"<>. ]/g, '_') + '.mp3';
//       const filepath = path.join(storage.getDataPath(), safeName);

//       fs.rename(dlPath, filepath, err => {
//         if (err) {
//           emitter.emit('end');
//           return;
//         }

//         const song: Song = {
//           id: createHash('sha256')
//             .update(info.video_id)
//             .digest('hex'),
//           filepath,
//           title: info.title,
//           artist: info.author.name,
//           duration: currDuration,
//           playlists: [],
//           date: Date.now(),
//           source: 'LOCAL'
//         };

//         emitter.emit('end', song);
//       });
//     });

//   return emitter;
// }

async function ytQuery(options): Promise<VideoSong[]> {
  const res = await fetch(
    `http://localhost:5000/yt/query?options=${JSON.stringify(options)}`
  );
  const json = res.json();
  return json;
}

export async function ytSearch(keyword: string): Promise<VideoSong[]> {
  return ytQuery({
    q: keyword
  });
}

export async function getRelatedVideos(id: SongID): Promise<VideoSong[]> {
  // return ytQuery({
  //   relatedToVideoId: id
  // });

  // Alternative using ytdl
  const res = await fetch(`http://localhost:5000/yt/related?id=${id}`);
  const videos = res.json();
  return videos;
}
