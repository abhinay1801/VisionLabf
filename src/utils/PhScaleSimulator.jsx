import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpPHScale from "./help_PHSensor"; 

function PhScaleSimulator() {
    const experimentsData = {
        phScale: {
            id: "ph-scale-simulator",
            title: "pH Scale Simulator",
            theory: `
                The pH scale measures how acidic or basic a substance is, ranging from 0 to 14.
                A pH below 7 indicates acidity, while a pH above 7 indicates alkalinity. The scale
                is logarithmic, meaning each unit represents a tenfold difference in concentration.
            `,
            procedure: [
                "Select a solution to test its pH value.",
                "Use the pH meter or indicator paper to measure the pH.",
                "Observe the color change and match it to the pH scale.",
                "Interpret the pH value to determine if the solution is acidic, neutral, or basic.",
            ],
            animation: "/assets/ph-scale-animation.gif",
            video: "https://www.youtube.com/embed/pHScaleVideo",
            selfEvaluation: [
                "What does a pH of 7 indicate?",
                "How does the pH scale relate to hydrogen ion concentration?",
                "Why is pH important in biological and environmental sciences?",
            ],
            resources: [
                { title: "pH Scale - Khan Academy", link: "https://www.khanacademy.org" },
                { title: "pH - Wikipedia", link: "https://en.wikipedia.org/wiki/PH" },
            ],
            feedback: "Please share your feedback on this simulation!",
        },
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const experiment = experimentsData.phScale;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/chemistry")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Chemistry
            </button>

            <h1 className="text-3xl font-bold text-orange-600 mb-4">{experiment.title}</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b pb-2">
                {["theory", "procedure", "animation", "simulation", "video", "selfEvaluation", "resources", "feedback"].map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    )
                )}
            </div>

            {/* Content */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeTab === "theory" && <p className="text-gray-700">{experiment.theory}</p>}

                {activeTab === "procedure" && (
                    <ul className="list-disc pl-5">
                        {experiment.procedure.map((step, index) => (
                            <li key={index} className="mb-2 text-gray-700">{step}</li>
                        ))}
                    </ul>
                )}

                {activeTab === "animation" && (
                    <img src={experiment.animation} alt="pH Scale Animation" className="rounded-md w-full" />
                )}

                {activeTab === "simulation" && <HelpPHScale/>}

                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="pH Scale Video"
                        className="rounded-md"
                        allowFullScreen
                    ></iframe>
                )}

                {activeTab === "selfEvaluation" && (
                    <ul className="list-disc pl-5">
                        {experiment.selfEvaluation.map((question, index) => (
                            <li key={index} className="mb-2 text-gray-700">{question}</li>
                        ))}
                    </ul>
                )}

                {activeTab === "resources" && (
                    <ul className="list-disc pl-5">
                        {experiment.resources.map((resource, index) => (
                            <li key={index} className="mb-2">
                                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {resource.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === "feedback" && (
                    <div>
                        <p className="text-gray-700 mb-4">{experiment.feedback}</p>
                        <textarea className="w-full border p-3 rounded-md" placeholder="Write your feedback here..."></textarea>
                        <button className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhScaleSimulator;
