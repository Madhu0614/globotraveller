export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: number;
  category: "travel-tips" | "destinations" | "adventure" | "culture" | "community";
  image: string;
  tags: string[];
}

export const blogs: Blog[] = [
  {
    slug: "ultimate-himalayan-trekking-guide",
    title: "The Ultimate Guide to Himalayan Trekking",
    excerpt: "Everything you need to know about trekking in the Himalayas, from preparation to summit day.",
    content: `The Himalayas offer some of the world's most breathtaking trekking experiences. Whether you're a seasoned trekker or attempting your first multi-day trek, the sheer majesty of these mountains will leave you transformed.

## Why Trek the Himalayas?

The Himalayas aren't just mountains—they're a complete experience. You'll encounter diverse ecosystems, remote villages, and some of the warmest communities in India. From the green meadows of Himachal Pradesh to the barren landscapes of Ladakh, every region tells a different story.

## Best Trekking Seasons

**Spring (April-May)**: Perfect for moderate treks. Weather is stable, rhododendrons bloom, and wildflowers carpet the meadows.

**Summer (June-July)**: Higher altitude passes open up. Perfect for challenging treks like Markha Valley and Chadar Trek (in winter).

**Autumn (September-October)**: The clearest skies of the year. Ideal visibility for photography and breathtaking sunrises.

**Winter (November-February)**: The Chadar Trek (frozen river trek) is only possible now. Most other treks become snow-covered and very challenging.

## Essential Preparation Tips

1. **Physical Training**: Start training 2-3 months before. Focus on endurance and leg strength.
2. **Acclimatization**: Take it slow at higher altitudes. Ascend gradually to prevent altitude sickness.
3. **Gear Checklist**: Invest in quality boots, warm clothing, and a good backpack.
4. **Mental Preparation**: Trekking is as much mental as physical. Prepare yourself for discomfort and beautiful moments.

## Popular Himalayan Treks

From easy day hikes to challenging multi-week expeditions, the Himalayas offer it all. Some classics include the Markha Valley Trek, Chadar Trek, Kedarkantha Trek, and Kedarnath Trek.

Start with a moderate trek to gauge your fitness level and acclimatization response. Remember, it's not about conquering the mountain—it's about the journey and the people you meet along the way.`,
    author: "Priya Sharma",
    authorRole: "Senior Trek Leader",
    date: "2025-12-15",
    readingTime: 8,
    category: "travel-tips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    tags: ["trekking", "himalayas", "adventure", "tips"],
  },
  {
    slug: "local-cuisine-kerala-must-try",
    title: "Kerala's Local Cuisine: What You Must Try",
    excerpt: "Dive into the flavors of Kerala—from spicy curries to fresh seafood prepared the traditional way.",
    content: `Kerala, the land of spices, offers one of the world's most unique culinary experiences. Every dish tells a story of trade routes, cultural influences, and generations of culinary mastery.

## The Spice Heritage

Kerala's history as a spice hub during the colonial era deeply influenced its cuisine. Black pepper, cardamom, cloves, and cinnamon aren't just flavoring agents—they're the soul of Kerala cooking.

## Must-Try Dishes

**Appam and Stew**: Soft, spongy rice cakes served with creamy vegetable or fish stew. The perfect breakfast choice.

**Puttu and Kadala Curry**: A traditional breakfast combining steamed rice cake cylinders with chickpea curry.

**Kerala Fish Curry**: Fresh catch prepared with coconut milk, turmeric, and local spices. A staple in every Keralite home.

**Avial**: A vegetable dish cooked in coconut paste—simple yet bursting with flavor.

## Where to Eat

Forget fancy restaurants. The best food is found in local eateries, homestays, and family-run joints. When you visit a Globo trip to Kerala, we make sure you eat like a local, not a tourist.

## Spice Market Adventures

Visit the local spice markets to understand where these flavors come from. Watch vendors grind fresh spices, and take home some real Kerala spice blends.

Kerala's cuisine is an invitation to slow down, savor, and connect with centuries of culinary tradition.`,
    author: "Ravi Menon",
    authorRole: "Local Food Guide",
    date: "2025-11-20",
    readingTime: 6,
    category: "culture",
    image: "https://images.unsplash.com/photo-1565310503948-e51c50891abc?w=1200&h=600&fit=crop",
    tags: ["food", "kerala", "culture", "culinary"],
  },
  {
    slug: "sustainable-travel-practices",
    title: "Sustainable Travel: Making a Positive Impact",
    excerpt: "Learn how to travel responsibly and make a real difference in the communities you visit.",
    content: `Travel has the power to transform not just the traveler, but the destination and its people. Sustainable travel is about making conscious choices that benefit everyone involved.

## Understanding Sustainable Travel

It's not about visiting fewer places or sacrificing experiences. It's about being mindful of our impact and making choices that create positive change.

## Key Principles

**Support Local Communities**: Eat at local restaurants, buy from local artisans, and stay in locally-owned accommodations.

**Minimize Environmental Impact**: Respect nature, carry out what you carry in, and support eco-friendly practices.

**Respect Culture**: Learn local customs, ask before photographing people, and engage authentically.

**Travel Slow**: Spend more time in fewer places. Rush travel often means shallow experiences and higher carbon footprints.

## Practical Steps

1. Choose small group tours over large bus tours
2. Learn basic phrases in the local language
3. Eat seasonal, local food
4. Support conservation projects
5. Take public transport when possible

## The Globo Approach

At Globo Traveller, sustainability isn't an afterthought—it's our foundation. We work with local communities, source supplies locally, and ensure our trips create economic opportunities for the people we visit.

Every rupee you spend on a Globo trip contributes to local economies and conservation efforts. Travel responsibly, travel with purpose.`,
    author: "Anjali Nair",
    authorRole: "Sustainability Officer",
    date: "2025-10-12",
    readingTime: 7,
    category: "travel-tips",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop",
    tags: ["sustainability", "eco-travel", "community", "responsible-tourism"],
  },
  {
    slug: "desert-trekking-rajasthan-adventure",
    title: "Desert Trekking in Rajasthan: An Epic Adventure",
    excerpt: "Experience the golden dunes, desert camps, and starry nights of Rajasthan's magnificent deserts.",
    content: `Rajasthan's deserts offer an entirely different trekking experience. No lush greenery, no flowing streams—just endless sand, dramatic skies, and a sense of timelessness.

## Why Trek the Desert?

The desert strips away distractions and brings you face-to-face with nature's raw beauty. Sunsets that paint the sky in impossible colors, nights with stars so bright you feel you can touch them, and the silence that somehow feels loud.

## Sam and Khuri Dunes

The Sam Dunes near Jaisalmer and Khuri Dunes offer accessible desert trekking. You can combine sand trekking with camel rides, village visits, and nights under the stars.

## Desert Essentials

**Protection from Sun**: Sunscreen, hats, and light clothing are non-negotiable.

**Hydration**: Carry more water than you think you'll need. The desert is deceptively thirsty.

**Footwear**: Desert boots with good ankle support are ideal.

**Timing**: Trek early morning to avoid the midday heat.

## The Desert Community

Meet the desert communities—their warmth contrasts sharply with the barren landscape. Learn about their traditions, trade routes, and ancient stories.

## Stargazing Magic

One of the desert's greatest gifts is the night sky. Away from city lights, you'll see hundreds of stars. The Milky Way becomes visible, and the universe suddenly feels very present.

Desert trekking is a journey inward as much as it is outward. Come find what the desert wants to teach you.`,
    author: "Vikram Singh",
    authorRole: "Adventure Lead",
    date: "2025-09-08",
    readingTime: 6,
    category: "adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    tags: ["desert", "rajasthan", "trekking", "adventure"],
  },
  {
    slug: "meeting-locals-authentic-travel",
    title: "The Art of Meeting Locals: Authentic Travel Stories",
    excerpt: "How genuine connections with local people transform a trip from a vacation into a life-changing experience.",
    content: `The most memorable moments from travel rarely come from tourist attractions. They come from conversations with strangers who become friends, shared meals, and moments of genuine human connection.

## Why Local Connections Matter

When you meet locals authentically, you see a place through its real story, not a curated tourist narrative. You understand the culture, the challenges, and the dreams of the people who call this place home.

## How to Connect Authentically

**Learn the Language**: Even basic phrases show respect and open doors. "Namaste," "Thank you," and "How are you?" work wonders.

**Eat Where They Eat**: Skip the tourist restaurants. Street food, local markets, and family-run dhabas are where you'll find real connections.

**Slow Down**: Spend time in one place. Quick tours don't create space for relationships.

**Ask Real Questions**: Show genuine curiosity about their lives, not just their tourist attractions.

## Stories from the Road

Our Globo community is full of stories—friendships formed in hill station cafes, business connections made during treks, and life lessons learned from humble homestay owners.

One traveler met a local farmer in Himachal Pradesh and now visits every year to help with the harvest. Another learned traditional cooking in a Kerala home and now teaches those recipes back home.

## The Globo Difference

Our small group approach and long stays create the perfect conditions for authentic connections. You're not just visiting—you're becoming part of a community, even if temporarily.

Travel to meet people. Everything else will follow.`,
    author: "Deepak Kumar",
    authorRole: "Community Builder",
    date: "2025-08-25",
    readingTime: 5,
    category: "community",
    image: "https://images.unsplash.com/photo-1488391409021-c27173b8235c?w=1200&h=600&fit=crop",
    tags: ["travel", "culture", "community", "authentic-experiences"],
  },
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

export function getBlogsByCategory(category: Blog["category"]): Blog[] {
  return blogs.filter((blog) => blog.category === category).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllBlogCategories(): Blog["category"][] {
  return ["travel-tips", "destinations", "adventure", "culture", "community"];
}
