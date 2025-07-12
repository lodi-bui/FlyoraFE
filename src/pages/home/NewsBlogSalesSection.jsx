import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsBlogSalesSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://flyora-backend.onrender.com/api/v1/news");
        const data = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          link: item.url,
          createdAt: item.createdAt,
          image: item.imageUrl || `https://source.unsplash.com/400x300/?bird,news,${item.id}` // fallback
        }));
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, []);

  const BlogCard = ({ post }) => (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition w-[300px] flex-shrink-0 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[180px] object-cover"
        />
        <div className="p-4 flex-grow flex flex-col justify-start">
          <h3 className="text-base font-semibold leading-snug line-clamp-2">{post.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </a>
  );

  const SectionTitle = ({ title }) => (
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
  );

  return (
    <section className="py-10 px-6 bg-white">
      <SectionTitle title="Tin tức nổi bật" />
      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-6 w-max pb-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsBlogSalesSection;
