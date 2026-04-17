"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
// import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { 
  LuBold, 
  LuItalic, 
  LuUnderline, 
  LuList, 
  LuListOrdered, 
  LuQuote, 
  LuHeading1, 
  LuHeading2, 
  LuLink, 
  LuUndo, 
  LuRedo,
  LuCode
} from "react-icons/lu";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const buttons = [
    {
      icon: <LuBold />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <LuItalic />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: <LuUnderline />,
      title: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive("underline"),
    },
    {
      icon: <LuHeading1 />,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <LuHeading2 />,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <LuList />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: <LuListOrdered />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: <LuQuote />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: <LuCode />,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      icon: <LuLink />,
      title: "Link",
      action: setLink,
      isActive: () => editor.isActive("link"),
    },
    {
      icon: <LuUndo />,
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
      isActive: () => false,
    },
    {
      icon: <LuRedo />,
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
      isActive: () => false,
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-[#F0F0F0] bg-[#FCFCFC]">
      {buttons.map((btn, i) => (
        <button
          key={i}
          type="button"
          onClick={btn.action}
          title={btn.title}
          className={`p-2 rounded-lg transition-all ${
            btn.isActive() 
              ? "bg-[#33187F] text-white shadow-sm" 
              : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#262626]"
          }`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export default function TiptapEditor({ content, onChange, placeholder = "Write your content here..." }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      // TextStyle,
      Color,
      Placeholder.configure({
        placeholder,
      }),
    ],
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[300px] px-5 py-4 text-[#262626]",
      },
    },
  });

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#33187F]/20 focus-within:bg-white transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
