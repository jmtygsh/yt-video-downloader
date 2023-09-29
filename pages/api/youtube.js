// pages/api/youtube.js

import axios from 'axios';
import ytdl from 'ytdl-core';

export default async function handler(req, res) {
    const { videoId } = req.query;

    try {
        // Step 1: Fetch video details using YouTube Data API
        const apiKey = 'AIzaSyCVfCUokkVjsujjX8Xnfg28l9eyqPylH3s'; // Replace with your YouTube API key
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`);
        const videoInfo = response.data.items[0].snippet;


        // Step 2: Fetch available video formats using ytdl-core
        const videoInfoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const info = await ytdl.getInfo(videoInfoUrl);

        // Filter formats to include both video and audio streams
        const videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio');

        res.status(200).json({ videoInfo, videoFormats });

    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from the external API.' });
    }
}
