import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, ...props }: InputProps) {
  if (label) {
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={id}>{label}</label>
        <input className="form-input" id={id} {...props} />
      </div>
    );
  }
  return <input className="form-input" id={id} {...props} />;
}
