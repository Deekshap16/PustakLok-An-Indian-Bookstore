





import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';

dotenv.config();

// Generate local image URLs for book covers
const getBookImage = (title) => {
  // Map book titles to image filenames
  const imageMap = {
    "The Immortals of Meluha": "immortals-of-meluha",
    "The Secret of the Nagas": "secret-of-the-nagas",
    "The Oath of the Vayuputras": "oath-of-the-vayuputras",
    "Ramayana": "ramayana-rk-narayan",
    "The Palace of Illusions": "palace-of-illusions",
    "Mahabharata": "mahabharata",
    "Sita: An Illustrated Retelling of the Ramayana": "sita-ramayana",
    "The White Tiger": "white-tiger",
    "The God of Small Things": "god-of-small-things",
    "A Suitable Boy": "suitable-boy",
    "Train to Pakistan": "train-to-pakistan",
    "The Guide": "guide",
    "Wings of Fire": "wings-of-fire",
    "My Experiments with Truth": "my-experiments-with-truth",
    "The Discovery of India": "discovery-of-india",
    "The Argumentative Indian": "argumentative-indian",
    "Gitanjali": "gitanjali",
    "Midnight's Children": "midnights-children",
    "The Inheritance of Loss": "inheritance-of-loss",
    "The Namesake": "namesake"
  };
  
  const filename = imageMap[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  // Return path relative to frontend public folder - will be served as /images/books/filename.jpg
  // Try common extensions
  return `/images/books/${filename}.jpg`;
};

const books = [
  {
    title: "The Immortals of Meluha",
    author: "Amish Tripathi",
    description: "The first book in the Shiva Trilogy. A gripping tale of a man whose legend lives in our hearts even today. This book asks the intriguing question: Was the man we know as Shiva the Neelkanth a god or just a mortal?",
    price: 299,
    genre: "Mythical",
    language: "English",
    image: getBookImage("The Immortals of Meluha"),
    rating: 4.5,
    stock: 50
  },
  {
    title: "The Secret of the Nagas",
    author: "Amish Tripathi",
    description: "The second book in the Shiva Trilogy. The journey of Shiva continues as he travels from Meluha to search for answers to his destiny.",
    price: 299,
    genre: "Mythical",
    language: "English",
    image: getBookImage("The Secret of the Nagas"),
    rating: 4.4,
    stock: 45
  },
  {
    title: "The Oath of the Vayuputras",
    author: "Amish Tripathi",
    description: "The third book in the Shiva Trilogy. The conclusion of Shiva's epic journey to find his destiny and save India from the evil that threatens it.",
    price: 299,
    genre: "Mythical",
    language: "English",
    image: getBookImage("The Oath of the Vayuputras"),
    rating: 4.3,
    stock: 40
  },
  {
    title: "Ramayana",
    author: "R.K. Narayan",
    description: "A modern retelling of the timeless Indian epic. R.K. Narayan brings the ancient tale of Rama's journey to contemporary readers with his distinctive narrative style.",
    price: 399,
    genre: "Mythical",
    language: "English",
    image: getBookImage("Ramayana"),
    rating: 4.7,
    stock: 60
  },
  {
    title: "The Palace of Illusions",
    author: "Chitra Banerjee Divakaruni",
    description: "The Mahabharata retold from Draupadi's perspective. A powerful and moving narrative that gives voice to one of the most remarkable women in Indian literature.",
    price: 349,
    genre: "Mythical",
    language: "English",
    image: getBookImage("The Palace of Illusions"),
    rating: 4.6,
    stock: 55
  },
  {
    title: "Mahabharata",
    author: "C. Rajagopalachari",
    description: "A simplified and abridged retelling of the great Indian epic. This version makes the complex story accessible to modern readers while maintaining its essence.",
    price: 449,
    genre: "Mythical",
    language: "English",
    image: getBookImage("Mahabharata"),
    rating: 4.5,
    stock: 50
  },
  {
    title: "Sita: An Illustrated Retelling of the Ramayana",
    author: "Devdutt Pattanaik",
    description: "A beautifully illustrated retelling of the Ramayana from Sita's perspective. Devdutt Pattanaik brings his unique insight to this timeless tale.",
    price: 499,
    genre: "Mythical",
    language: "English",
    image: getBookImage("Sita Ramayana"),
    rating: 4.4,
    stock: 48
  },
  {
    title: "The White Tiger",
    author: "Aravind Adiga",
    description: "Winner of the Man Booker Prize. A darkly humorous novel about a man's journey from village darkness to corporate success in modern India.",
    price: 399,
    genre: "Fiction",
    language: "English",
    image: getBookImage("The White Tiger"),
    rating: 4.2,
    stock: 52
  },
  {
    title: "The God of Small Things",
    author: "Arundhati Roy",
    description: "Winner of the Man Booker Prize. A powerful family saga set in Kerala that explores love, loss, and the consequences of breaking society's rules.",
    price: 449,
    genre: "Fiction",
    language: "English",
    image: getBookImage("The God of Small Things"),
    rating: 4.3,
    stock: 47
  },
  {
    title: "A Suitable Boy",
    author: "Vikram Seth",
    description: "An epic novel set in post-independence India. A rich and detailed narrative that follows several families across generations.",
    price: 599,
    genre: "Fiction",
    language: "English",
    image: getBookImage("A Suitable Boy"),
    rating: 4.4,
    stock: 43
  },
  {
    title: "Train to Pakistan",
    author: "Khushwant Singh",
    description: "A powerful novel set during the Partition of India. A gripping tale of love, hatred, and humanity in the face of religious violence.",
    price: 299,
    genre: "Fiction",
    language: "English",
    image: getBookImage("Train to Pakistan"),
    rating: 4.5,
    stock: 51
  },
  {
    title: "The Guide",
    author: "R.K. Narayan",
    description: "A classic novel about a tour guide who accidentally becomes a holy man. Narayan's signature humor and insight into human nature.",
    price: 349,
    genre: "Fiction",
    language: "English",
    image: getBookImage("The Guide"),
    rating: 4.4,
    stock: 49
  },
  {
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    description: "An autobiography of India's former President and missile man. An inspiring story of a boy from Rameswaram who became one of India's greatest scientists.",
    price: 399,
    genre: "Biography",
    language: "English",
    image: getBookImage("Wings of Fire"),
    rating: 4.7,
    stock: 65
  },
  {
    title: "My Experiments with Truth",
    author: "Mahatma Gandhi",
    description: "The autobiography of Mahatma Gandhi. A deeply personal account of his life, philosophy, and the principles that guided India's struggle for freedom.",
    price: 349,
    genre: "Biography",
    language: "English",
    image: getBookImage("My Experiments with Truth"),
    rating: 4.6,
    stock: 58
  },
  {
    title: "The Discovery of India",
    author: "Jawaharlal Nehru",
    description: "Written during Nehru's imprisonment, this book explores India's rich history, culture, and civilization from ancient times to independence.",
    price: 499,
    genre: "History",
    language: "English",
    image: getBookImage("The Discovery of India"),
    rating: 4.5,
    stock: 44
  },
  {
    title: "The Argumentative Indian",
    author: "Amartya Sen",
    description: "A collection of essays exploring India's history, culture, and identity. Sen examines the traditions of public debate and intellectual pluralism in India.",
    price: 449,
    genre: "Non-Fiction",
    language: "English",
    image: getBookImage("The Argumentative Indian"),
    rating: 4.3,
    stock: 46
  },
  {
    title: "Gitanjali",
    author: "Rabindranath Tagore",
    description: "A collection of spiritual poems by Nobel laureate Rabindranath Tagore. These poems express deep devotion and spiritual yearning.",
    price: 199,
    genre: "Fiction",
    language: "English",
    image: getBookImage("Gitanjali"),
    rating: 4.8,
    stock: 62
  },
  {
    title: "Midnight's Children",
    author: "Salman Rushdie",
    description: "Winner of the Man Booker Prize. A magical realist novel that tells the story of children born at the stroke of midnight on India's independence day.",
    price: 549,
    genre: "Fiction",
    language: "English",
    image: getBookImage("Midnight's Children"),
    rating: 4.4,
    stock: 41
  },
  {
    title: "The Inheritance of Loss",
    author: "Kiran Desai",
    description: "Winner of the Man Booker Prize. A novel that explores the effects of globalization, immigration, and the search for identity across generations.",
    price: 399,
    genre: "Fiction",
    language: "English",
    image: getBookImage("The Inheritance of Loss"),
    rating: 4.2,
    stock: 45
  },
  {
    title: "The Namesake",
    author: "Jhumpa Lahiri",
    description: "A beautiful novel about an Indian-American family and their struggles with identity, belonging, and the immigrant experience.",
    price: 399,
    genre: "Fiction",
    language: "English",
    image: getBookImage("The Namesake"),
    rating: 4.5,
    stock: 53
  }
];

const seedBooks = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI is not set in .env file');
      console.error('Please create a .env file in the backend directory with:');
      console.error('MONGODB_URI=your_mongodb_connection_string');
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert books
    await Book.insertMany(books);
    console.log('Seeded books successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedBooks();



