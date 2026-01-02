interface MockResponse {
  content: string;
  isPositive: boolean;
}

export const generateMockResponse = async (userMessage: string): Promise<MockResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

  const lowerMessage = userMessage.toLowerCase();

  // Fabric-related queries
  if (lowerMessage.includes('fabric') || lowerMessage.includes('silk') || lowerMessage.includes('cotton')) {
    return {
      content: `Great question about fabrics! 🧵\n\nHere's what I recommend:\n\n**For Summer:**\n• Cotton lawn - breathable & comfortable\n• Chiffon - elegant & flowy\n\n**For Winter:**\n• Velvet - luxurious & warm\n• Khaddar - traditional & cozy\n\n**For Formal Events:**\n• Organza - stunning overlays\n• Raw silk - timeless elegance\n\nWould you like specific fabric suggestions for your design? 💕`,
      isPositive: true,
    };
  }

  // Design-related queries
  if (lowerMessage.includes('design') || lowerMessage.includes('style') || lowerMessage.includes('pattern')) {
    return {
      content: `I love helping with designs! ✨\n\nBased on current trends:\n\n**Popular Styles:**\n🌸 Angrakha cuts with modern twists\n🌸 Peplum tops with palazzo pants\n🌸 A-line kurtas with embroidery\n\n**Trending Patterns:**\n• Geometric block prints\n• Floral embroidery\n• Gota work borders\n\nWant me to suggest something specific for your fabric? 💫`,
      isPositive: true,
    };
  }

  // Wedding/bridal queries
  if (lowerMessage.includes('wedding') || lowerMessage.includes('bridal') || lowerMessage.includes('shaadi')) {
    return {
      content: `Oh, wedding outfits are my favorite! 👰✨\n\nFor a stunning bridal look:\n\n**Traditional Red/Maroon:**\n• Heavy lehenga with zardozi\n• Velvet with gold embroidery\n\n**Modern Pastels:**\n• Blush pink with silver work\n• Peach with kundan borders\n\n**Accessories:**\n💎 Statement maang tikka\n💎 Layered necklace set\n💎 Embellished juttis\n\nWhat's your wedding color theme? 💕`,
      isPositive: true,
    };
  }

  // Tailor-related queries
  if (lowerMessage.includes('tailor') || lowerMessage.includes('stitch') || lowerMessage.includes('order')) {
    return {
      content: `Let me help you with tailoring! 🪡\n\n**How StitchMate works:**\n\n1️⃣ Upload your fabric photo\n2️⃣ Choose or create a design\n3️⃣ Tailors bid on your order\n4️⃣ Pick your favorite tailor\n5️⃣ Get it delivered!\n\n**Our tailors offer:**\n• 7-14 day delivery\n• Quality guarantee\n• Custom measurements\n\nReady to find the perfect tailor? 🎯`,
      isPositive: true,
    };
  }

  // Accessory queries
  if (lowerMessage.includes('accessori') || lowerMessage.includes('button') || lowerMessage.includes('lace') || lowerMessage.includes('embroid')) {
    return {
      content: `Accessories make all the difference! 💎\n\n**Popular Choices:**\n\n✨ **Embroidery:**\n• Thread work - ₹500-2000\n• Zari/Gota - ₹1000-5000\n• Mirror work - ₹800-3000\n\n✨ **Buttons & Closures:**\n• Pearl buttons - ₹200-800\n• Kundan buttons - ₹500-1500\n\n✨ **Lace & Borders:**\n• Crochet lace - ₹150-600/m\n• Sequin border - ₹300-1000/m\n\nBrowse our marketplace for more! 🛍️`,
      isPositive: true,
    };
  }

  // Greetings
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    return {
      content: `Hello! So happy to chat with you! 🌸\n\nI'm Sana, your personal fashion assistant at StitchMate.\n\nHow can I help you today?\n\n• Need fabric advice?\n• Looking for design ideas?\n• Want to find a tailor?\n• Tracking an order?\n\nJust ask! I'm here to help 💕`,
      isPositive: true,
    };
  }

  // Thank you responses
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return {
      content: `You're so welcome! 🥰\n\nIt was my pleasure helping you!\n\nRemember, I'm always here if you need:\n• More styling tips\n• Design suggestions\n• Help with orders\n\nHappy designing! ✨💕`,
      isPositive: true,
    };
  }

  // Default response
  return {
    content: `That's a great question! 💭\n\nI can help you with:\n\n🎨 **Design Studio** - Create custom designs\n🧵 **Fabric Analysis** - Get fabric recommendations\n👗 **Virtual Try-On** - See how it looks\n🪡 **Find Tailors** - Connect with experts\n📦 **Order Tracking** - Check your orders\n\nWhat would you like to explore? ✨`,
    isPositive: false,
  };
};
