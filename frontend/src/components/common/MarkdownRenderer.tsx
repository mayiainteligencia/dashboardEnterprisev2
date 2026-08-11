import React from 'react';
import { brandingConfig } from '../../config/branding';

const { colores } = brandingConfig;

interface MarkdownRendererProps {
  content: string;
  isUser?: boolean;
  accentColor?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isUser = false,
  accentColor = '#10B981',
}) => {
  if (!content) return null;

  // Function to format inline styles (bold, italics, code)
  const formatInlineText = (text: string) => {
    const parts: React.ReactNode[] = [];
    let keyIdx = 0;

    // Pattern for **bold**, *italic*, `code`
    const regex = /(\*\*.+?\*\*|__[\s\S]+?__|`[^`]+`|\*[^*]+\*|_[^_]+_)/g;
    const splitText = text.split(regex);

    splitText.forEach((part) => {
      if (!part) return;

      if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
        const raw = part.slice(2, -2);
        parts.push(
          <strong key={keyIdx++} style={{ fontWeight: 700, color: isUser ? '#FFFFFF' : colores.textoClaro }}>
            {raw}
          </strong>
        );
      } else if (part.startsWith('`') && part.endsWith('`')) {
        const raw = part.slice(1, -1);
        parts.push(
          <code
            key={keyIdx++}
            style={{
              background: isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
              color: isUser ? '#FFFFFF' : accentColor,
              padding: '2px 6px',
              borderRadius: 4,
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            {raw}
          </code>
        );
      } else if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
        const raw = part.slice(1, -1);
        parts.push(<em key={keyIdx++}>{raw}</em>);
      } else {
        parts.push(part);
      }
    });

    return parts;
  };

  // Split lines into blocks
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = (listKey: string) => {
    if (listItems.length > 0) {
      blocks.push(
        <ul
          key={listKey}
          style={{
            margin: '6px 0 10px 0',
            paddingLeft: '0',
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(`list-${index}`);
      return;
    }

    // Headers (# Header, ## Header, ### Header)
    if (trimmed.startsWith('#')) {
      flushList(`list-${index}`);
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      const headerText = trimmed.replace(/^#+\s*/, '');
      const fontSize = level === 1 ? '16px' : level === 2 ? '15px' : '14px';

      blocks.push(
        <h4
          key={`header-${index}`}
          style={{
            margin: '12px 0 6px 0',
            fontSize,
            fontWeight: 800,
            color: isUser ? '#FFFFFF' : colores.textoClaro,
            letterSpacing: '-0.2px',
          }}
        >
          {formatInlineText(headerText)}
        </h4>
      );
      return;
    }

    // Bullet points (• item, - item, * item)
    if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.replace(/^(•|\-|\*)\s*/, '');
      listItems.push(
        <li
          key={`item-${index}`}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            fontSize: '13.5px',
            lineHeight: '1.5',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isUser ? '#FFFFFF' : accentColor,
              marginTop: '7px',
              flexShrink: 0,
            }}
          />
          <span>{formatInlineText(itemText)}</span>
        </li>
      );
      return;
    }

    // Numbered list (1. item, 2. item)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const num = numMatch[1];
      const itemText = numMatch[2];
      listItems.push(
        <li
          key={`num-item-${index}`}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            fontSize: '13.5px',
            lineHeight: '1.5',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '18px',
              height: '18px',
              borderRadius: '50%',
              background: isUser ? 'rgba(255,255,255,0.25)' : `${accentColor}20`,
              color: isUser ? '#FFFFFF' : accentColor,
              fontSize: '11px',
              fontWeight: 700,
              marginTop: '2px',
              flexShrink: 0,
            }}
          >
            {num}
          </span>
          <span>{formatInlineText(itemText)}</span>
        </li>
      );
      return;
    }

    // Normal paragraph line
    flushList(`list-${index}`);
    blocks.push(
      <p
        key={`p-${index}`}
        style={{
          margin: '0 0 8px 0',
          fontSize: '13.5px',
          lineHeight: '1.6',
          color: isUser ? '#FFFFFF' : colores.textoClaro,
        }}
      >
        {formatInlineText(trimmed)}
      </p>
    );
  });

  flushList('list-final');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {blocks}
    </div>
  );
};
