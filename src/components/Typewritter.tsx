import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

export function Typewriter({ text, speed = 50 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        const randomSpeed = speed + Math.random() * speed; // 50-100ms if speed is 50
        timeoutId = setTimeout(typeNextChar, randomSpeed);
        index += 1;
      }
    };

    setDisplayedText('');
    typeNextChar();

    return () => { clearTimeout(timeoutId) };
  }, [text, speed]);

  const className = text == displayedText ? '' : 'typewriter-cursor';

  return <div className={className}>{displayedText}</div>;
}