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

export function WhatsNewSection({
  onNavigate,
}: WhatsNewSectionProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://apcresearch.substack.com/feed"
        );

        const data = await response.json();

        console.log(data.items[0]); // Leave this for now

        const latest = data.items
          .slice(0, 3)
          .map((item: any, index: number) => {
            const html = item.content || item.description || "";

            const imageMatch = html.match(
              /<img[^>]+src=["']([^"']+)["']/i
            );

            const image =
              imageMatch?.[1] ||
              item.thumbnail ||
              "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800";

            return {
              id: index,
              title: item.title,
              date: new Date(item.pubDate).toLocaleDateString(),

              description: html
                .replace(/<[^>]+>/g, "")
                .replace(/\s+/g, " ")
                .substring(0, 170) + "...",

              image,

              link: item.link,
            };
          });

        setPosts(latest);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <section id="research" className="py-20 bg-white">
        <div className="text-center text-gray-500">
          Loading latest research...
        </div>
      </section>
    );
  }

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {posts.map((post) => (

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
