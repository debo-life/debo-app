import { useCallback, useRef, useEffect } from "react";
import type { Value } from "platejs";
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  BlockquotePlugin,
} from "@platejs/basic-nodes/react";
import {
  BulletedListPlugin,
  NumberedListPlugin,
  ListItemPlugin,
} from "@platejs/list-classic/react";
import { LinkPlugin } from "@platejs/link/react";
import { Plate, usePlateEditor, PlateContent } from "platejs/react";

interface PlateEditorProps {
  initialValue?: unknown;
  onChange?: (content: unknown, plainText: string, wordCount: number) => void;
  placeholder?: string;
}

function countWords(text: string): number {
  if (!text) return 0;
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

function getPlainText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  const lines: string[] = [];
  for (const node of value) {
    if (node && typeof node === "object" && "children" in node) {
      for (const child of (node as { children: unknown[] }).children) {
        if (child && typeof child === "object" && "text" in child) {
          lines.push((child as { text: string }).text);
        }
      }
      lines.push("\n");
    }
  }
  return lines.join("").trim();
}

export default function PlateEditor({
  initialValue,
  onChange,
  placeholder = "Start writing...",
}: PlateEditorProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const defaultValue: Value = [
    { type: "p", children: [{ text: "" }] },
  ];

  const parsedInitial = useCallback((): Value => {
    if (initialValue && Array.isArray(initialValue)) {
      return initialValue as Value;
    }
    return defaultValue;
  }, [initialValue]);

  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      H1Plugin,
      H2Plugin,
      H3Plugin,
      BlockquotePlugin,
      BulletedListPlugin,
      NumberedListPlugin,
      ListItemPlugin,
      LinkPlugin,
    ],
    value: parsedInitial,
  });

  const handleChange = useCallback(
    ({ value }: { value: Value }) => {
      if (!onChange) return;

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const plainText = getPlainText(value);
        const wordCount = countWords(plainText);
        onChange(value, plainText, wordCount);
      }, 300);
    },
    [onChange]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="plate-editor">
      <Plate editor={editor} onChange={handleChange}>
        <EditorToolbar editor={editor} />
        <PlateContent
          placeholder={placeholder}
          style={{
            minHeight: 400,
            outline: "none",
            fontSize: 16,
            lineHeight: 1.75,
          }}
        />
      </Plate>
    </div>
  );
}

function EditorToolbar({ editor }: { editor: ReturnType<typeof usePlateEditor> }) {
  const toggleMark = (type: string) => {
    editor?.tf.toggle.mark({ key: type });
  };

  const toggleBlock = (type: string) => {
    editor?.tf.toggle.block({ type });
  };

  return (
    <div className="editor-toolbar">
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleBlock("h1")}
        title="Heading 1"
      >
        <strong>H1</strong>
      </button>
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleBlock("h2")}
        title="Heading 2"
      >
        <strong>H2</strong>
      </button>
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleBlock("h3")}
        title="Heading 3"
      >
        <strong>H3</strong>
      </button>
      <div className="editor-toolbar-separator" />
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleMark("bold")}
        title="Bold (⌘B)"
      >
        <strong>B</strong>
      </button>
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleMark("italic")}
        title="Italic (⌘I)"
      >
        <em>I</em>
      </button>
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleMark("underline")}
        title="Underline (⌘U)"
      >
        <u>U</u>
      </button>
      <div className="editor-toolbar-separator" />
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleBlock("blockquote")}
        title="Quote"
      >
        &ldquo;
      </button>
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleBlock("ul")}
        title="Bullet List"
      >
        &bull;
      </button>
      <button
        className="editor-toolbar-btn"
        onClick={() => toggleBlock("ol")}
        title="Numbered List"
      >
        1.
      </button>
    </div>
  );
}
