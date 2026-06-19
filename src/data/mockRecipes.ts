export interface Recipe {
  id: string;
  title: string;
  koreanName: string;
  thumbnail: string;
  spicyLevel: number;
  tasteProfile: string[];
  category: "Stew" | "Noodle" | "Rice" | "Meat" | "Vegan" | "Street Food";
  prepTime: string;
  sourceUrl: string;
}

export const mockRecipes: Recipe[] = [
  {
    id: "rec_1",
    title: "Spicy & Sweet Rice Cakes (Tteokbokki)",
    koreanName: "떡볶이",
    thumbnail: "/images/tteokbokki.png",
    spicyLevel: 4,
    tasteProfile: ["Spicy", "Sweet", "Umami"],
    category: "Street Food",
    prepTime: "20m",
    sourceUrl: "https://www.maangchi.com/recipe/tteokbokki"
  },
  {
    id: "rec_2",
    title: "Charcoal Grilled Ribeye Bulgogi",
    koreanName: "불고기",
    thumbnail: "/images/bulgogi.png",
    spicyLevel: 0,
    tasteProfile: ["Sweet", "Salty", "Umami"],
    category: "Meat",
    prepTime: "45m",
    sourceUrl: "https://www.maangchi.com/recipe/bulgogi"
  },
  {
    id: "rec_3",
    title: "Healthy Assorted Veggie Bibimbap",
    koreanName: "비빔밥",
    thumbnail: "/images/bibimbap.png",
    spicyLevel: 2,
    tasteProfile: ["Umami", "Spicy", "Sweet"],
    category: "Rice",
    prepTime: "30m",
    sourceUrl: "https://www.maangchi.com/recipe/bibimbap"
  },
  {
    id: "rec_4",
    title: "Premium Steak Chapaguri (Ram-don)",
    koreanName: "짜파구리",
    thumbnail: "/images/chapaguri.png",
    spicyLevel: 3,
    tasteProfile: ["Salty", "Umami", "Spicy"],
    category: "Noodle",
    prepTime: "15m",
    sourceUrl: "https://www.maangchi.com/recipe/ram-don"
  },
  {
    id: "rec_5",
    title: "Authentic Aged Kimchi Stew (Kimchi Jjigae)",
    koreanName: "김치찌개",
    thumbnail: "/images/kimchi_jjigae.png",
    spicyLevel: 4,
    tasteProfile: ["Spicy", "Salty", "Umami"],
    category: "Stew",
    prepTime: "30m",
    sourceUrl: "https://www.maangchi.com/recipe/kimchi-jjigae"
  },
  {
    id: "rec_6",
    title: "Classic Sesame Rice Rolls (Kimbap)",
    koreanName: "김밥",
    thumbnail: "/images/kimbap.png",
    spicyLevel: 0,
    tasteProfile: ["Salty", "Sweet", "Umami"],
    category: "Vegan",
    prepTime: "25m",
    sourceUrl: "https://www.maangchi.com/recipe/gimbap"
  },
  {
    id: "rec_7",
    title: "Black Bean Noodles (Jajangmyeon)",
    koreanName: "짜장면",
    thumbnail: "/images/jajangmyeon.png",
    spicyLevel: 0,
    tasteProfile: ["Salty", "Sweet", "Umami"],
    category: "Noodle",
    prepTime: "30m",
    sourceUrl: "https://www.maangchi.com/recipe/jajangmyeon"
  },
  {
    id: "rec_8",
    title: "Crispy Grilled Pork Belly (Samgyeopsal)",
    koreanName: "삼겹살",
    thumbnail: "/images/samgyeopsal.png",
    spicyLevel: 1,
    tasteProfile: ["Salty", "Umami"],
    category: "Meat",
    prepTime: "20m",
    sourceUrl: "https://www.maangchi.com/recipe/samgyeopsal-gui"
  },
  {
    id: "rec_9",
    title: "Sweet & Spicy Yangnyeom Fried Chicken",
    koreanName: "양념치킨",
    thumbnail: "/images/yangnyeom_chicken.png",
    spicyLevel: 3,
    tasteProfile: ["Sweet", "Spicy", "Umami"],
    category: "Street Food",
    prepTime: "40m",
    sourceUrl: "https://www.maangchi.com/recipe/yangnyeom-tongdak"
  },
  {
    id: "rec_10",
    title: "Silken Tofu Stew (Sundubu Jjigae)",
    koreanName: "순두부찌개",
    thumbnail: "/images/sundubu_jjigae.png",
    spicyLevel: 4,
    tasteProfile: ["Spicy", "Umami", "Salty"],
    category: "Stew",
    prepTime: "20m",
    sourceUrl: "https://www.maangchi.com/recipe/sundubu-jjigae"
  }
];
