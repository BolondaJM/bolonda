// ============================================================
// Bolonda Family Website - Sample Data
// Replace this data with your actual family information
// ============================================================

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  services?: Service[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  memberName: string;
  memberId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "blog" | "article";
  image: string;
  readTime: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  location: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

// ----- Family Members -----
export const familyMembers: FamilyMember[] = [
  {
    id: "member-1",
    name: "Fidele Bolonda",
    role: "Father — Budget & Family Consultation",
    bio: "The head of the Bolonda household. A dedicated father and experienced advisor who handles all matters regarding budgeting, financial planning, and family consultation. His wisdom and guidance keep the family strong and united.",
    image: "/images/family/member-1.jpg",
  },
  {
    id: "member-2",
    name: "Brigitte Bolonda",
    role: "Mother — Bakery & Cuisine",
    bio: "The heart and soul of the Bolonda family. A talented baker and culinary expert whose delicious creations bring joy to everyone around her. Her kitchen is where love is served on every plate.",
    image: "/images/family/member-2.png",
  },
  {
    id: "member-3",
    name: "Reddy Bolonda",
    role: "1st Son — Projects Manager & Data Analyst",
    bio: "A strategic organizer and analytical problem-solver. Reddy specializes in project management and data analysis, with a strong ability to translate complex data into actionable insights. He turns vision into execution, drives informed decision-making, and brings people together to deliver measurable results.",
    image: "/images/family/member-3.jpg",
  },
  {
    id: "member-4",
    name: "Ruphin Bolonda",
    role: "2nd Son — Software Engineer & Crypto Miner",
    bio: "A tech-savvy software engineer with a passion for automation and crypto mining. Ruphin builds efficient systems and stays at the forefront of blockchain technology and digital innovation.",
    image: "/images/family/member-4.jpg",
  },
  {
    id: "member-5",
    name: "Jonathan Bolonda",
    role: "3rd Son — Software Engineer & Multi-Talent",
    bio: "A versatile software engineer, web developer, operations manager, video editor, French-English translator and interpreter, crypto guru, and transhumanist. Jonathan wears many hats and excels at every one of them.",
    image: "/images/family/member-5.jpg",
  },
  {
    id: "member-6",
    name: "Esther Bolonda",
    role: "Last Born — Content Writer & Admin Assistant",
    bio: "The youngest member of the Bolonda family. Esther is a gifted content writer and skilled administrative assistant. Her attention to detail and way with words make her an invaluable asset to every project she touches.",
    image: "/images/family/member-6.jpg",
  },
  {
    id: "member-7",
    name: "Fatuma Bolonda",
    role: "Daughter-in-Law — Customer Support Agent",
    bio: "A warm and professional customer support agent who joined the Bolonda family through marriage. Fatuma excels at resolving issues, building client relationships, and ensuring every customer feels heard and valued.",
    image: "/images/family/member-7.jpg",
  },
  {
    id: "member-8",
    name: "Abigael Ngoy",
    role: "Cousin — Assistant Community Health Promoter",
    bio: "An Assistant Community Health Promoter dedicated to mobilisation and creating self-awareness on hygiene and good health practices. Abigael helps youth with sexual health education and collaborates with local authorities to drive community wellbeing forward.",
    image: "/images/family/member-8.jpg",
  },
];

// ----- Services -----
export const services: Service[] = [
  {
    id: "service-1",
    title: "Budget & Financial Planning",
    description: "Expert guidance on budgeting, financial planning, and resource management. Get strategic advice to secure your family's or business's financial future.",
    icon: "briefcase",
    memberName: "Fidele Bolonda",
    memberId: "member-1",
  },
  {
    id: "service-2",
    title: "Family Consultation",
    description: "Professional family consultation services covering important household decisions, conflict resolution, and long-term planning for your family's wellbeing.",
    icon: "users",
    memberName: "Fidele Bolonda",
    memberId: "member-1",
  },
  {
    id: "service-3",
    title: "Bakery & Pastry",
    description: "Delicious baked goods, pastries, and custom cakes for all occasions. From everyday treats to special celebration masterpieces.",
    icon: "utensils",
    memberName: "Brigitte Bolonda",
    memberId: "member-2",
  },
  {
    id: "service-4",
    title: "Cuisine & Catering",
    description: "Authentic home-cooked meals and professional catering services for events, celebrations, and gatherings of all sizes.",
    icon: "utensils",
    memberName: "Brigitte Bolonda",
    memberId: "member-2",
  },
  {
    id: "service-5",
    title: "Event Planning & Management",
    description: "Full-service event planning and management for weddings, corporate events, parties, and community gatherings. From concept to flawless execution.",
    icon: "calendar",
    memberName: "Reddy Bolonda",
    memberId: "member-3",
  },
  {
    id: "service-6",
    title: "Opportunities & Partnerships",
    description: "Finding and connecting you with the right business opportunities, partnerships, and collaborations to help you grow and succeed.",
    icon: "search",
    memberName: "Reddy Bolonda",
    memberId: "member-3",
  },
  {
    id: "service-7",
    title: "Software Engineering & Automation",
    description: "Custom software solutions and process automation to streamline your workflows. From scripts to full-scale systems that save time and money.",
    icon: "code",
    memberName: "Ruphin Bolonda",
    memberId: "member-4",
  },
  {
    id: "service-8",
    title: "Crypto Mining Consulting",
    description: "Expert consulting on cryptocurrency mining setups, optimization, and strategy. Get started or scale your mining operations effectively.",
    icon: "cpu",
    memberName: "Ruphin Bolonda",
    memberId: "member-4",
  },
  {
    id: "service-9",
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies. Responsive, performant, and tailored to your exact needs.",
    icon: "code",
    memberName: "Jonathan Bolonda",
    memberId: "member-5",
  },
  {
    id: "service-10",
    title: "Video Editing",
    description: "Professional video editing services for content creators, businesses, and personal projects. Polished, engaging, and story-driven results.",
    icon: "video",
    memberName: "Jonathan Bolonda",
    memberId: "member-5",
  },
  {
    id: "service-11",
    title: "French-English Translation & Interpretation",
    description: "Accurate and culturally-aware French-English translation and interpretation services for documents, meetings, and live events.",
    icon: "globe",
    memberName: "Jonathan Bolonda",
    memberId: "member-5",
  },
  {
    id: "service-12",
    title: "Crypto & Blockchain Consulting",
    description: "In-depth cryptocurrency guidance, blockchain strategy, and digital asset consulting for individuals and businesses navigating the crypto space.",
    icon: "trending",
    memberName: "Jonathan Bolonda",
    memberId: "member-5",
  },
  {
    id: "service-13",
    title: "Content Writing",
    description: "Professional content writing services including blog posts, articles, web copy, and marketing materials that engage and convert.",
    icon: "book",
    memberName: "Esther Bolonda",
    memberId: "member-6",
  },
  {
    id: "service-14",
    title: "Administrative Support",
    description: "Reliable administrative assistance including data entry, scheduling, document management, email handling, and organizational support.",
    icon: "clipboard",
    memberName: "Esther Bolonda",
    memberId: "member-6",
  },
  {
    id: "service-15",
    title: "Customer Support",
    description: "Professional and empathetic customer support services. From handling inquiries to resolving complaints, ensuring every client receives timely and satisfying assistance.",
    icon: "headset",
    memberName: "Fatuma Bolonda",
    memberId: "member-7",
  },
  {
    id: "service-16",
    title: "Community Health Promotion",
    description: "Mobilisation and awareness campaigns on hygiene, good health practices, and youth sexual health education. Working hand-in-hand with local authorities for healthier communities.",
    icon: "heart",
    memberName: "Abigael Ngoy",
    memberId: "member-8",
  },
  {
    id: "service-17",
    title: "Youth Health & Wellness Education",
    description: "Targeted programmes helping young people understand sexual health, personal hygiene, and self-awareness. Empowering the next generation with knowledge and confidence.",
    icon: "users",
    memberName: "Abigael Ngoy",
    memberId: "member-8",
  },
];

// ----- Blog Posts & Articles -----
export const blogPosts: BlogPost[] = [
  {
    id: "bpuzzle",
    title: "Play Bolonda's Puzzle",
    excerpt: "Download the Android app or play in the browser. Piece together our family photos, choose a difficulty, and follow the stages.",
    content: "We built Bolonda's Puzzle so anyone can sit with our family photos and put the pieces back together. Play it right here in this post.",
    author: "Jonathan Bolonda",
    date: "2026-09-18",
    category: "blog",
    image: "/bpuzzle/logo.png",
    readTime: "Play now",
  },
  {
    id: "post-2",
    title: "Building a Legacy: Lessons from Our Elders",
    excerpt: "Wisdom passed down through generations - how the Bolonda family values have shaped who we are today.",
    content: "In every family, there are lessons that transcend time. The Bolonda family has always valued...",
    author: "Esther Bolonda",
    date: "2025-11-20",
    category: "article",
    image: "/images/blog/legacy.jpg",
    readTime: "8 min read",
  },
  {
    id: "post-3",
    title: "Our Journey: From Humble Beginnings",
    excerpt: "The story of how the Bolonda family grew, adapted, and thrived through challenges and triumphs.",
    content: "Every great family has an origin story. Ours begins with...",
    author: "Fidele Bolonda",
    date: "2025-10-05",
    category: "article",
    image: "/images/blog/journey.jpg",
    readTime: "10 min read",
  },
  {
    id: "post-6",
    title: "The Rise of Crypto and What It Means for Families",
    excerpt: "An introduction to cryptocurrency and blockchain technology, and how families can benefit from understanding this new frontier.",
    content: "Cryptocurrency is no longer just a buzzword. It represents a fundamental shift in how we think about money and technology...",
    author: "Ruphin Bolonda",
    date: "2025-07-15",
    category: "article",
    image: "/images/blog/crypto.jpg",
    readTime: "7 min read",
  },
];

// ----- Experiences -----
export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Family Vacation in Cape Town",
    description: "An unforgettable two-week adventure exploring Table Mountain, the Cape of Good Hope, and the vibrant culture of South Africa.",
    date: "2025-07-01",
    image: "/images/experiences/capetown.jpg",
    location: "Cape Town, South Africa",
  },
  {
    id: "exp-2",
    title: "Grandma's 80th Birthday Celebration",
    description: "A grand celebration honoring our beloved grandmother's 80th birthday with family, friends, music, and dancing.",
    date: "2025-03-20",
    image: "/images/experiences/birthday.jpg",
    location: "Kinshasa, DRC",
  },
  {
    id: "exp-3",
    title: "Community Service Day",
    description: "The entire Bolonda family volunteered at the local community center, teaching, cooking, and giving back to those in need.",
    date: "2024-11-15",
    image: "/images/experiences/community.jpg",
    location: "Local Community Center",
  },
  {
    id: "exp-4",
    title: "Jonathan's Graduation Ceremony",
    description: "Celebrating Jonathan's achievement as he graduated with honors in Computer Science. A proud moment for the whole family.",
    date: "2024-06-10",
    image: "/images/experiences/graduation.jpg",
    location: "University Campus",
  },
  {
    id: "exp-5",
    title: "Annual Christmas Gathering",
    description: "Our cherished tradition of coming together every Christmas Eve for dinner, gift exchange, and storytelling by the fireplace.",
    date: "2024-12-24",
    image: "/images/experiences/christmas.jpg",
    location: "Family Home",
  },
];

