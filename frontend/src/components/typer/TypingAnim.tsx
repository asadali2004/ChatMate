import { TypeAnimation } from "react-type-animation";
const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Welcome to ChatMate AI ✨",
        1000,
        "Built by Asad Ali with ❤️",
        2000,
        // "Powered by Groq's Lightning Speed ⚡",
        // 1500,
        "Your Intelligent AI Companion 🤖",
        2000,
        "Get Instant AI Responses 🚀",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        background: 'linear-gradient(135deg, #6366f1, #ec4899)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: "inline-block",
        textAlign: "center",
        fontWeight: 700,
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
