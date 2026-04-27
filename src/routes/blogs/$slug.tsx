import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, User, Share2, Heart, MessageCircle } from "lucide-react";
import { getBlogBySlug, blogs, type Blog } from "@/lib/blogs";
import { Badge } from "@/components/ui/badge";
import { notFound } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    const blog = getBlogBySlug(params.slug);
    if (!blog) throw notFound();
    return blog;
  },
  head: (context) => {
    const blog = context.loaderData as ReturnType<typeof getBlogBySlug>;
    return {
      meta: [
        { title: `${blog?.title || "Blog"} — Globo Traveller` },
        { name: "description", content: blog?.excerpt || "" },
        { property: "og:image", content: blog?.image || "" },
      ],
    };
  },
  component: BlogDetail,
});

function BlogDetail() {
  const blog = Route.useLoaderData();
  const [liked, setLiked] = useState(false);
  
  // Get related blogs (same category, excluding current)
  const relatedBlogs = blogs
    .filter((b: Blog) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div>
      {/* Header Navigation */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-3 md:px-8 flex items-center justify-between">
          <Link to="/blogs" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Share2 className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Blog Hero */}
      <section>
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
        </div>
      </section>

      {/* Blog Content */}
      <article className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        {/* Category & Meta */}
        <div className="mb-8">
          <Badge className="mb-4 capitalize">{blog.category.replace("-", " ")}</Badge>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">{blog.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{blog.excerpt}</p>
        </div>

        {/* Author & Meta Info */}
        <div className="flex flex-wrap gap-6 border-y border-border py-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold">{blog.author}</p>
              <p className="text-xs text-muted-foreground">{blog.authorRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{blog.readingTime} min read</span>
          </div>
        </div>

        {/* Rich Content */}
        <div className="prose prose-sm md:prose-base max-w-none py-10">
          {blog.content.split("\n\n").map((paragraph: string, idx: number) => {
            if (paragraph.startsWith("##")) {
              return (
                <h2 key={idx} className="mt-10 mb-4 font-display text-2xl font-bold text-foreground">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("**") && paragraph.includes(":")) {
              const parts = paragraph.split(": ");
              return (
                <p key={idx} className="mb-3 leading-relaxed">
                  <strong className="text-foreground">{parts[0].replace(/\*\*/g, "")}:</strong>{" "}
                  <span className="text-muted-foreground">{parts.slice(1).join(": ")}</span>
                </p>
              );
            }
            if (paragraph.startsWith("1.") || paragraph.match(/^\d+\./)) {
              return (
                <ol key={idx} className="list-decimal list-inside mb-6 space-y-2 text-muted-foreground">
                  {paragraph.split("\n").map((item: string, i: number) => (
                    <li key={i} className="leading-relaxed">{item.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="mb-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="border-t border-border pt-8 mt-8">
          <p className="mb-3 text-sm font-semibold">Tags</p>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Engagement Footer */}
        <div className="flex items-center gap-6 border-t border-border pt-8 mt-8">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-sm">{liked ? "Liked" : "Like"}</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">Comment</span>
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
            <Share2 className="h-5 w-5" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-secondary/40 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="font-display text-2xl font-extrabold mb-8">More from {blog.category.replace("-", " ")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((relatedBlog: Blog) => (
                <button
                  key={relatedBlog.slug}
                  onClick={() => window.location.href = `/blogs/${relatedBlog.slug}`}
                  className="group text-left overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-2 capitalize">
                      {relatedBlog.category.replace("-", " ")}
                    </p>
                    <h3 className="font-display font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {relatedBlog.readingTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(relatedBlog.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <h2 className="font-display text-2xl font-extrabold">Ready for your next adventure?</h2>
          <p className="mt-3 text-muted-foreground">Explore our curated trips and turn these stories into your own memories.</p>
          <Link
            to="/trips"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            Browse trips
          </Link>
        </div>
      </section>
    </div>
  );
}