// ----- Gallery -----
export const galleryImages: GalleryImage[] = [
  { id: "gal-1", src: "/images/gallery/family-portrait.jpg", alt: "Family Portrait", category: "Family" },
  { id: "gal-2", src: "/images/gallery/vacation-1.jpg", alt: "Beach Vacation", category: "Vacations" },
  { id: "gal-3", src: "/images/gallery/celebration-1.jpg", alt: "Birthday Celebration", category: "Celebrations" },
  { id: "gal-4", src: "/images/gallery/gathering-1.jpg", alt: "Family Gathering", category: "Gatherings" },
  { id: "gal-5", src: "/images/gallery/vacation-2.jpg", alt: "Mountain Adventure", category: "Vacations" },
  { id: "gal-6", src: "/images/gallery/celebration-2.jpg", alt: "Wedding Day", category: "Celebrations" },
  { id: "gal-7", src: "/images/gallery/family-dinner.jpg", alt: "Family Dinner", category: "Family" },
  { id: "gal-8", src: "/images/gallery/graduation.jpg", alt: "Graduation Day", category: "Celebrations" },
  { id: "gal-9", src: "/images/gallery/vacation-3.jpg", alt: "City Exploration", category: "Vacations" },
  { id: "gal-10", src: "/images/gallery/gathering-2.jpg", alt: "Sunday Lunch", category: "Gatherings" },
  { id: "gal-11", src: "/images/gallery/kids-playing.jpg", alt: "Kids Playing", category: "Family" },
  { id: "gal-12", src: "/images/gallery/holiday.jpg", alt: "Holiday Fun", category: "Vacations" },
];
