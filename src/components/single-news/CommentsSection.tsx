import React from "react";
import { Link } from "react-router-dom";

const CommentsSection: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="mb-2 border-b border-gray-300">
        <h4 className="uppercase font-bold text-gray-800 m-0">3 Comments</h4>
      </div>
      <div className="bg-white border border-t-0 p-6 rounded-md shadow-sm">
        {/* Comment 1 */}
        <div className="flex mb-6">
          <img
            src="/img/user.jpg"
            alt="User"
            className="w-11 h-11 rounded-full mr-4 mt-1 object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h6 className="text-gray-700 font-semibold mb-1">
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                John Doe
              </Link>{" "}
              <small className="italic text-gray-500">01 Jan 2045</small>
            </h6>
            <p className="text-gray-700 mb-3">
              Diam amet duo labore stet elitr invidunt ea clita ipsum voluptua,
              tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna
              dolores sed sed eirmod ipsum.
            </p>
            <button className="text-sm border border-gray-400 text-gray-600 px-3 py-1 rounded hover:bg-gray-100 transition">
              Reply
            </button>
          </div>
        </div>

        {/* Comment 2 */}
        <div className="flex">
          <img
            src="/img/user.jpg"
            alt="User"
            className="w-11 h-11 rounded-full mr-4 mt-1 object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h6 className="text-gray-700 font-semibold mb-1">
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                John Doe
              </Link>{" "}
              <small className="italic text-gray-500">01 Jan 2045</small>
            </h6>
            <p className="text-gray-700 mb-3">
              Diam amet duo labore stet elitr invidunt ea clita ipsum voluptua,
              tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna
              dolores sed sed eirmod ipsum.
            </p>
            <button className="text-sm border border-gray-400 text-gray-600 px-3 py-1 rounded hover:bg-gray-100 transition">
              Reply
            </button>

            {/* Nested Comment */}
            <div className="flex mt-6 ml-12">
              <img
                src="/img/user.jpg"
                alt="User"
                className="w-11 h-11 rounded-full mr-4 mt-1 object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h6 className="text-gray-700 font-semibold mb-1">
                  <Link to="#" className="text-gray-600 hover:text-gray-800">
                    John Doe
                  </Link>{" "}
                  <small className="italic text-gray-500">01 Jan 2045</small>
                </h6>
                <p className="text-gray-700 mb-3">
                  Diam amet duo labore stet elitr invidunt ea clita ipsum
                  voluptua, tempor labore accusam ipsum et no at. Kasd diam
                  tempor rebum magna dolores sed sed eirmod ipsum.
                </p>
                <button className="text-sm border border-gray-400 text-gray-600 px-3 py-1 rounded hover:bg-gray-100 transition">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
