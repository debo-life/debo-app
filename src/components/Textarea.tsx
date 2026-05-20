import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({ label, id, ...props }: TextareaProps) {
  if (label) {
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={id}>{label}</label>
        <textarea className="form-input" id={id} {...props} />
      </div>
    );
  }
  return <textarea className="form-input" id={id} {...props} />;
}
