import React from "react";
import { newsBlogSalesPosts } from "../../api/NewsBlogSales";

const NewsBlogSalesSection = () => {
  // BlogCard lồng bên trong file
  const BlogCard = ({ post }) => (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition w-full max-w-[340px] aspect-[4/3] overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-3/5 object-cover"
        />
        <div className="p-4 flex-grow flex flex-col justify-start">
          <h3 className="text-base font-semibold leading-snug">{post.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{post.description}</p>
        </div>
      </div>
    </a>
  );

  // SectionTitle lồng bên trong file
  const SectionTitle = ({ title }) => (
    <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
  );

  return (
    <section className="py-10 px-8 bg-white">
      <SectionTitle title="News & Blog & Sales" />
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {newsBlogSalesPosts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
    </section>
  );
};
export default NewsBlogSalesSection;
