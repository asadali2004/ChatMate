import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Extracts code blocks from a chat message string
function extractCodeFromString(message: string) {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks.map((block, index) => ({
        content: block,
        isCode: index % 2 === 1 // Only odd-indexed blocks are code (between ```)
      })).filter(block => block.content.trim() !== ""); // Remove empty blocks
    }
    return null;
  }

// Formats chat text with enhanced colorful styling
  function formatText(text: string) {
    // Split by double newlines to create paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      // Split by single newlines within paragraphs
      const lines = paragraph.split('\n');
      
      return (
        <Box key={pIndex} sx={{ mb: pIndex < paragraphs.length - 1 ? 2 : 0 }}>
          {lines.map((line, lIndex) => {
            // Check if line is a heading (starts with #)
            const headingMatch = line.match(/^(#+)\s+(.+)$/);
            if (headingMatch) {
              const level = headingMatch[1].length;
              let headingText = headingMatch[2];
              
              // Clean up bold formatting around headings specifically
              headingText = headingText
                .replace(/^\*\*(.+)\*\*$/, '$1') // Remove ** at start and end
                .replace(/^\*\*\s*(.+)\s*\*\*$/, '$1') // Remove ** with spaces
                .trim();
              
              return (
                <Typography 
                  key={lIndex}
                  component="div"
                  sx={{ 
                    fontSize: level === 1 ? "24px" : level === 2 ? "20px" : "18px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "Inter",
                    mb: 1.5,
                    mt: lIndex > 0 ? 1.5 : 0,
                  }}
                >
                  {formatInlineMarkdown(headingText)}
                </Typography>
              );
            }

            // Check if line is a bold pseudo-heading (like **How Binary Search Works:** **)
            const boldHeadingMatch = line.match(/^\*\*([^*]+?):\*\*\s*$/);
            if (boldHeadingMatch) {
              return (
                <Typography 
                  key={lIndex}
                  component="div"
                  sx={{ 
                    fontSize: "18px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "Inter",
                    mb: 1.5,
                    mt: lIndex > 0 ? 1.5 : 0,
                  }}
                >
                  {boldHeadingMatch[1]}:
                </Typography>
              );
            }

            // Check if line is a numbered list item
            const numberedListMatch = line.match(/^(\d+)\.\s+(.+)$/);
            if (numberedListMatch) {
              return (
                <Typography 
                  key={lIndex}
                  component="div"
                  sx={{ 
                    fontSize: "16px", 
                    lineHeight: 1.7,
                    color: "text.primary",
                    fontFamily: "Inter",
                    mb: 0.8,
                    pl: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      width: '3px',
                      height: '20px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      borderRadius: '2px'
                    }
                  }}
                >
                  <Box component="span" sx={{ 
                    background: "linear-gradient(135deg, #6366f1, #ec4899)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700, 
                    mr: 1.5, 
                    minWidth: '24px' 
                  }}>
                    {numberedListMatch[1]}.
                  </Box>
                  <Box component="span" sx={{ flex: 1 }}>
                    {formatInlineMarkdown(numberedListMatch[2])}
                  </Box>
                </Typography>
              );
            }

            // Check if line is a bullet point
            const bulletMatch = line.match(/^[*-]\s+(.+)$/);
            if (bulletMatch) {
              return (
                <Typography 
                  key={lIndex}
                  component="div"
                  sx={{ 
                    fontSize: "16px", 
                    lineHeight: 1.7,
                    color: "text.primary",
                    fontFamily: "Inter",
                    mb: 0.8,
                    pl: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      width: '3px',
                      height: '20px',
                      background: 'linear-gradient(135deg, #10b981, #06d6a0)',
                      borderRadius: '2px'
                    }
                  }}
                >
                  <Box component="span" sx={{ 
                    color: '#10b981', 
                    mr: 1.5, 
                    minWidth: '20px',
                    fontWeight: 700,
                    fontSize: '18px'
                  }}>
                    ●
                  </Box>
                  <Box component="span" sx={{ flex: 1 }}>
                    {formatInlineMarkdown(bulletMatch[1])}
                  </Box>
                </Typography>
              );
            }

            // Check if line looks like a key-value pair or definition
            const definitionMatch = line.match(/^(.+?):\s*(.+)$/);
            if (definitionMatch && line.length < 100) {
              return (
                <Typography 
                  key={lIndex}
                  component="div"
                  sx={{ 
                    fontSize: "16px", 
                    lineHeight: 1.7,
                    fontFamily: "Inter",
                    mb: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline'
                  }}
                >
                  <Box component="span" sx={{ 
                    background: "linear-gradient(135deg, #f59e0b, #f97316)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    mr: 1
                  }}>
                    {definitionMatch[1]}:
                  </Box>
                  <Box component="span" sx={{ color: "text.primary", flex: 1 }}>
                    {formatInlineMarkdown(definitionMatch[2])}
                  </Box>
                </Typography>
              );
            }

            // Regular line with enhanced markdown formatting
            return (
              <Typography 
                key={lIndex}
                component="div"
                sx={{ 
                  fontSize: "16px", 
                  lineHeight: 1.8,
                  color: "text.primary",
                  fontFamily: "Inter",
                  mb: lIndex < lines.length - 1 ? 1 : 0,
                  textAlign: "left",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                  // Add subtle hover effect for interactivity
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateX(2px)",
                    filter: "brightness(1.1)"
                  }
                }}
              >
                {formatInlineMarkdown(line)}
              </Typography>
            );
          })}
        </Box>
      );
    });
  }

