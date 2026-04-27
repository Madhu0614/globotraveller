import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Calendar, Clock, Bookmark, Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { blogs, type Blog } from "@/lib/blogs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Travel Blog — Globo Traveller" },
      { name: "description", content: "Read travel stories, tips, destination guides, and community experiences from Globo Traveller." },
    ],
  }),
  component: BlogsPage,
});

type BlogCategory = Blog["category"];

function BlogsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Derive categories dynamically from blogs data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogs.map((b: Blog) => b.category))) as BlogCategory[];
    return [
      { value: "all" as const, label: "All" },
      ...uniqueCategories.map((value: BlogCategory) => ({ value, label: value.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) })),
    ];
  }, []);

  // Filter and search logic
  const filteredBlogs = useMemo(() => {
    let result = blogs;
    if (selectedCategory !== "all") {
      result = result.filter((blog: Blog) => blog.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (blog: Blog) => blog.title.toLowerCase().includes(lowerQuery) ||
                  blog.excerpt.toLowerCase().includes(lowerQuery) ||
                  blog.author.toLowerCase().includes(lowerQuery)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Stories & Insights</p>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            Travel Stories & Practical Tips
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground leading-relaxed">
            Discover travel guides, destination stories, and insights from our community. Learn from experienced travellers and local experts.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6 lg:mb-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                  selectedCategory === cat.value
                    ? "bg-primary text-primary-foreground shadow-primary/25"
                    : "border border-border bg-card hover:bg-accent hover:border-primary/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs by title, author..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 pb-24">
        {filteredBlogs.length > 0 ? (
          <>
            {/* Featured Blog */}
            <div className="mb-12">
              <button
                onClick={() => navigate({ to: `/blogs/$slug`, params: { slug: filteredBlogs[0].slug } })}
                className="group relative block w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer text-left"
              >
                <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
                <div className="relative grid h-96 md:grid-cols-2 md:h-112.5">
                  <div className="overflow-hidden">
                    <img
                      src={filteredBlogs[0].image}
                      alt={filteredBlogs[0].title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="eager"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-8 lg:p-12">
                    <div>
                      <Badge className="mb-4 bg-secondary" variant="secondary">
                        Featured
                      </Badge>
                      <h2 className="font-display text-3xl font-black text-foreground group-hover:text-primary transition-colors lg:text-4xl">
                        {filteredBlogs[0].title}
                      </h2>
                      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{filteredBlogs[0].excerpt}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(filteredBlogs[0].date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {filteredBlogs[0].readingTime} min read
                      </div>
                      <div className="text-sm font-semibold text-primary ml-auto">By {filteredBlogs[0].author}</div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Blog Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.slice(1).map((blog: Blog) => (
                <button
                  key={blog.slug}
                  onClick={() => navigate({ to: `/blogs/$slug`, params: { slug: blog.slug } })}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-2 cursor-pointer text-left"
                >
                  <div className="aspect-4/3 overflow-hidden rounded-xl bg-muted mb-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <Badge variant="outline" className="mb-3 w-fit text-xs capitalize">
                    {blog.category.replace("-", " ")}
                  </Badge>
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="grow text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blog.readingTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <Bookmark className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">No blogs found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search or category filter. New stories are added regularly.
            </p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-linear-to-r from-primary/5 to-primary/10 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl mb-4">Get travel stories in your inbox</h2>
          <p className="mx-auto max-w-lg text-xl text-muted-foreground mb-8 leading-relaxed">
            Subscribe to receive curated travel tips, destination guides, and exclusive community stories.
          </p>
          <div className="flex w-full max-w-md flex-col gap-3 mx-auto sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 text-lg"
            />
            <button className="h-12 rounded-xl bg-primary px-8 py-3 font-semibold text-lg text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
