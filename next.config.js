// Images are served by our own backend (GET /api/uploads/:id/raw — bytes
// stored directly in Postgres, see backend/README.md §2.1), not S3/a CDN,
// so next/image needs to be told that host is allowed to optimize from.
// Next.js loads .env(.local) before evaluating this file, so
// NEXT_PUBLIC_API_URL is already available here.
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const parsedApiUrl = new URL(apiUrl);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: parsedApiUrl.protocol.replace(":", ""),
        hostname: parsedApiUrl.hostname,
        port: parsedApiUrl.port || "",
        pathname: `${parsedApiUrl.pathname.replace(/\/$/, "")}/uploads/**`,
      },
    ],
  },
};

module.exports = nextConfig;
