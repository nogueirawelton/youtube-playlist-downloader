// const downloader = require('./downloader.js');
import { PlaylistDownloader } from "./modules/PlaylistDownloader.mjs";
import getArgValue from "./utils/getArgValue.mjs";

const playlist = getArgValue("-p");

if (playlist) {
  const downloader = new PlaylistDownloader(playlist);
  downloader.init();
} else {
  
  console.log("Insert the playlist URL");
}
