"use client"


import { useState } from 'react';
import axios from 'axios';
import Style from '../components/Search.module.css';

export default function Search() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoDetails, setVideoDetails] = useState(null);
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
            const { videoInfo, videoFormats } = response.data;

            setVideoDetails(videoInfo);
            setAvailableVideoFormats(videoFormats);

            if (videoFormats.length > 0) {
                // Pre-select the highest quality available
                setSelectedFormat(videoFormats[0]);
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

    const handleDownload = async () => {
        if (selectedFormat) {
            const quality = selectedFormat.qualityLabel;

            try {
                // Create a proxy URL to stream the video directly to the user
                const proxyUrl = `/api/proxy?videoUrl=${encodeURIComponent(selectedFormat.url)}`;

                // Extract only the title from videoDetails
                const videoTitle = videoDetails.title;
                const cleanedVideoTitle = videoTitle.replace(/[^\w\s]/gi, ''); // Remove special characters

                // Create an anchor element with the proxy URL to trigger the download
                const a = document.createElement('a');
                a.href = proxyUrl;

                // Set the downloaded file name using the extracted video title
                a.download = `${cleanedVideoTitle}_${quality}.mp4`;
                a.style.display = 'none';

                document.body.appendChild(a);
                a.click();

                // Clean up the anchor element
                document.body.removeChild(a);

                console.log('Download started.');
            } catch (err) {
                console.error('Error starting download:', err);
            }
        }
    };


    const extractVideoId = (url) => {
        const urlObj = new URL(url);
        let videoId = '';

        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
            videoId = urlObj.searchParams.get('v');
        } else if (urlObj.hostname === 'youtu.be') {
            // Extract the video ID from the path (e.g., /NPC-9hYbkLE)
            videoId = urlObj.pathname.substr(1);
        }

        return videoId;
    };


    return (
        <>
            <div className='w-2/5 m-auto shadow-xl'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="default-search" className="b-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" value={url} onChange={handleInputChange} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300  rounded-lg bg-gray-50 focus:ring-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500" placeholder="Paste Youtube Video Link" required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

            </div>


            <div className='mt-20'>
                {loading ? (
                    <div className={Style.loading}>
                        <span className={Style.loader}></span>
                        <div className={Style.label}>Preparing your download...</div>
                    </div>
                ) : (
                    <>
                        {error && <p className="text-red-500">{error}</p>}

                        {videoDetails && (
                            <div className={`mt-4 flex justify-center space-x-4 mb-4`}>
                                <img
                                    src={videoDetails.thumbnails.high.url}
                                    alt={videoDetails.title}
                                    className="w-[18.3rem] rounded-md"
                                />
                                <div className="w-1/3">
                                    <h2 className="text-xl font-semibold text-center">
                                        {videoDetails.title}
                                    </h2>
                                    <div className="mt-2 text-center">
                                        <h3 className="text-lg font-semibold text-center text-red-400">Available Video Quality:</h3>
                                        <ul>
                                            {availableVideoFormats.map((format, index) => (
                                                <li key={index} className="mt-2">
                                                    <button
                                                        onClick={() => handleQualityChange(format)}
                                                        className={`${format === selectedFormat
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-300 text-gray-500'
                                                            } p-1 w-[90%] rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-70`}
                                                    >
                                                        {format.qualityLabel}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={handleDownload}
                                            disabled={!selectedFormat}
                                            className={`${selectedFormat
                                                ? 'bg-black text-white'
                                                : 'bg-gray-300 text-gray-500'
                                                } p-2 mt-2 w-[90%] rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-70`}
                                        >
                                            Download
                                        </button>
                                    </div>


                                </div>
                            </div>
                        )}


                    </>
                )}

            </div>

        </>
    );
}








