import fs from 'fs';
import path from 'path';
import type { User, Post } from '../types';

const users: Omit<User, 'id'>[] = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@finnet.com",
    company: { name: "FinnetTrust" },
    address: { street: "123 Blockchain Blvd", city: "San Francisco" }
  },
  {
    name: "Michael Chen",
    email: "michael.chen@finnet.com",
    company: { name: "FinnetTrust" },
    address: { street: "456 Crypto Lane", city: "New York" }
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@finnet.com",
    company: { name: "FinnetTrust" },
    address: { street: "789 Fintech Ave", city: "Austin" }
  },
  {
    name: "David Kim",
    email: "david.kim@finnet.com",
    company: { name: "FinnetTrust" },
    address: { street: "101 Innovation Drive", city: "Seattle" }
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@finnet.com",
    company: { name: "FinnetTrust" },
    address: { street: "202 Digital Way", city: "Boston" }
  }
];

const generatePosts = (userId: number): Omit<Post, 'id'>[] => {
  const postTitles = [
    "The Future of Digital Banking",
    "How Blockchain is Changing Finance",
    "My Journey in Fintech",
    "Investment Strategies for 2024",
    "Understanding Crypto Markets",
    "Risk Management in Trading",
    "The Rise of DeFi",
    "Women in Fintech Leadership",
    "Sustainable Investing",
    "AI in Financial Services",
    "The Psychology of Money",
    "Building Trust in Digital Finance",
    "Financial Freedom Through Tech",
    "The Future of Payments",
    "Personal Finance Tips"
  ];

  const postBodies = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur."
  ];

  const posts: Omit<Post, 'id'>[] = [];
  const startIdx = (userId - 1) * 3;
  
  for (let i = 0; i < 3; i++) {
    const idx = (startIdx + i) % postTitles.length;
    posts.push({
      userId,
      title: postTitles[idx]!,
      body: postBodies[i % postBodies.length]!,
      createdAt: new Date(Date.now() - i * 86400000).toISOString()
    });
  }
  
  return posts;
};

const seed = (): void => {
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const usersWithIds = users.map((user, index) => ({
    ...user,
    id: index + 1
  }));
  fs.writeFileSync(
    path.join(dataDir, 'users.json'),
    JSON.stringify(usersWithIds, null, 2)
  );

  const allPosts: Omit<Post, 'id'>[] = [];
  usersWithIds.forEach(user => {
    const posts = generatePosts(user.id);
    allPosts.push(...posts);
  });

  const postsWithIds = allPosts.map((post, index) => ({
    ...post,
    id: index + 1
  }));
  fs.writeFileSync(
    path.join(dataDir, 'posts.json'),
    JSON.stringify(postsWithIds, null, 2)
  );

  console.log('Database seeded successfully!');
  console.log(`${usersWithIds.length} users created`);
  console.log(`${postsWithIds.length} posts created`);
  console.log('\nUsers:');
  usersWithIds.forEach(u => console.log(`  ${u.id}. ${u.name} (${u.email})`));
};

seed();