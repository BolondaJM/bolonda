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
    name: "Papa Bolonda",
    role: "Family Patriarch",
    bio: "A dedicated father and community leader with over 30 years of experience in business and mentorship. Passionate about bringing the family together and building a lasting legacy.",
    image: "/images/family/member-1.jpg",
  },
  {
    id: "member-2",
    name: "Mama Bolonda",
    role: "Family Matriarch",
    bio: "The heart and soul of the Bolonda family. An incredible cook, a caring mother, and a wise counselor who keeps everyone grounded and united.",
    image: "/images/family/member-2.jpg",
  },
  {
    id: "member-3",
    name: "David Bolonda",
    role: "Software Engineer",
    bio: "A tech enthusiast who builds digital solutions. Passionate about using technology to solve real-world problems and empower the next generation.",
    image: "/images/family/member-3.jpg",
  },
  {
    id: "member-4",
    name: "Grace Bolonda",
    role: "Medical Professional",
    bio: "Dedicated to healthcare and community wellness. Combines medical expertise with compassion to serve those in need.",
    image: "/images/family/member-4.jpg",
  },
  {
    id: "member-5",
    name: "Samuel Bolonda",
    role: "Educator & Writer",
    bio: "A passionate educator and published author who believes in the power of knowledge to transform lives and communities.",
    image: "/images/family/member-5.jpg",
  },
];

// ----- Services -----
export const services: Service[] = [
  {
    id: "service-1",
    title: "Business Consulting",
    description: "Strategic guidance for small businesses and startups. From planning to execution, get expert advice to grow your venture.",
    icon: "briefcase",
    memberName: "Papa Bolonda",
    memberId: "member-1",
  },
  {
    id: "service-2",
    title: "Catering & Event Cooking",
    description: "Authentic home-cooked meals and catering services for events, celebrations, and gatherings of all sizes.",
    icon: "utensils",
    memberName: "Mama Bolonda",
    memberId: "member-2",
  },
  {
    id: "service-3",
    title: "Web & App Development",
    description: "Custom websites, web applications, and mobile apps built with modern technologies. From concept to deployment.",
    icon: "code",
    memberName: "David Bolonda",
    memberId: "member-3",
  },
  {
    id: "service-4",
    title: "Health & Wellness Consultation",
    description: "Professional health consultations and wellness programs tailored to your individual needs and goals.",
    icon: "heart",
    memberName: "Grace Bolonda",
    memberId: "member-4",
  },
  {
    id: "service-5",
    title: "Tutoring & Writing Services",
    description: "Academic tutoring, essay writing assistance, and content creation for students and professionals.",
    icon: "book",
    memberName: "Samuel Bolonda",
    memberId: "member-5",
  },
  {
    id: "service-6",
    title: "Mentorship Programs",
    description: "One-on-one and group mentorship sessions focused on personal development, career growth, and life skills.",
    icon: "users",
    memberName: "Papa Bolonda",
    memberId: "member-1",
  },
];

// ----- Blog Posts & Articles -----
export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Bolonda Family Reunion 2025",
    excerpt: "A heartwarming recap of our annual family reunion, filled with laughter, stories, and unforgettable memories.",
    content: "Every year, the Bolonda family comes together to celebrate our bonds, share stories, and create new memories...",
    author: "Mama Bolonda",
    date: "2025-12-15",
    category: "blog",
    image: "/images/blog/reunion.jpg",
    readTime: "5 min read",
  },
  {
    id: "post-2",
    title: "Building a Legacy: Lessons from Our Elders",
    excerpt: "Wisdom passed down through generations - how the Bolonda family values have shaped who we are today.",
    content: "In every family, there are lessons that transcend time. The Bolonda family has always valued...",
    author: "Samuel Bolonda",
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
    author: "Papa Bolonda",
    date: "2025-10-05",
    category: "article",
    image: "/images/blog/journey.jpg",
    readTime: "10 min read",
  },
  {
    id: "post-4",
    title: "Cooking with Love: Family Recipes",
    excerpt: "Discover the secret family recipes that have brought us together around the dinner table for decades.",
    content: "Food is more than just sustenance in the Bolonda household. It is love served on a plate...",
    author: "Mama Bolonda",
    date: "2025-09-12",
    category: "blog",
    image: "/images/blog/cooking.jpg",
    readTime: "6 min read",
  },
  {
    id: "post-5",
    title: "Technology and Family: Staying Connected",
    excerpt: "How modern technology helps the Bolonda family stay connected across distances and time zones.",
    content: "In today's digital age, staying connected with family has never been easier...",
    author: "David Bolonda",
    date: "2025-08-28",
    category: "blog",
    image: "/images/blog/tech.jpg",
    readTime: "4 min read",
  },
  {
    id: "post-6",
    title: "Health Tips for the Whole Family",
    excerpt: "Simple and practical health tips that every family member can follow to live a healthier, happier life.",
    content: "Taking care of your health doesn't have to be complicated...",
    author: "Grace Bolonda",
    date: "2025-07-15",
    category: "article",
    image: "/images/blog/health.jpg",
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
    title: "David's Graduation Ceremony",
    description: "Celebrating David's achievement as he graduated with honors in Computer Science. A proud moment for the whole family.",
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
