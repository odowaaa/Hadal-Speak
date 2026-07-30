import type { Lesson } from "@shared/schema";

type LessonSeed = Omit<Lesson, "id">;

const lessonSeeds: LessonSeed[] = [
  // Level 1 - Beginner
  {
    level: 1,
    lessonNumber: 1,
    title: "Greetings",
    english: "Hello! How are you?",
    somali: "Nabad! Sidee tahay?",
    keyWords: {
      "Hello": "Nabad",
      "You": "Adiga",
      "How": "Sidee",
      "Are": "Tahay"
    }
  },
  {
    level: 1,
    lessonNumber: 2,
    title: "Introducing Yourself",
    english: "My name is Amina. I am from Somalia.",
    somali: "Magacaygu waa Amina. Waxaan ka imid Soomaaliya.",
    keyWords: {
      "My": "Kayga",
      "Name": "Magac",
      "From": "Ka",
      "Somalia": "Soomaaliya"
    }
  },
  {
    level: 1,
    lessonNumber: 3,
    title: "Asking for Help",
    english: "Please help me.",
    somali: "Fadlan i caawi.",
    keyWords: {
      "Please": "Fadlan",
      "Help": "Caawi",
      "Me": "I"
    }
  },
  {
    level: 1,
    lessonNumber: 4,
    title: "Buying Food",
    english: "I want to buy bread and milk.",
    somali: "Waxaan rabaa inaan iibsado rooti iyo caano.",
    keyWords: {
      "Want": "Rabaa",
      "Buy": "Iibsado",
      "Bread": "Rooti",
      "Milk": "Caano"
    }
  },
  {
    level: 1,
    lessonNumber: 5,
    title: "Numbers & Time",
    english: "It is 5 o'clock.",
    somali: "Waa shan saac.",
    keyWords: {
      "Five": "Shan",
      "Clock": "Saac",
      "Time": "Waqti"
    }
  },
  {
    level: 1,
    lessonNumber: 6,
    title: "At Home",
    english: "This is my house.",
    somali: "Tani waa gurigayga.",
    keyWords: {
      "This": "Tani",
      "House": "Guri",
      "My": "Kayga"
    }
  },
  {
    level: 1,
    lessonNumber: 7,
    title: "Days of the Week",
    english: "Today is Monday.",
    somali: "Maanta waa Isniin.",
    keyWords: {
      "Today": "Maanta",
      "Monday": "Isniin",
      "Day": "Maalin"
    }
  },

  // Level 2 - Intermediate
  {
    level: 2,
    lessonNumber: 1,
    title: "At the Clinic",
    english: "I have a headache. I need to see a doctor.",
    somali: "Madaxa ayaa i xanuunaya. Waxaan u baahanahay inaan arko dhakhtar.",
    keyWords: {
      "Headache": "Madax xanuun",
      "Doctor": "Dhakhtar",
      "Need": "U baahan"
    }
  },
  {
    level: 2,
    lessonNumber: 2,
    title: "Asking Directions",
    english: "Where is the market?",
    somali: "Suuqii xaggee ku yaal?",
    keyWords: {
      "Where": "Xaggee",
      "Market": "Suuq",
      "Located": "Ku yaal"
    }
  },
  {
    level: 2,
    lessonNumber: 3,
    title: "At the Workplace",
    english: "I am working in an office.",
    somali: "Waxaan ka shaqeeyaa xafiis.",
    keyWords: {
      "Working": "Shaqeeyaa",
      "Office": "Xafiis",
      "Job": "Shaqo"
    }
  },
  {
    level: 2,
    lessonNumber: 4,
    title: "Talking About Weather",
    english: "It is hot today.",
    somali: "Maanta waa kulayl.",
    keyWords: {
      "Hot": "Kulayl",
      "Weather": "Cimilo",
      "Today": "Maanta"
    }
  },
  {
    level: 2,
    lessonNumber: 5,
    title: "Visiting Someone",
    english: "I am coming to visit you tomorrow.",
    somali: "Berri ayaan kuu imaanayaa booqasho.",
    keyWords: {
      "Visit": "Booqasho",
      "Tomorrow": "Berri",
      "Coming": "Imaanayaa"
    }
  },
  {
    level: 2,
    lessonNumber: 6,
    title: "Shopping",
    english: "How much does this cost?",
    somali: "Imisa ayuu kani ku kacayaa?",
    keyWords: {
      "How much": "Imisa",
      "Cost": "Ku kacayaa",
      "Price": "Qiimo"
    }
  },
  {
    level: 2,
    lessonNumber: 7,
    title: "Calling a Taxi",
    english: "I need a taxi to go to the hospital.",
    somali: "Waxaan u baahanahay taksi aan ku tago isbitaalka.",
    keyWords: {
      "Taxi": "Taksi",
      "Hospital": "Isbitaal",
      "Go": "Tago"
    }
  },

  // Level 3 - Advanced
  {
    level: 3,
    lessonNumber: 1,
    title: "Expressing Opinions",
    english: "I think education is very important.",
    somali: "Waxaan u maleynayaa in waxbarashadu aad muhiim u tahay.",
    keyWords: {
      "Think": "U maleynayaa",
      "Education": "Waxbarash",
      "Important": "Muhiim"
    }
  },
  {
    level: 3,
    lessonNumber: 2,
    title: "Applying for a Job",
    english: "I would like to apply for this job because I have experience.",
    somali: "Waxaan jeclaan lahaa inaan codsado shaqadan sababtoo ah waayo-aragnimo ayaan leeyahay.",
    keyWords: {
      "Apply": "Codsado",
      "Experience": "Waayo-aragnimo",
      "Because": "Sababtoo ah"
    }
  },
  {
    level: 3,
    lessonNumber: 3,
    title: "Solving a Problem",
    english: "We need to find a solution together.",
    somali: "Waa inaan helnaa xal aan wada leenahay.",
    keyWords: {
      "Solution": "Xal",
      "Together": "Wada",
      "Problem": "Dhibaato"
    }
  },
  {
    level: 3,
    lessonNumber: 4,
    title: "Telling a Story",
    english: "Last year, I traveled to Mogadishu and met many people.",
    somali: "Sanadkii hore, waxaan u safray Muqdisho oo dad badan ayaan la kulmay.",
    keyWords: {
      "Last year": "Sanadkii hore",
      "Traveled": "U safray",
      "Met": "La kulmay"
    }
  },
  {
    level: 3,
    lessonNumber: 5,
    title: "Talking About Feelings",
    english: "I feel happy when I help others.",
    somali: "Waan farxaa markaan dadka kale caawiyo.",
    keyWords: {
      "Feel": "Farxaa",
      "Happy": "Farxad",
      "Help": "Caawiyo"
    }
  },
  {
    level: 3,
    lessonNumber: 6,
    title: "Describing a Problem",
    english: "There is a water leak in the kitchen.",
    somali: "Waxaa jira biyaha oo daadanaya jikada.",
    keyWords: {
      "Water": "Biyaha",
      "Leak": "Daadanaya",
      "Kitchen": "Jikada"
    }
  },
  {
    level: 3,
    lessonNumber: 7,
    title: "Making a Suggestion",
    english: "Let's meet at 4 o'clock to discuss the plan.",
    somali: "Aan isugu nimaadno afarta si aan uga hadalno qorshaha.",
    keyWords: {
      "Meet": "Isugu nimaadno",
      "Discuss": "Uga hadalno",
      "Plan": "Qorshaha"
    }
  }
];

// Deterministic IDs (rather than random UUIDs) so localStorage-saved
// progress keeps pointing at the same lesson across app restarts.
export const lessonsData: Lesson[] = lessonSeeds.map((seed) => ({
  ...seed,
  id: `level${seed.level}-lesson${seed.lessonNumber}`
}));

export function getLessonsByLevel(level: number): Lesson[] {
  return lessonsData.filter((lesson) => lesson.level === level);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessonsData.find((lesson) => lesson.id === id);
}
