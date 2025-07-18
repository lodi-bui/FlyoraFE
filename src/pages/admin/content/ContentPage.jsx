import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import Sidebar from "../sidebar/Sidebar";
import { createNewsBlogSalesPost } from "api/NewsBlogSales";

import toast from "react-hot-toast";
const ContentPage = () => {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const requesterId = localStorage.getItem("linkedId");

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!title.trim() || !url.trim()) {
            toast.error("Please enter both title and URL.");
            return;
        }
        try {
            const response = await createNewsBlogSalesPost(requesterId, { title, url });
            toast.success("News/Blog post created successfully!");
            setUrl("");
            setTitle("");
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
            toast.error(`Failed to create news/blog post: ${error.response?.data?.message || error.message}`);

        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-900">Update News/Blog</h1>
                        </div>

                        {/* Search */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            {/* User Profile */}                        
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                        alt="User" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Johndoe</div>
                                    <div className="text-xs text-gray-500">Super Admin</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Content */}
                <main className="flex-1 p-4 flex justify-center items-center">
                    <div className="bg-white rounded-[20px] shadow p-6 w-full max-w-lg">
                        <form onSubmit={handleCreatePost} className="space-y-8">
                            <div className="flex items-center space-x-2">
                                <label className="block text-lg font-medium text-gray-700 w-10">URL</label>
                                <input

                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Enter here"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-200 text-gray-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="block text-lg font-medium text-gray-700 w-10">Title</label>
                                <input

                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter here"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-200 text-gray-500 focus:outline-none"
                                    required

                                />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm flex items-center justify-center">
                                    <Plus className="w-4 h-4 mr-1" />
                                    Create
                                </button>  
                            </div>
                        </form>                             
                    </div>
                </main>                
            </div>
        </div>
    );
}
export default ContentPage;