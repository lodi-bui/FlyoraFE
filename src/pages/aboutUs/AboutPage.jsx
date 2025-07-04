import React from "react";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import teamImg from "../../icons/team.png"; // ảnh đội ngũ
import clientImg from "../../icons/client.png"; // ảnh khách hàng

const AboutPage = () => {
  return (
    <div className="px-4 md:px-16 lg:px-32 py-16 space-y-24 text-gray-800">
      {/* About section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About our store</h2>
          <p className="text-gray-600">
            At et vehicula sodales est proin turpis pellentesque sinulla a
            aliquam amet rhoncus quisque eget sit. Sociis blandit et
            pellentesque aliquet et quisque tortor lacinia nullam.
          </p>
          <p className="text-gray-600">
            Mattis conen scelerisque dui libero cras orci in egestas sagittis.
          </p>
          <div>
            <h3 className="text-xl font-bold text-orange-500">2k+</h3>
            <p className="text-sm">Happy Clients</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 mt-11">
          <p className="text-gray-600">
            Aliquet ultrices risus dolor gravida. Faucibus sodales semper et
            mauris sapien viverra purus sed tortor. Amat risus blandit nunc odio
            rutrum.
          </p>
          <div>
            <h3 className="text-xl font-bold text-orange-500">1.8k+</h3>
            <p className="text-sm">Products</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={teamImg}
          alt="Our Team"
          className="rounded-xl w-full max-w-sm"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 mb-2">
            Nisi nunc vitae integer ridiculus ultrices quam a scelerisque est.
            Sollicitudin volutpat blandit maecenas amet ac dictum tempor.
          </p>
          <p className="text-gray-600">
            Eu orci consectetur etiam bibendum fermentum sed lobortis fringilla
            imperdiet.
          </p>
          <p className="mt-6 italic font-signature">Joshua</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-semibold text-orange-500">Testimonials</p>
          <h2 className="text-2xl font-bold mb-4">What people say about us</h2>
          <div className="flex text-yellow-400 gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-gray-600 mb-4">
            Morbi viverra eleifend in cras orci a leo tellus. Nunc purus
            adipiscing diam aliquet lorem nunc. Ipsum euismod risus amet eget
            non. Aliquet et massa eget vitae justo tellus donec ac enim.
          </p>
          <p className="font-semibold">Gerald Ferguson</p>
          <p className="text-sm text-gray-500">Customer</p>
          <div className="flex gap-2 mt-4">
            <button className="w-8 h-8 rounded-full border text-xl flex items-center justify-center hover:bg-gray-100">
              &#8249;
            </button>
            <button className="w-8 h-8 rounded-full border text-xl flex items-center justify-center hover:bg-gray-100">
              &#8250;
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={clientImg}
            alt="Client"
            className="rounded-full w-56 h-56 object-cover border"
          />
        </div>
      </section>

      {/* Facebook Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Follow our Facebook</h2>

        <a
          href="https://www.facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-full h-64 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center">
            <span className="text-gray-500">
              Click to visit our Facebook page
            </span>
          </div>
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
