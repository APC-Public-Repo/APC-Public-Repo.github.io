import { useState, useEffect } from "react";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { PageType } from "../types/navigation";

interface WhatsNewSectionProps {
  onNavigate: (page: PageType) => void;
}

interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

type FeedState =
  | { status: "loading" }
  | { status: "ready"; posts: Post[] }
  | { status: "error" };

const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://apcresearch.substack.com/feed";

const BLOG_URL = "https://apcresearch.substack.com";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800";

// Feed titles arrive HTML-escaped, so "&amp;" has to become "&" before render.
const decodeEntities = (text: string) =>
  new DOMParser().parseFromString(text, "text/html").documentElement
    .textContent ?? text;

function toPost(item: any, index: number): Post {
  const html = item.content || item.description || "";
  const imageMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);

  return {
    id: index,
    title: decodeEntities(item.title ?? ""),
    date: new Date(item.pubDate).toLocaleDateString(),
    description:
      decodeEntities(html.replace(/<[^>]+>/g, ""))
        .replace(/\s+/g, " ")
        .substring(0, 170) + "...",
    image: imageMatch?.[1] || item.thumbnail || FALLBACK_IMAGE,
    link: item.link,
  };
}

export function WhatsNewSection({
  onNavigate,
}: WhatsNewSectionProps) {
  const [feed, setFeed] = useState<FeedState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        const response = await fetch(FEED_URL);

        if (!response.ok) {
          throw new Error(`feed responded ${response.status}`);
        }

        const data = await response.json();
        const items = Array.isArray(data.items) ? data.items : [];

        if (items.length === 0) {
          throw new Error("feed returned no items");
        }

        if (active) {
          setFeed({
            status: "ready",
            posts: items.slice(0, 3).map(toPost),
          });
        }
      } catch (error) {
        console.error("Substack feed unavailable:", error);
        if (active) setFeed({ status: "error" });
      }
    }

    loadPosts();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="research" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            What's New
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest posts from APC Research
          </p>
        </div>

        {feed.status === "loading" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[0, 1, 2].map((slot) => (
              <div
                key={slot}
                className="bg-white border-t-4 border-[#de1f1f] rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-24 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-6 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
                  <div className="h-16 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {feed.status === "error" && (
          <div className="mb-12 max-w-xl mx-auto text-center bg-[#F0F6FF] border border-[#2D9CDB]/20 rounded-xl p-8">
            <p className="text-[#1E3A5F] font-semibold mb-2">
              The post feed is not reachable right now.
            </p>

            <p className="text-gray-600 text-sm mb-5">
              Our writing lives on Substack and stays available there.
            </p>

            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2D9CDB] text-white rounded-full text-sm font-semibold hover:bg-[#1E3A5F] transition-colors"
            >
              Read on Substack
              <ArrowRight size={16} />
            </a>
          </div>
        )}

        {feed.status === "ready" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            {feed.posts.map((post) => (

              <div
                key={post.id}
                onClick={() => window.open(post.link, "_blank")}
                className="group bg-white border-t-4 border-[#de1f1f] rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 cursor-pointer"
              >

                <div className="relative h-48 overflow-hidden">

                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

                    <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 shadow">

                      <BookOpen
                        size={14}
                        className="text-[#2D9CDB]"
                      />

                      <span className="text-xs font-bold text-[#1E3A5F]">
                        Read Article
                      </span>

                    </div>

                  </div>

                </div>

                <div className="p-6">

                  <div className="inline-block mb-3 px-3 py-1 bg-[#F0F6FF] text-[#2D9CDB] rounded-full text-xs font-medium">
                    Substack
                  </div>

                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-3 group-hover:text-[#2D9CDB] transition-colors">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar size={14} />
                    {post.date}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-4 mb-6">
                    {post.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(post.link, "_blank");
                    }}
                    className="inline-flex items-center gap-2 text-[#2D9CDB] hover:text-[#1E3A5F] font-medium"
                  >
                    Read Article
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

        <div className="text-center">

          <button
            onClick={() => onNavigate("news")}
            className="px-8 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#2D9CDB] transition-colors duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            View All News
            <ArrowRight size={20} />
          </button>

        </div>

      </div>
    </section>
  );
}
