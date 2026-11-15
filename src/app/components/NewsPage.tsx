import { useEffect } from "react";

const BLOG_URL = "https://apcresearch.substack.com/";

export function NewsPage() {
  useEffect(() => {
    // replace, not assign: Back then returns to the previous APC page
    // instead of landing here and redirecting again.
    window.location.replace(BLOG_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D9CDB] mx-auto mb-6"></div>

        <h2 className="text-2xl font-bold text-[#1E3A5F] mb-2">
          Redirecting
        </h2>

        <p className="text-gray-500">
          Taking you to the APC Research Blog.
        </p>

        <a
          href={BLOG_URL}
          className="inline-block mt-5 text-[#2D9CDB] font-medium hover:underline"
        >
          Open the blog now
        </a>
      </div>
    </div>
  );
}
