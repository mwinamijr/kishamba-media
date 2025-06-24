import React from "react";

const NewsletterSubscription: React.FC = () => {
  return (
    <div className="pb-4 mb-4 border-b border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <p className="text-white text-4xl font-semibold mb-0">
            Kishamba Media
          </p>
          <small className="text-gray-300 tracking-[11px] leading-none">
            Newspaper
          </small>
        </div>
        <div className="lg:col-span-2">
          <div className="relative rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-3 pl-4 pr-32 rounded-full border-none focus:outline-none text-black"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 h-full px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
