"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const RichEditor = dynamic(
  () => import("@/components/admin/RichEditor"),
  { ssr: false }
);
export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [username, setUsername] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);

const fetchBlogs = async () => {
  const res = await fetch("/api/admin/blogs");

  const data = await res.json();

  setBlogs(data);
};

  const [activeTab, setActiveTab] = useState("leads");

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [notification, setNotification] = useState<{
  type: "success" | "error";
  message: string;
} | null>(null);

  const fetchLeads = async (passToUse = password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/leads?auth=${encodeURIComponent(passToUse)}`
      );

      if (res.status === 401) {
        throw new Error("Invalid Password");
      }

      if (!res.ok) {
        throw new Error("Server Error");
      }

      const data = await res.json();

      setLeads(data);
      setIsAuthorized(true);

      sessionStorage.setItem("admin_auth", passToUse);
    } catch (err: any) {
      setError(err.message);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };
const deleteBlog = async (id: number) => {
  const confirmed = window.confirm(
    "Delete this blog?"
  );

  if (!confirmed) return;

  await fetch(`/api/admin/blogs/${id}`, {
    method: "DELETE",
  });

  fetchBlogs();
};
  const publishBlog = async () => {
  setIsPublishing(true);

  try {
    const url = editingId
      ? `/api/admin/blogs/${editingId}`
      : "/api/admin/blogs";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (!res.ok) {
      throw new Error();
    }

    alert(
      editingId
        ? "Blog updated!"
        : "Blog published!"
    );

    setEditingId(null);

    setBlog({
      title: "",
      category: "",
      excerpt: "",
      content: "",
    });

    fetchBlogs();
  } catch {
    alert("Failed.");
  }

  setIsPublishing(false);
};
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");

if (auth === "authenticated") {
  setIsAuthorized(true);
  fetchLeads(process.env.NEXT_PUBLIC_ADMIN_KEY || "");
  fetchBlogs();
}
  }, []);

  const handleLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const res = await fetch(
      "/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    sessionStorage.setItem(
      "admin_auth",
      "authenticated"
    );

    setIsAuthorized(true);

    fetchLeads(password);
    fetchBlogs();
  } catch {
    setError("Invalid credentials");
  }

  setIsLoading(false);
};

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#111111] border border-[#222] rounded-3xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-3">
              Catering Hub CMS
            </p>

            <h1 className="text-4xl font-heading text-[#D4B06A]">
              Admin Access
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) =>
    setUsername(e.target.value)
  }
  className="
    w-full
    bg-[#181818]
    border
    border-[#2A2A2A]
    text-white
    rounded-xl
    p-4
    focus:outline-none
    focus:border-[#D4B06A]
  "
/>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                bg-[#181818]
                border
                border-[#2A2A2A]
                text-white
                rounded-xl
                p-4
                focus:outline-none
                focus:border-[#D4B06A]
              "
              required
            />

            {error && (
              <p className="text-red-400 text-center text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                bg-[#D4B06A]
                text-black
                py-4
                rounded-xl
                font-semibold
                hover:opacity-90
                transition
              "
            >
              {isLoading ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
      {notification && (
  <div className="fixed top-8 right-8 z-50">
    <div
      className={`px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-md ${
        notification.type === "success"
          ? "bg-green-500/10 border-green-500 text-green-300"
          : "bg-red-500/10 border-red-500 text-red-300"
      }`}
    >
      <div className="flex items-center gap-4">
        <span>{notification.message}</span>

        <button
          onClick={() => setNotification(null)}
          className="text-lg"
        >
          ×
        </button>
      </div>
    </div>
  </div>
)}

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">

          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-3">
              Catering Hub CMS
            </p>

            <h1 className="text-5xl font-heading text-[#D4B06A]">
              Admin Dashboard
            </h1>

            <button
              onClick={() => {
                sessionStorage.removeItem(
  "admin_auth"
);
                window.location.reload();
              }}
              className="mt-3 text-sm text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => setActiveTab("leads")}
              className={`px-6 py-3 rounded-xl transition ${
                activeTab === "leads"
                  ? "bg-[#D4B06A] text-black font-semibold"
                  : "bg-[#181818] text-zinc-400"
              }`}
            >
              Leads
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`px-6 py-3 rounded-xl transition ${
                activeTab === "blogs"
                  ? "bg-[#D4B06A] text-black font-semibold"
                  : "bg-[#181818] text-zinc-400"
              }`}
            >
              Blogs
            </button>

            <button
              onClick={() => fetchLeads()}
              className="
                bg-[#D4B06A]
                text-black
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:opacity-90
              "
            >
              Refresh
            </button>
          </div>
        </div>

        {activeTab === "leads" && (
          <>
            <h2 className="text-2xl font-heading text-[#D4B06A] mb-6">
              Customer Leads
            </h2>

            <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-zinc-800 text-[#D4B06A] uppercase text-xs tracking-widest">
                    <th className="py-5 text-left">Date</th>
                    <th className="py-5 text-left">Phone</th>
                    <th className="py-5 text-left">Catalog</th>
                    <th className="py-5 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-zinc-900 hover:bg-zinc-900 transition"
                    >
                      <td className="py-5 text-zinc-300">
                        {lead.created_at
                          ? new Date(
                              lead.created_at
                            ).toLocaleDateString("en-IN")
                          : "New"}
                      </td>

                      <td className="py-5 font-semibold">
                        {lead.phone}
                      </td>

                      <td className="py-5 text-zinc-400">
                        {lead.catalog_name || "Main Catalog"}
                      </td>

                      <td className="py-5 text-right">
                        <a
                          href={`tel:${lead.phone}`}
                          className="
                            bg-green-600
                            hover:bg-green-500
                            text-white
                            px-5
                            py-2
                            rounded-lg
                            transition
                          "
                        >
                          Call
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </>
        )}

        {activeTab === "blogs" && (
          <>
            <h2 className="text-2xl font-heading text-[#D4B06A] mb-6">
              Create Blog Post
            </h2>

            <div className="bg-[#111111] border border-[#222] rounded-3xl p-10 max-w-5xl space-y-6">

              <input
                value={blog.title}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    title: e.target.value,
                  })
                }
                placeholder="Blog Title"
                className="
                  w-full
                  bg-[#181818]
                  border
                  border-[#2A2A2A]
                  text-white
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:border-[#D4B06A]
                "
              />

              <input
                value={blog.category}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    category: e.target.value,
                  })
                }
                placeholder="Category"
                className="
                  w-full
                  bg-[#181818]
                  border
                  border-[#2A2A2A]
                  text-white
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:border-[#D4B06A]
                "
              />

              <textarea
                rows={3}
                value={blog.excerpt}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    excerpt: e.target.value,
                  })
                }
                placeholder="Excerpt"
                className="
                  w-full
                  bg-[#181818]
                  border
                  border-[#2A2A2A]
                  text-white
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:border-[#D4B06A]
                "
              />

              <div>
  <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-3">
    Blog Content
  </label>

  <RichEditor
    value={blog.content}
    onChange={(value) =>
      setBlog({
        ...blog,
        content: value,
      })
    }
  />
</div>

<div className="flex gap-4">
  <button
    onClick={publishBlog}
    disabled={isPublishing}
    className="
      bg-[#D4B06A]
      text-black
      font-semibold
      px-8
      py-4
      rounded-xl
      hover:opacity-90
      transition
    "
  >
    {isPublishing
      ? "Saving..."
      : editingId
      ? "Update Blog"
      : "Publish Blog"}
  </button>

  {editingId && (
    <button
      onClick={() => {
        setEditingId(null);

        setBlog({
          title: "",
          category: "",
          excerpt: "",
          content: "",
        });
      }}
      className="
        bg-zinc-700
        px-6
        py-4
        rounded-xl
      "
    >
      Cancel
    </button>
  )}
</div>

<div className="mt-16">
  <h2 className="text-3xl font-heading text-[#D4B06A] mb-6">
    Existing Blogs
  </h2>

  <div className="space-y-4">
    {blogs.map((item) => (
      <div
        key={item.id}
        className="
          bg-[#181818]
          border
          border-[#2A2A2A]
          rounded-2xl
          p-6
          flex
          justify-between
          items-center
        "
      >
        <div>
          <h3 className="text-xl font-semibold">
            {item.title}
          </h3>

          <p className="text-zinc-500">
            {item.category}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingId(item.id);

              setBlog({
                title: item.title,
                category: item.category,
                excerpt: item.excerpt,
                content: item.content,
              });
            }}
            className="
              bg-[#D4B06A]
              text-black
              px-5
              py-2
              rounded-lg
              font-semibold
            "
          >
            Edit
          </button>

          <button
            onClick={() => deleteBlog(item.id)}
            className="
              bg-red-600
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}