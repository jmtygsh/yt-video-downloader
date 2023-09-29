
// AIzaSyCVfCUokkVjsujjX8Xnfg28l9eyqPylH3s


"use client"
// pages/Search.js

import { useState } from 'react';
import axios from 'axios';
import ytdl from 'ytdl-core';

export default function Search() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [availableVideoFormats, setAvailableVideoFormats] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setUrl(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const videoId = extractVideoId(url);

            // Step 1: Fetch video details from your Next.js API route
            const response = await axios.get(`/api/youtube?videoId=${videoId}`);
            const { videoFormats } = response.data;

            // Filter formats to include both video and audio streams
            const filteredFormats = ytdl.filterFormats(videoFormats, 'videoandaudio');

            setAvailableVideoFormats(filteredFormats);

            if (filteredFormats.length > 0) {
                // Pre-select the highest quality available
                setSelectedFormat(filteredFormats[0]);
            }
        } catch (err) {
            setError('Error fetching video details. Please check the URL or API Key.');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleQualityChange = (format) => {
        setSelectedFormat(format);
    };

    const handleDownload = () => {
        if (selectedFormat) {
            const downloadUrl = selectedFormat.url;

            // Create a Blob from the video URL
            fetch(downloadUrl).then((response) => response.blob()).then((blob) => {
                const url = window.URL.createObjectURL(blob);

                // Create a temporary anchor element
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedFormat.qualityLabel}.${selectedFormat.container}`;

                // Trigger the download
                a.click();

                // Release the object URL
                window.URL.revokeObjectURL(url);
            });
        }
    };

    const extractVideoId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get("v");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">YouTube Video Downloader</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="Paste YouTube URL"
                    value={url}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2">
                    Fetch Video Info
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Available Video Formats:</h3>
                <ul>
                    {availableVideoFormats.map((format, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleQualityChange(format)}
                                className={`${format === selectedFormat ? 'bg-blue-500 text-white' : ''
                                    } p-1`}
                            >
                                {format.qualityLabel}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleDownload}
                    disabled={!selectedFormat}
                    className={`${selectedFormat ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                        } p-2 mt-2`}
                >
                    Download
                </button>
            </div>
        </div>
    );
}
