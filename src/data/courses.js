// export interface Lesson {
//   id: string;
//   title: string;
//   duration: string;
//   audioUrl: string;
//   completed: boolean;
//   type: "audio" | "live";
// }

// export interface Quiz {
//   id: string;
//   question: string;
//   options: string[];
//   correctIndex: number;
// }

// export interface Course {
//   id: string;
//   title: string;
//   titleAr: string;
//   description: string;
//   instructor: string;
//   category: string;
//   icon: string;
//   totalLessons: number;
//   completedLessons: number;
//   color: string;
//   lessons: Lesson[];
//   quizzes: Quiz[];
// }

// export interface CommunityQuestion {
//   id: string;
//   courseId: string;
//   author: string;
//   question: string;
//   answer?: string;
//   date: string;
// }

const PUBLIC_BASE_URL="https://nmdetbbectwrrsgargmo.supabase.co/storage/v1/object/public";
const FIQH_DIR = "delice-des-coeurs/fiqh/livres/Adourraroul_Bihiya";
// export const courses: Course[] = [
// console.log(`${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-01.mp3`)
export const courses = [
 
  {
    id: "fiqh",
    title: "Fiqh",
    titleAr: "الفقه",
    description: "Islamic jurisprudence covering worship, transactions, and daily life matters.",
    instructor: "Imam Idriss Samake",
    book: "Adourraroul Bihiya",
    author: "Imam Shawkani",
    category: "Fiqh",
    icon: "⚖️",
    totalLessons: 38,
    completedLessons: 3,
    color: "primary",
    lessons: [
      { id: "f1", 
        chapter: "Introduction",
        title: "Introduction Générale au Fiqh", 
        duration: "1:00:17", 
        audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-01.mp3`, 
        completed: true, 
        type: "audio" 
      },
      { id: "f2", chapter: "La purification", title: "Les types d’eaux (Partie 1)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-02-a.mp3`, completed: true, type: "audio" },
      { id: "f2.2", chapter: "La purification", title: "Les types d’eaux (Partie 2)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-02-b.mp3`, completed: true, type: "audio" },
      { id: "f2.3", chapter: "La purification", title: "Les types d’eaux (Partie 3)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-02-c.mp3`, completed: false, type: "audio" },
      { id: "f3", chapter: "La purification", title: "Les impuretés", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-03.mp3`, completed: false, type: "audio" },
      { id: "f4", chapter: "La purification", title: "Le nettoyage des impuretés", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-04.mp3`, completed: false, type: "audio" },
      { id: "f5", chapter: "La purification", title: "Les règles de la satisfaction des besoins", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-05.mp3`, completed: false, type: "audio" },
      { id: "f6", chapter: "La purification", title: "Ablution : définition, mérites, conditions, obligation etc.", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-06.mp3`, completed: false, type: "audio" },
      { id: "f7", chapter: "La purification", title: "Ablution : les Sunnah des ablutions", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-07.mp3`, completed: false, type: "audio" },
      { id: "f8", chapter: "La purification", title: "Les annulatifs des ablutions (Partie 1)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-08-a.mp3`, completed: false, type: "audio" },
      { id: "f8.2", chapter: "La purification", title: "Les annulatifs des ablutions (Partie 2)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-08-b.mp3`, completed: false, type: "audio" },
      { id: "f9", chapter: "La purification", title: "Les causes du grand bain", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-09.mp3`, completed: false, type: "audio" },
      { id: "f10", chapter: "La purification", title: "La description du grand bain et ses Sunnah", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-10.mp3`, completed: false, type: "audio" },
      { id: "f11", chapter: "La purification", title: "Les lavages recommandés", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-11.mp3`, completed: false, type: "audio" },
      { id: "f12", chapter: "La purification", title: "L’ablution sèche", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-12.mp3`, completed: false, type: "audio" },
      { id: "f13", chapter: "La purification", title: "Les menstrues", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-13.mp3`, completed: false, type: "audio" },

      { id: "f14", chapter: "La prière", title: "Definition, importance et statut", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-14.mp3`, completed: false, type: "audio" },
      { id: "f15", chapter: "La prière", title: "Les heures de prière", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-15.mp3`, completed: false, type: "audio" },
      { id: "f16", chapter: "La prière", title: "L'appel à la prière (Azan) (Partie 1)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-16-a.mp3`, completed: false, type: "audio" },
      { id: "f16.2", chapter: "La prière", title: "L'appel à la prière (Azan) (Partie 2)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-16-b.mp3`, completed: false, type: "audio" },
      { id: "f17", chapter: "La prière", title: "Les conditions de la prière", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-17.mp3`, completed: false, type: "audio" },
      { id: "f18", chapter: "La prière", title: "La description de la prière", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-18.mp3`, completed: false, type: "audio" },
      { id: "f19", chapter: "La prière", title: "Les annulatifs de la prière", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-19.mp3`, completed: false, type: "audio" },
      { id: "f20", chapter: "La prière", title: "Les conditions d'obligation de la prière et la prière du malade", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-20.mp3`, completed: false, type: "audio" },
      { id: "f21", chapter: "La prière", title: "La prière surérogatoire", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-21.mp3`, completed: false, type: "audio" },
      { id: "f22", chapter: "La prière", title: "La prière en groupe", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-22.mp3`, completed: false, type: "audio" },
      { id: "f23", chapter: "La prière", title: "La prosternation de l'oubli", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-23.mp3`, completed: false, type: "audio" },
      { id: "f24", chapter: "La prière", title: "La prière du Vendredi", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-24.mp3`, completed: false, type: "audio" },
      { id: "f25", chapter: "La prière", title: "La prière des deux fêtes", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-25.mp3`, completed: false, type: "audio" },
      { id: "f26", chapter: "La prière", title: "La prière de la peur", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-26.mp3`, completed: false, type: "audio" },
      { id: "f27", chapter: "La prière", title: "La prière du voyage", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-27.mp3`, completed: false, type: "audio" },
      { id: "f28", chapter: "La prière", title: "La prière de l'éclipse", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-28.mp3`, completed: false, type: "audio" },
      { id: "f29", chapter: "La prière", title: "La prière de la demande de pluie", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-29.mp3`, completed: false, type: "audio" },

      { id: "f30", chapter: "La Zakat", title: "Definition, importance, statut, Conditions d'obligation, Biens soumis à la Zakat, Règles de bienséance", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-30.mp3`, completed: false, type: "audio" },
      { id: "f31", chapter: "La Zakat", title: "La Zakat des animaux (Partie 1)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-31-a.mp3`, completed: false, type: "audio" },
      { id: "f31.2", chapter: "La Zakat", title: "La Zakat des animaux (Partie 2)", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-31-b.mp3`, completed: false, type: "audio" },
      { id: "f32", chapter: "La Zakat", title: "Zakat des monnaies", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-32.mp3`, completed: false, type: "audio" },
      { id: "f33", chapter: "La Zakat", title: "La Zakat sur les récoltes", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-33.mp3`, completed: false, type: "audio" },
      { id: "f34", chapter: "La Zakat", title: "Les ayants droit de la Zakat", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-34.mp3`, completed: false, type: "audio" },
      { id: "f35", chapter: "La Zakat", title: "Zakat-Ul-Zitr", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-35.mp3`, completed: false, type: "audio" },
      { id: "f36", chapter: "La Zakat", title: "Questions liées à la Zakat", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-36.mp3`, completed: false, type: "audio" },
      { id: "f37", chapter: "La Zakat", title: "Quelques détails sur la Zakat", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-37.mp3`, completed: false, type: "audio" },
      { id: "f38", chapter: "La Zakat", title: "L'importance de l'aumône", duration: "00:00:00", audioUrl: `${PUBLIC_BASE_URL}/${FIQH_DIR}/cours-38.mp3`, completed: false, type: "audio" },
      
    ],
    quizzes: [],
  },
  {
    id: "quran",
    title: "Tafsir",
    titleAr: "دراسات القرآن",
    description: "Learn Quran recitation, tajweed rules, and tafseer of selected surahs.",
    instructor: "Imam Allassane Bakayoko",
    book: "",
    author: "",
    category: "Quran",
    icon: "📖",
    totalLessons: 12,
    completedLessons: 5,
    color: "primary",
    lessons: [
      // { id: "q1", title: "Introduction to Tajweed", duration: "32:15", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", completed: true, type: "audio" },
      // { id: "q2", title: "Makharij al-Huroof", duration: "45:30", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", completed: true, type: "audio" },
      // { id: "q3", title: "Rules of Noon Sakinah", duration: "38:20", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", completed: true, type: "audio" },
      // { id: "q4", title: "Rules of Meem Sakinah", duration: "28:10", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", completed: true, type: "audio" },
      // { id: "q5", title: "Al-Madd (Prolongation)", duration: "41:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", completed: true, type: "audio" },
      // { id: "q6", title: "Tafseer: Surah Al-Fatiha", duration: "55:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", completed: false, type: "audio" },
      // { id: "q7", title: "Tafseer: Surah Al-Baqarah (1-5)", duration: "1:02:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", completed: false, type: "audio" },
      // { id: "q8", title: "Tafseer: Surah Al-Baqarah (6-20)", duration: "58:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", completed: false, type: "audio" },
      // { id: "q9", title: "Waqf and Ibtidaa", duration: "35:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", completed: false, type: "audio" },
      // { id: "q10", title: "Revision & Practice Session", duration: "40:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", completed: false, type: "audio" },
      { id: "q11", title: "Live Q&A Session", duration: "1:00:00", audioUrl: "", completed: false, type: "live" },
      // { id: "q12", title: "Final Review", duration: "45:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", completed: false, type: "audio" },
    ],
    quizzes: [
      { id: "qq1", question: "What is Tajweed?", options: ["Speed reading", "Science of proper Quran recitation", "Arabic grammar", "Hadith study"], correctIndex: 1 },
      { id: "qq2", question: "How many Makharij (articulation points) are there?", options: ["10", "14", "17", "20"], correctIndex: 2 },
    ],
  },
  {
    id: "hadith",
    title: "Hadith",
    titleAr: "علوم الحديث",
    description: "Study of prophetic traditions, their classification, and authentication.",
    instructor: "Imam Idriss Samake",
    book: "100 Hadith pour la memorisation",
    author: "",
    category: "Hadith",
    icon: "📜",
    totalLessons: 10,
    completedLessons: 3,
    color: "secondary",
    lessons: [
      // { id: "h1", title: "What is Hadith?", duration: "30:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", completed: true, type: "audio" },
      // { id: "h2", title: "Classification of Hadith", duration: "42:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", completed: true, type: "audio" },
      // { id: "h3", title: "The Isnad System", duration: "38:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", completed: true, type: "audio" },
      // { id: "h4", title: "Sahih al-Bukhari Introduction", duration: "50:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", completed: false, type: "audio" },
      // { id: "h5", title: "Sahih Muslim Introduction", duration: "48:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", completed: false, type: "audio" },
      // { id: "h6", title: "40 Hadith of Imam Nawawi (1-10)", duration: "55:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", completed: false, type: "audio" },
      // { id: "h7", title: "40 Hadith of Imam Nawawi (11-20)", duration: "52:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", completed: false, type: "audio" },
      // { id: "h8", title: "40 Hadith of Imam Nawawi (21-30)", duration: "49:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", completed: false, type: "audio" },
      // { id: "h9", title: "40 Hadith of Imam Nawawi (31-42)", duration: "53:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", completed: false, type: "audio" },
      { id: "h10", title: "Live Sur Google Meet", duration: "1:00:00", audioUrl: "", completed: false, type: "live" },
    ],
    quizzes: [
      { id: "hq1", question: "What is an Isnad?", options: ["The text of a hadith", "The chain of narrators", "A type of hadith book", "A hadith ruling"], correctIndex: 1 },
    ],
  },
  {
    id: "aqeedah",
    title: "Aqeedah",
    titleAr: "العقيدة",
    description: "Islamic creed and theology — the six pillars of faith and related topics.",
    instructor: "Imam A. Bakayoko",
    book: "Ar-Rissala d'Ibn Abi Zayd",
    author: "",
    category: "Aqeedah",
    icon: "🌙",
    totalLessons: 8,
    completedLessons: 0,
    color: "secondary",
    lessons: [
      // { id: "ak1", title: "What is Aqeedah?", duration: "30:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", completed: true, type: "audio" },
      // { id: "ak2", title: "Belief in Allah", duration: "50:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", completed: true, type: "audio" },
      // { id: "ak3", title: "Belief in the Angels", duration: "35:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", completed: true, type: "audio" },
      // { id: "ak4", title: "Belief in the Books", duration: "38:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", completed: true, type: "audio" },
      // { id: "ak5", title: "Belief in the Prophets", duration: "42:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", completed: false, type: "audio" },
      // { id: "ak6", title: "Belief in the Day of Judgment", duration: "45:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", completed: false, type: "audio" },
      // { id: "ak7", title: "Belief in Qadr (Divine Decree)", duration: "40:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", completed: false, type: "audio" },
      // { id: "ak8", title: "Shirk and its Categories", duration: "48:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", completed: false, type: "audio" },
    ],
    quizzes: [
      { id: "akq1", question: "How many pillars of Iman are there?", options: ["4", "5", "6", "7"], correctIndex: 2 },
    ],
  },

  {
    id: "arabic",
    title: "Langue Arabe",
    titleAr: "اللغة العربية",
    description: "Learn Arabic grammar (Nahw), morphology (Sarf), and conversational Arabic.",
    instructor: "Ustadha Maryam",
    category: "Arabic",
    icon: "✍️",
    totalLessons: 15,
    completedLessons: 2,
    color: "primary",
    lessons: [
      // { id: "a1", title: "Arabic Alphabet & Pronunciation", duration: "30:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", completed: true, type: "audio" },
      // { id: "a2", title: "Basic Vocabulary", duration: "35:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", completed: true, type: "audio" },
      // { id: "a3", title: "Sentence Structure (Jumlah Ismiyyah)", duration: "40:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", completed: false, type: "audio" },
      // { id: "a4", title: "Sentence Structure (Jumlah Fi'liyyah)", duration: "42:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", completed: false, type: "audio" },
      // { id: "a5", title: "Pronouns & Demonstratives", duration: "28:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", completed: false, type: "audio" },
      // { id: "a6", title: "Verb Conjugation (Past Tense)", duration: "45:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", completed: false, type: "audio" },
      // { id: "a7", title: "Verb Conjugation (Present Tense)", duration: "45:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", completed: false, type: "audio" },
      // { id: "a8", title: "Prepositions", duration: "25:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", completed: false, type: "audio" },
      // { id: "a9", title: "Adjectives & Descriptions", duration: "32:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", completed: false, type: "audio" },
      // { id: "a10", title: "Numbers & Counting", duration: "30:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", completed: false, type: "audio" },
      // { id: "a11", title: "Conversation Practice 1", duration: "35:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", completed: false, type: "audio" },
      // { id: "a12", title: "Reading Practice", duration: "38:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", completed: false, type: "audio" },
      // { id: "a13", title: "Nahw (Grammar) Fundamentals", duration: "50:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", completed: false, type: "audio" },
      // { id: "a14", title: "Sarf (Morphology) Basics", duration: "48:00", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", completed: false, type: "audio" },
      { id: "a15", title: "Live", duration: "1:00:00", audioUrl: "", completed: false, type: "live" },
    ],
    quizzes: [
      { id: "aq1", question: "How many letters are in the Arabic alphabet?", options: ["24", "26", "28", "30"], correctIndex: 2 },
    ],
  },
  
];

// export const communityQuestions: CommunityQuestion[] = [
export const communityQuestions = [
  { id: "cq1", courseId: "quran", author: "Abdullah", question: "Can someone explain the difference between Idgham with and without Ghunnah?", answer: "Idgham with Ghunnah occurs with ي ن م و — you merge with a nasal sound. Without Ghunnah is with ل ر — merge without nasalization.", date: "2024-03-15" },
  { id: "cq2", courseId: "hadith", author: "Khadijah", question: "What makes a hadith 'Sahih'?", answer: "A hadith is Sahih if it has a continuous chain, trustworthy narrators, no hidden defects, and no contradiction with stronger evidence.", date: "2024-03-14" },
  { id: "cq3", courseId: "fiqh", author: "Omar", question: "Is it permissible to combine prayers while traveling?", date: "2024-03-13" },
  { id: "cq4", courseId: "arabic", author: "Fatimah", question: "What's the easiest way to memorize verb conjugation tables?", answer: "Practice with flashcards and try conjugating verbs you encounter in the Quran. Consistency is key!", date: "2024-03-12" },
  { id: "cq5", courseId: "aqeedah", author: "Yusuf", question: "How do we understand Allah's attributes without anthropomorphism?", date: "2024-03-10" },
];
