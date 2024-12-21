import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { TypeAnimation } from 'react-type-animation';

// Import images from assets folder
import orbital from '../assets/orbital.png';
import bot from '../assets/bot.png';
import human1 from '../assets/human1.jpeg';
import human2 from '../assets/human2.jpeg';

function Home() {
    const authStatus = useSelector((state) => state.auth.status); // Get auth status
    const user = useSelector((state) => state.auth.userData); // Get user data
    const [typingStatus, setTypingStatus] = useState("Human1");
    const navigate = useNavigate();  // Initialize navigate function

    useEffect(() => {
        if (authStatus && user) {
            // Navigate to the dashboard if authenticated
            navigate('/dashboard');
        }
    }, [authStatus, user, navigate]);  // Add dependencies to trigger effect when authStatus or user changes

    // Render the home page for unauthenticated users
    return (
        <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row items-center relative flex-grow">
                {/* Left Section */}
                <img
                    src={orbital}
                    alt="Orbital Background"
                    className="absolute opacity-10 animate-rotate w-full h-full object-cover"
                />

                <div className="text-center lg:w-1/2 p-6 rounded-lg shadow-lg mb-6 lg:mb-0 z-10 relative">
                    <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-900 via-purple-500 to-red-500 bg-clip-text text-transparent mb-4">
                        CNN Model
                    </h1>
                    <h2 className="text-2xl font-semibold text-white mb-6">Your Ultimate  Tool for Image and Neural Network Exploration</h2>
                    <h3 className="text-lg text-white mb-8 max-w-[60%] mx-auto font-normal">
                    Unlock the power of deep learning and computer vision with our cutting-edge platform. Whether you're analyzing images, exploring the inner workings of Convolutional Neural Networks (CNNs), or testing various layers for enhanced performance, we provide you with the tools to take your projects to the next level. Seamlessly upload your data, experiment with advanced models, and get real-time insights with a user-friendly interface designed to streamline your workflow. Dive into a world of possibilities, where technology meets simplicity.
                       </h3>
                    <button
                        onClick={() => navigate('/dashboard')}  // Navigate to the dashboard on click
                        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200"
                    >
                        Get Started
                    </button>
                </div>

                {/* Right Section */}
                <div className="relative lg:w-1/2 flex flex-col items-center space-y-8">
                    {/* Bot Image */}
                    <div className="w-80 h-80 lg:w-96 lg:h-96 flex justify-center items-center">
                        <img
                            src={bot}
                            alt="Bot"
                            className="object-contain w-full h-full botImage"
                        />
                    </div>

                    <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                                <img
                                    src={
                                        typingStatus === "Human1"
                                            ? human1
                                            : typingStatus === "Human2"
                                            ? human2
                                            : bot
                                    }
                                    alt="Chat Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <TypeAnimation
                                sequence={[ 
                                    "Pass this image through CNN with kernel",
                                    2000, () => { setTypingStatus("Bot") },
                                    "Bot: Your content is ready!",
                                    2000, () => { setTypingStatus("Human2") },
                                    "Use Multilayer on this image",
                                    2000, () => { setTypingStatus("Bot") },
                                    "Here are the image with operations applied",
                                    2000, () => { setTypingStatus("Human1") },
                                ]}
                                cursor={true}
                                wrapper="span"
                                repeat={Infinity}
                                style={{ color: 'white' }}
                                omitDeletionAnimation={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