// Handles inline markdown formatting with colors
  function formatInlineMarkdown(text: string) {
    if (!text) return text;
    
    // Clean up any malformed markdown patterns first
    const cleanText = text
      .replace(/\*\*\*+/g, '**') // Replace triple+ asterisks with double
      .replace(/\*\*([^*]*)\*([^*]*)\*\*/g, '**$1$2**') // Fix broken bold patterns
      .replace(/\*\*\s*\*\*/g, '') // Remove empty bold patterns
      .replace(/(?<!\*)\*(?!\*)(?![^*]*\*\*)/g, '') // Remove orphaned single asterisks
      .trim();
    
    // Define types for matches
    interface MatchData {
      start: number;
      end: number;
      content: string;
      fullMatch: string;
      type: string;
      url?: string;
    }
    
    // Create an array to hold the formatted parts
    const elements: (string | React.ReactElement)[] = [];
    let currentIndex = 0;
    
    // Combined regex for all formatting patterns - reordered for better matching
    const patterns = [
      { regex: /\*\*([^*\n]+?)\*\*/g, type: 'bold' },      // **bold** - ensure no nested asterisks or newlines
      { regex: /\*([^*\n]+?)\*/g, type: 'italic' },        // *italic* - ensure no nested asterisks or newlines  
      { regex: /`([^`\n]+?)`/g, type: 'code' },            // `code` - ensure no nested backticks or newlines
      { regex: /__([^_\n]+?)__/g, type: 'underline' },     // __underline__ - ensure no nested underscores
      { regex: /~~([^~\n]+?)~~/g, type: 'strikethrough' }, // ~~strikethrough~~ - ensure no nested tildes
      { regex: /\[([^\]\n]+?)\]\(([^)\n]+?)\)/g, type: 'link' }, // [text](url) - ensure no newlines
    ];
    
    // Find all matches and their positions
    const allMatches: MatchData[] = [];
    patterns.forEach(pattern => {
      let match;
      // Reset regex lastIndex to avoid issues with global regexes
      pattern.regex.lastIndex = 0;
      while ((match = pattern.regex.exec(cleanText)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          content: match[1],
          fullMatch: match[0],
          type: pattern.type,
          url: pattern.type === 'link' ? match[2] : undefined
        });
        // Prevent infinite loop for zero-length matches
        if (match.index === pattern.regex.lastIndex) {
          pattern.regex.lastIndex++;
        }
      }
      // Reset regex after use
      pattern.regex.lastIndex = 0;
    });
    
    // Sort matches by position
    allMatches.sort((a, b) => a.start - b.start);
    
    // Process non-overlapping matches
    const processedMatches: MatchData[] = [];
    allMatches.forEach(match => {
      const overlaps = processedMatches.some(processed => 
        match.start < processed.end && match.end > processed.start
      );
      if (!overlaps) {
        processedMatches.push(match);
      }
    });
    
    // Build the result with formatted elements
    processedMatches.forEach((match, index) => {
      // Add text before the match
      if (match.start > currentIndex) {
        const beforeText = cleanText.slice(currentIndex, match.start);
        if (beforeText) {
          const highlighted = highlightKeywords(beforeText, elements.length);
          if (Array.isArray(highlighted)) {
            elements.push(...highlighted);
          } else {
            elements.push(highlighted);
          }
        }
      }
      
      // Add the formatted match
      let styledElement: React.ReactElement;
      switch (match.type) {
        case 'bold':
          styledElement = (
            <strong 
              key={`bold-${index}`} 
              style={{ 
                fontWeight: 700, 
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {match.content}
            </strong>
          );
          break;
        case 'italic':
          styledElement = (
            <em 
              key={`italic-${index}`} 
              style={{ 
                fontStyle: 'italic', 
                color: '#f59e0b',
                fontWeight: 500
              }}
            >
              {match.content}
            </em>
          );
          break;
        case 'code':
          styledElement = (
            <code 
              key={`code-${index}`} 
              style={{ 
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: '#ec4899',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'Monaco, Consolas, monospace',
                fontSize: '0.9em',
                border: '1px solid rgba(236, 72, 153, 0.2)'
              }}
            >
              {match.content}
            </code>
          );
          break;
        case 'underline':
          styledElement = (
            <span 
              key={`underline-${index}`} 
              style={{ 
                textDecoration: 'underline',
                textDecorationColor: '#10b981',
                textDecorationThickness: '2px',
                textUnderlineOffset: '3px',
                color: '#10b981',
                fontWeight: 600
              }}
            >
              {match.content}
            </span>
          );
          break;
        case 'strikethrough':
          styledElement = (
            <span 
              key={`strike-${index}`} 
              style={{ 
                textDecoration: 'line-through',
                textDecorationColor: '#ef4444',
                opacity: 0.7
              }}
            >
              {match.content}
            </span>
          );
          break;
        case 'link':
          styledElement = (
            <a 
              key={`link-${index}`} 
              href={match.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: '#06d6a0',
                textDecoration: 'none',
                fontWeight: 600,
                borderBottom: '1px solid #06d6a0',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#10b981';
                target.style.borderBottomColor = '#10b981';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#06d6a0';
                target.style.borderBottomColor = '#06d6a0';
              }}
            >
              {match.content}
            </a>
          );
          break;
        default:
          styledElement = <span key={`default-${index}`}>{match.content}</span>;
      }
      
      elements.push(styledElement);
      currentIndex = match.end;
    });
    
    // Add remaining text
    if (currentIndex < cleanText.length) {
      const remainingText = cleanText.slice(currentIndex);
      if (remainingText) {
        const highlighted = highlightKeywords(remainingText, elements.length);
        if (Array.isArray(highlighted)) {
          elements.push(...highlighted);
        } else {
          elements.push(highlighted);
        }
      }
    }
    
    // If no formatting was found, just highlight keywords in the original text
    if (elements.length === 0) {
      const highlighted = highlightKeywords(cleanText, 0);
      return Array.isArray(highlighted) ? highlighted : [highlighted];
    }
    
    return elements;
  }

// Highlights important keywords with colors
  function highlightKeywords(text: string, keyPrefix: number): (string | React.ReactElement)[] | string {
    const keywords = {
      // Technical terms - Blue gradient
      'DevOps|CI/CD|API|REST|GraphQL|Docker|Kubernetes|AWS|Azure|GCP|algorithm|complexity|performance|optimization|scalability': '#6366f1',
      // Programming languages and terms - Purple gradient  
      'JavaScript|TypeScript|Python|Java|React|Node.js|MongoDB|SQL|binary search|array|sorted|database|frontend|backend': '#8b5cf6',
      // Important concepts - Orange/Yellow gradient
      'important|note|warning|error|success|tip|remember|Example|Time Complexity|Comparison|Usage|How|Works|Steps': '#f59e0b',
      // Action words - Green gradient
      'create|build|deploy|test|install|configure|setup|run|search|find|compare|repeat|start|implement|execute': '#10b981',
      // Status words and technical numbers - Pink gradient
      'completed|failed|success|error|pending|active|O\\(log n\\)|efficient|fast|slow|iteration|recursive': '#ec4899',
      // Special highlighting for code-related terms - Cyan
      'function|method|class|variable|parameter|return|element|index|target|middleware|component|props': '#06d6a0',
    };
    
    const elements: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    
    // Find all keyword matches first
    interface KeywordMatch {
      start: number;
      end: number;
      word: string;
      color: string;
    }
    
    const allKeywordMatches: KeywordMatch[] = [];
    
    Object.entries(keywords).forEach(([pattern, color]) => {
      const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
      let match;
      regex.lastIndex = 0; // Reset regex
      
      while ((match = regex.exec(text)) !== null) {
        // Skip if this keyword is part of markdown formatting (has ** around it)
        const beforeMatch = text.slice(Math.max(0, match.index - 2), match.index);
        const afterMatch = text.slice(match.index + match[0].length, match.index + match[0].length + 2);
        
        if (beforeMatch.includes('**') || afterMatch.includes('**')) {
          continue; // Skip keywords that are part of bold formatting
        }
        
        allKeywordMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          word: match[0],
          color: color
        });
        
        // Prevent infinite loop
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
      regex.lastIndex = 0; // Reset after use
    });
    
    // Sort matches by position
    allKeywordMatches.sort((a, b) => a.start - b.start);
    
    // Process non-overlapping matches
    const processedKeywords: KeywordMatch[] = [];
    allKeywordMatches.forEach(match => {
      const overlaps = processedKeywords.some(processed => 
        match.start < processed.end && match.end > processed.start
      );
      if (!overlaps) {
        processedKeywords.push(match);
      }
    });
    
    // Build the result
    processedKeywords.forEach((match, index) => {
      // Add text before keyword
      if (match.start > lastIndex) {
        const beforeText = text.slice(lastIndex, match.start);
        if (beforeText) {
          elements.push(beforeText);
        }
      }
      
      // Add highlighted keyword with clean colorful styling
      elements.push(
        <span 
          key={`keyword-${keyPrefix}-${index}`}
          style={{ 
            color: match.color,
            fontWeight: 700,
            textShadow: `0 0 8px ${match.color}40, 0 0 16px ${match.color}20`,
            transition: 'all 0.2s ease',
            display: 'inline',
          }}
          className="keyword-highlight"
        >
          {match.word}
        </span>
      );
      
      lastIndex = match.end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }
    
    return elements.length > 0 ? elements : text;
  }

// ChatItem component displays a single chat message (user or assistant)

const ChatItem = ({
    content,
    role,
  }: {
    content: string,
    role: "user" | "assistant";
  }) => {

    const messageBlocks = extractCodeFromString(content);
    const auth = useAuth();
    
    return role == "assistant" ? (
    <Box 
        sx={{
            display: "flex",
            p: 3,
            mb: 2,
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.03) 100%)",
            borderRadius: 3,
            border: "1px solid rgba(99, 102, 241, 0.15)",
            gap: 2.5,
            alignItems: "flex-start",
            maxWidth: "100%",
            overflowX: "hidden",
            wordWrap: "break-word",
            position: "relative",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
            backdropFilter: "blur(10px)",
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
              borderRadius: '12px 12px 0 0'
            }
        }}
        className="chat-container"
    >
        <Avatar
            sx={{ 
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                width: 40,
                height: 40,
                fontSize: "1.3rem",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
            }} 
        >
            🤖
        </Avatar>
        <Box sx={{ 
            flex: 1, 
            minWidth: 0,
            maxWidth: "100%",
            overflowWrap: "break-word",
            wordWrap: "break-word"
        }}>
        {!messageBlocks && (
          <Box 
            className="chat-message"
            sx={{
              // Add some subtle styling for better visual hierarchy
              '& > *:first-of-type': {
                mt: 0
              },
              '& > *:last-child': {
                mb: 0
              }
            }}
          >
            {formatText(content)}
          </Box>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            block.isCode ? (
              <SyntaxHighlighter 
                key={index}
                style={oneDark} 
                language="javascript"
                customStyle={{
                  borderRadius: "8px",
                  margin: "8px 0",
                  fontSize: "14px",
                  maxWidth: "100%",
                  overflowX: "auto",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap"
                }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {block.content}
              </SyntaxHighlighter>
            ) : (
              <Box key={index} className="chat-message">
                {formatText(block.content)}
              </Box>
            )
          )}
      </Box>
    </Box> 
 ) : (
    <Box 
        sx={{
            display: "flex",
            p: 3,
            mb: 2,
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(239, 68, 68, 0.05) 50%, rgba(245, 158, 11, 0.03) 100%)",
            borderRadius: 3,
            border: "1px solid rgba(236, 72, 153, 0.15)",
            gap: 2.5,
            alignItems: "flex-start",
            flexDirection: "row-reverse",
            maxWidth: "100%",
            overflowX: "hidden",
            wordWrap: "break-word",
            position: "relative",
            boxShadow: "0 4px 20px rgba(236, 72, 153, 0.1)",
            backdropFilter: "blur(10px)",
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #ec4899, #f97316)',
              borderRadius: '12px 12px 0 0'
            }
        }}
        className="chat-container"
    >
        <Avatar
            sx={{ 
                background: "linear-gradient(135deg, #ec4899, #f97316)",
                color: "white",
                width: 40,
                height: 40,
                fontWeight: 600,
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(236, 72, 153, 0.3)"
            }} 
        >
            { auth?.user?.name[0] }
        </Avatar>
        <Box sx={{ 
            flex: 1, 
            textAlign: "right",
            minWidth: 0,
            maxWidth: "100%",
            overflowWrap: "break-word",
            wordWrap: "break-word"
        }}>
            {!messageBlocks && (
              <Box 
                className="chat-message"
                sx={{
                  // Add some subtle styling for better visual hierarchy
                  '& > *:first-of-type': {
                    mt: 0
                  },
                  '& > *:last-child': {
                    mb: 0
                  }
                }}
              >
                {formatText(content)}
              </Box>
            )}
            {messageBlocks &&
              messageBlocks.length &&
              messageBlocks.map((block, index) =>
                block.isCode ? (
                  <SyntaxHighlighter 
                    key={index}
                    style={oneDark} 
                    language="javascript"
                    customStyle={{
                      borderRadius: "8px",
                      margin: "8px 0",
                      fontSize: "14px",
                      maxWidth: "100%",
                      overflowX: "auto",
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap"
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {block.content}
                  </SyntaxHighlighter>
                ) : (
                  <Box key={index} className="chat-message">
                    {formatText(block.content)}
                  </Box>
                )
              )}
          </Box>
       </Box> 
  );
};

export default ChatItem
