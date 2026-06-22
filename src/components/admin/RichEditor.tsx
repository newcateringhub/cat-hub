"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
} from "lucide-react";

function buttonClass(active: boolean) {
  return `
    h-10 w-10
    flex items-center justify-center
    rounded-lg
    transition-all duration-200

    ${
      active
        ? "bg-[#D4B06A] text-black ring-2 ring-[#E7D2A9] scale-105 shadow-lg"
        : "bg-[#252525] text-zinc-300 hover:bg-[#333] hover:text-white"
    }
  `;
}

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl">

      {/* Toolbar */}
      <div className="bg-[#121212] border-b border-[#2A2A2A] p-3 flex flex-wrap gap-2">

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={buttonClass(editor.isActive("bold"))}
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={buttonClass(editor.isActive("italic"))}
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={buttonClass(
            editor.isActive("underline")
          )}
        >
          <UnderlineIcon size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
          className={buttonClass(editor.isActive("strike"))}
        >
          <Strikethrough size={18} />
        </button>

        <div className="w-px h-10 bg-zinc-700 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 1 })
          )}
        >
          <Heading1 size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 2 })
          )}
        >
          <Heading2 size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 3 })
          )}
        >
          <Heading3 size={18} />
        </button>

        <div className="w-px h-10 bg-zinc-700 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={buttonClass(
            editor.isActive("bulletList")
          )}
        >
          <List size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={buttonClass(
            editor.isActive("orderedList")
          )}
        >
          <ListOrdered size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={buttonClass(
            editor.isActive("blockquote")
          )}
        >
          <Quote size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHighlight().run()
          }
          className={buttonClass(
            editor.isActive("highlight")
          )}
        >
          <Highlighter size={18} />
        </button>

        <div className="w-px h-10 bg-zinc-700 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          className={buttonClass(
            editor.isActive({ textAlign: "left" })
          )}
        >
          <AlignLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          className={buttonClass(
            editor.isActive({ textAlign: "center" })
          )}
        >
          <AlignCenter size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          className={buttonClass(
            editor.isActive({ textAlign: "right" })
          )}
        >
          <AlignRight size={18} />
        </button>

        <div className="w-px h-10 bg-zinc-700 mx-1" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
          className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#252525] text-zinc-300 hover:bg-[#333]"
        >
          <Undo2 size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
          className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#252525] text-zinc-300 hover:bg-[#333]"
        >
          <Redo2 size={18} />
        </button>
      </div>

      {/* Current Style Indicator */}
      <div className="px-6 py-2 border-b border-[#2A2A2A] bg-[#161616] text-xs text-zinc-500 uppercase tracking-widest">
        {editor.isActive("heading", { level: 1 })
          ? "Heading 1"
          : editor.isActive("heading", { level: 2 })
          ? "Heading 2"
          : editor.isActive("heading", { level: 3 })
          ? "Heading 3"
          : "Paragraph"}
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="
          p-10
          min-h-[500px]
          text-zinc-300

          [&_h1]:text-5xl
          [&_h1]:font-heading
          [&_h1]:text-white
          [&_h1]:mt-10
          [&_h1]:mb-6

          [&_h2]:text-4xl
          [&_h2]:font-heading
          [&_h2]:text-[#D4B06A]
          [&_h2]:mt-8
          [&_h2]:mb-5

          [&_h3]:text-3xl
          [&_h3]:font-heading
          [&_h3]:text-white
          [&_h3]:mt-6
          [&_h3]:mb-4

          [&_p]:text-lg
          [&_p]:leading-9
          [&_p]:mb-6

          [&_strong]:text-white
          [&_strong]:font-bold

          [&_ul]:list-disc
          [&_ul]:pl-8
          [&_ul]:mb-6

          [&_ol]:list-decimal
          [&_ol]:pl-8
          [&_ol]:mb-6

          [&_li]:mb-2

          [&_blockquote]:border-l-4
          [&_blockquote]:border-[#D4B06A]
          [&_blockquote]:pl-5
          [&_blockquote]:italic
          [&_blockquote]:text-zinc-400
          [&_blockquote]:my-6

          [&_mark]:bg-yellow-300
          [&_mark]:text-black
          [&_mark]:px-1

          focus:outline-none
        "
      />
    </div>
  );
}