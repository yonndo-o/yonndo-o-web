import { useEffect, useRef } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  name?: string;
}

export default function AutoResizeTextarea({ value, onChange, placeholder, name }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (name === 'content' && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      const lineHeight = 24;
      const extraLines = 2;
      const newHeight = el.scrollHeight + lineHeight * extraLines;
      el.style.height = `${newHeight}px`;
    }
  }, [value, name]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      name={name}
      style={{ resize: 'none', overflow: 'hidden' }}
    />
  );
}
