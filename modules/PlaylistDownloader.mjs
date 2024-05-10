import youtubeDl from "youtube-dl-exec";
import { Spinner } from "cli-spinner";

import chalk from "chalk";
import path from "path";

export class PlaylistDownloader {
  #playlist;

  constructor(playlist) {
    this.#playlist = playlist;
  }

  async downloadMusic(url, name) {
    return await youtubeDl(url, {
      output: `${process.env.USERPROFILE}/Downloads/musics/${name.replaceAll("/", "") || new Date().getTime()
        }.mp3`,
      extractAudio: true,
      audioFormat: "mp3",
      ffmpegLocation: path.join(path.resolve(), "vendor/ffmpeg/bin/ffmpeg.exe"),

      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });
  }

  async init() {
    const spinner = new Spinner("%s Loading Playlist...").setSpinnerString(
      "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"
    );

    spinner.start();

    const output = await youtubeDl(this.#playlist, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });

    spinner.stop();

    for (const [index, video] of output.entries.entries()) {
      if (video?.original_url) {
        const spinner = new Spinner(
          `Downloading ${index + 1}ª Music - ${video.title} `
        ).setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏");

        spinner.start();
        await this.downloadMusic(video.original_url, video.title);
        spinner.stop();
      }
    }

    console.log(chalk.green("\nDownload Finished!"))
  }
}
