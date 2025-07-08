//Creating separate component to display all of the chats with modern styling

import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks;
    }
  }

  function isCodeBlock(str: string) {
    if (
      str.includes("=") ||
      str.includes(";") ||
      str.includes("[") ||
      str.includes("]") ||
      str.includes("{") ||
      str.includes("}") ||
      str.includes("#") ||
      str.includes("//")
    ) {
      return true;
    }
    return false;
  }

  // Function to format text with markdown-like styling
  function formatText(text: string) {
    // Split by double newlines to create paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      // Split by single newlines within paragraphs
      const lines = paragraph.split('\n');
      
      return (
        <Box key={pIndex} sx={{ mb: pIndex < paragraphs.length - 1 ? 2 : 0 }}>
          {lines.map((line, lIndex) => {
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
                    mb: 0.5,
                    pl: 2,
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                >
                  <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, mr: 1, minWidth: '20px' }}>
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
                    mb: 0.5,
                    pl: 2,
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                >
                  <Box component="span" sx={{ color: 'primary.main', mr: 1, minWidth: '16px' }}>
                    •
                  </Box>
                  <Box component="span" sx={{ flex: 1 }}>
                    {formatInlineMarkdown(bulletMatch[1])}
                  </Box>
                </Typography>
              );
            }

            // Regular line with markdown formatting
            return (
              <Typography 
                key={lIndex}
                component="div"
                sx={{ 
                  fontSize: "16px", 
                  lineHeight: 1.7,
                  color: "text.primary",
                  fontFamily: "Inter",
                  mb: lIndex < lines.length - 1 ? 1 : 0,
                  textAlign: "left"
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

  // Function to handle inline markdown formatting (bold, etc.)
  function formatInlineMarkdown(text: string) {
    // Handle bold text **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the bold part
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      // Add bold text
      parts.push(
        <strong key={`bold-${match.index}`} style={{ fontWeight: 700, color: '#6366f1' }}>
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    // If no formatting found, just return the original text
    return parts.length > 0 ? parts : text;
  }

//accepting the props

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
            p: 2,
            mb: 2,
            bgcolor: "rgba(99, 102, 241, 0.05)",
            borderRadius: 2,
            border: "1px solid rgba(99, 102, 241, 0.1)",
            gap: 2,
            alignItems: "flex-start"
        }}
    >
        <Avatar
            sx={{ 
                bgcolor: "primary.main",
                color: "white",
                width: 36,
                height: 36,
                fontSize: "1.2rem"
            }} 
        >
            🤖
        </Avatar>
        <Box sx={{ flex: 1 }}>
        {!messageBlocks && (
          <Box>
            {formatText(content)}
          </Box>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter 
                key={index}
                style={oneDark} 
                language="javascript"
                customStyle={{
                  borderRadius: "8px",
                  margin: "8px 0",
                  fontSize: "14px"
                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Box key={index}>
                {formatText(block)}
              </Box>
            )
          )}
      </Box>
    </Box> 
 ) : (
    <Box 
        sx={{
            display: "flex",
            p: 2,
            mb: 2,
            bgcolor: "rgba(236, 72, 153, 0.05)",
            borderRadius: 2,
            border: "1px solid rgba(236, 72, 153, 0.1)",
            gap: 2,
            alignItems: "flex-start",
            flexDirection: "row-reverse"
        }}
    >
        <Avatar
            sx={{ 
                bgcolor: "secondary.main",
                color: "white",
                width: 36,
                height: 36,
                fontWeight: 600
            }} 
        >
            { auth?.user?.name[0] }
        </Avatar>
        <Box sx={{ flex: 1, textAlign: "right" }}>
            {!messageBlocks && (
              <Box>
                {formatText(content)}
              </Box>
            )}
            {messageBlocks &&
              messageBlocks.length &&
              messageBlocks.map((block, index) =>
                isCodeBlock(block) ? (
                  <SyntaxHighlighter 
                    key={index}
                    style={oneDark} 
                    language="javascript"
                    customStyle={{
                      borderRadius: "8px",
                      margin: "8px 0",
                      fontSize: "14px"
                    }}
                  >
                    {block}
                  </SyntaxHighlighter>
                ) : (
                  <Box key={index}>
                    {formatText(block)}
                  </Box>
                )
              )}
          </Box>
       </Box> 
  );
};

export default ChatItem
