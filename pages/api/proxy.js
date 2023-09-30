import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { videoUrl } = req.query;

        // Make a request to the external video URL and forward the response
        const response = await axios.get(videoUrl, {
            responseType: 'stream', // Use stream responseType
        });

        // Set appropriate headers for the response
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Length', response.headers['content-length']);
        
        // Pipe the video stream directly to the response to the user
        response.data.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error proxying the video.' });
    }
}
