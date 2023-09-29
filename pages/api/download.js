import { Readable } from 'stream';
import ytdl from 'ytdl-core';
import os from 'os';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
    const { videoId, quality } = req.body;

    try {
        const info = await ytdl.getInfo(videoId);

        // Find a suitable format based on quality label that includes both audio and video
        const format = info.formats.find(
            (format) => format.qualityLabel === quality && format.hasAudio && format.hasVideo
        );

        if (!format) {
            console.error(`No such format found with audio and video: ${quality}`);
            res.status(400).json({ error: 'No suitable format found with audio and video' });
            return;
        }

        const videoFileName = `${info.videoDetails.title}.${format.container}`;

        // Get the user's home directory
        const userHomeDir = os.homedir();

        // Define the output directory as the user's "Downloads" directory
        const outputDirectory = path.join(userHomeDir, 'Downloads');

        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }

        const outputFilePath = path.join(outputDirectory, videoFileName);

        const videoStream = ytdl(videoId, { quality: format.itag });
        const writeStream = fs.createWriteStream(outputFilePath);

        videoStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`Finished downloading: ${outputFilePath}`);

            // Set the appropriate response headers to trigger the download
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${videoFileName}"`);
            res.status(200);
            fs.createReadStream(outputFilePath).pipe(res);
        });

        writeStream.on('error', (err) => {
            console.error(err);
            res.status(500).json({ error: 'Error saving the video.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error downloading the video.' });
    }
}
