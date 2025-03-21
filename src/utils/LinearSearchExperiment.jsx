import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpLinearSearch from "./help_LinearSearch";
import ChatInterface from "./ChatAi";

function LinearSearchExperiment() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    const experiment = {
        title: "Linear Search Simulator",
        theory: (
            <>
                <h2 className="text-xl font-bold mt-4">Aim</h2>
                <p>To understand and implement the Linear Search algorithm.</p>

                <h2 className="text-xl font-bold mt-4">Theory</h2>
                <p>
                    <strong>Definition:</strong> Linear search, also known as sequential search, is a simple searching algorithm used to find the position of a target element in a list or array. It works by checking each element sequentially until the desired element is found or the end of the list is reached.
                </p>
                <p>
                    <strong>Working of Linear Search:</strong>
                </p>
                <ol className="list-decimal pl-5">
                    <li>Start from the first element of the array.</li>
                    <li>Compare the target element with the current element.</li>
                    <li>If a match is found, return the index of the element.</li>
                    <li>If no match is found, move to the next element.</li>
                    <li>Repeat steps 2–4 until the element is found or the end of the array is reached.</li>
                    <li>If the element is not present in the array, return -1.</li>
                </ol>
                <p>
                    <strong>Algorithm (Pseudo Code):</strong>
                </p>
                <ul className="list-disc pl-5 bg-gray-200 p-2 rounded-md">
                    <li>
                        <pre className="bg-gray-100 p-2 rounded">
                            <code>
                                {`function LinearSearch(arr, target) {`}
                                {"\n    for (let i = 0; i < arr.length; i++) {"}
                                {"\n        if (arr[i] === target) {"}
                                {"\n            return i; // Target found at index i"}
                                {"\n        }"}
                                {"\n    }"}
                                {"\n    return -1; // Target not found"}
                                {"\n}"}
                            </code>
                        </pre>
                    </li>
                </ul>
                <p>
                    <strong>Time Complexity:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>Best Case: O(1) - When the element is found at the first position.</li>
                    <li>Worst Case: O(n) - When the element is not in the array, or it is found at the last position.</li>
                    <li>Average Case: O(n) - When the element is found somewhere in the middle.</li>
                </ul>
                <p>
                    <strong>Space Complexity:</strong> O(1) (Constant space) because the search is done in place without using extra memory.
                </p>
                <p>
                    <strong>Advantages:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>Simple to implement.</li>
                    <li>Works for both sorted and unsorted lists.</li>
                    <li>No additional memory is required.</li>
                </ul>
                <p>
                    <strong>Disadvantages:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>Inefficient for large datasets.</li>
                    <li>Slower compared to binary search for sorted data.</li>
                </ul>
                <p>
                    <strong>Use Cases:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>When the dataset is small.</li>
                    <li>When the list is unsorted.</li>
                    <li>When frequent insertions and deletions occur, making sorting impractical.</li>
                </ul>
            </>
        ),
        procedure: [
            "Initialize the search by setting an index variable to the first element of the array.",
            "Iterate through each element of the array.",
            "Compare the current element with the target element.",
            "If a match is found, return the index of the element and terminate the search.",
            "If no match is found, continue checking the next element.",
            "If the end of the array is reached and the element is not found, return -1.",
            "End the search."
      ],
        queries: "/assets/linear-search-animation.gif",
        video: "https://www.youtube.com/embed/246V51AWwZM",
        resources: [
            { title: "Linear Search - GeeksforGeeks", link: "https://www.geeksforgeeks.org/linear-search/" },
            { title: "Linear Search - Wikipedia", link: "https://en.wikipedia.org/wiki/Linear_search" },
        ],
        feedback: "Please share your feedback on this simulation!",
    };

    const sendFeedback = (e) => {
        e.preventDefault();
        if (!feedback.trim()) {
            setMessage("Please enter your feedback before submitting.");
            return;
        }

        emailjs
            .send("service_0updalp", "template_gga1aol", {
                user_name: "Administrator",
                user_email: "your-email@example.com",
                from_name: "Vision Lab Experiment - Linear Search Simulator",
                message: feedback,
            }, "eQ_JCPczgpDZ1uk7d")
            .then(() => {
                setMessage("Thank you for your feedback!");
                setFeedback("");
            })
            .catch(() => setMessage("Error sending feedback. Please try again."));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/computerscience")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Computer Science
            </button>
            <h1 className="text-3xl font-bold text-orange-600 mb-4">
                {experiment.title}
            </h1>
            <div className="flex gap-4 mb-6 border-b pb-2">
                {["theory", "procedure", "queries", "simulation", "video", "resources", "feedback"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeTab === "theory" && <div>{experiment.theory}</div>}
                {activeTab === "procedure" && (
                    <ol className="list-decimal pl-5">
                        {experiment.procedure.map((step, index) => (
                            <li key={index} className="mb-2">{step}</li>
                        ))}
                    </ol>
                )}
                {activeTab === "queries" && <ChatInterface experiment="linear search" />}
                {activeTab === "simulation" && <HelpLinearSearch />}
                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="Linear Search Video"
                        className="rounded-md"
                        allowFullScreen
                    ></iframe>
                )}
                {activeTab === "resources" && (
                    <ul className="list-disc pl-5">
                        {experiment.resources.map((res, i) => (
                            <li key={i}>
                                <a
                                    href={res.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {res.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
                {activeTab === "feedback" && (
                    <div>
                        <p className="text-gray-700 mb-4">{experiment.feedback}</p>
                        <textarea
                            className="w-full border p-3 rounded-md"
                            placeholder="Write your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                        <button
                            onClick={sendFeedback}
                            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                        {message && <p className="mt-4 text-green-600">{message}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LinearSearchExperiment;