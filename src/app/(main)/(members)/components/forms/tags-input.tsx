import React from "react";
import { XIcon } from "lucide-react";
import { z } from "zod";

interface EmailTagsInputProps {
  value: string[];
  onChange: (emails: string[]) => void;
  disabled?: boolean;
}

export function EmailTagsInput({
  value,
  onChange,
  disabled,
}: EmailTagsInputProps) {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const addEmail = (email: string) => {
    const trimmed = email.trim();
    if (trimmed && !value.includes(trimmed)) {
      try {
        // Validate email using the same schema as the form
        z.string().email().parse(trimmed);
        onChange([...value, trimmed]);
        setError(null);
      } catch {
        setError("Please enter a valid email address");
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (["Enter", ",", " "].includes(e.key)) {
      e.preventDefault();
      if (input.trim()) {
        addEmail(input);
        setInput("");
      }
    } else if (e.key === "Backspace" && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const removeEmail = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-wrap items-start gap-2 bg-dark-gray rounded-md px-2 py-1 min-h-[40px] w-full">
      {value.map((email, idx) => (
        <span
          key={email}
          className="flex items-center gap-2	 bg-white/10 text-white rounded px-2 py-1 text-sm"
        >
          {email}
          <button
            type="button"
            className="gap-1 flex text-xs text-gray-300 hover:text-red-400 focus:outline-none"
            onClick={() => removeEmail(idx)}
            disabled={disabled}
            aria-label={`Remove ${email}`}
          >
            <XIcon className="w-3 h-3" />
          </button>
        </span>
      ))}
      <textarea
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (input.trim()) {
            addEmail(input);
            setInput("");
          }
        }}
        className="bg-transparent outline-none text-white flex-1 min-w-[120px] py-1"
        placeholder={
          value.length === 0
            ? "example@email.com, example2@email.com"
            : "Add more..."
        }
        disabled={disabled}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
} 