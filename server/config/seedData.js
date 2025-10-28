// seedData.js - Seed data for the application

const Category = require('../models/Category');
const User = require('../models/User');

const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany();

    // Helper function to generate slug
    const generateSlug = (name) => {
      return name
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    };

    // Create categories
    const categories = [
      {
        name: 'JavaScript',
        slug: 'javascript',
        description: 'Posts about JavaScript and related technologies',
      },
      {
        name: 'Python',
        slug: 'python',
        description: 'Posts about Python programming language',
      },
      {
        name: 'React',
        slug: 'react',
        description: 'Posts about React framework and ecosystem',
      },
      {
        name: 'Node.js',
        slug: 'nodejs',
        description: 'Posts about Node.js and server-side JavaScript',
      },
      {
        name: 'MongoDB',
        slug: 'mongodb',
        description: 'Posts about MongoDB database and NoSQL',
      },
      {
        name: 'HTML/CSS',
        slug: 'html-css',
        description: 'Posts about web design and styling',
      },
      {
        name: 'Vue.js',
        slug: 'vuejs',
        description: 'Posts about Vue.js framework',
      },
      {
        name: 'Angular',
        slug: 'angular',
        description: 'Posts about Angular framework',
      },
      {
        name: 'Express.js',
        slug: 'expressjs',
        description: 'Posts about Express.js web framework',
      },
      {
        name: 'Full Stack',
        slug: 'full-stack',
        description: 'Posts about full-stack development',
      },
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'General web development topics',
      },
      {
        name: 'Algorithms',
        slug: 'algorithms',
        description: 'Posts about data structures and algorithms',
      },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories:`);
    createdCategories.forEach((cat) => {
      console.log(`   - ${cat.name}`);
    });

    return createdCategories;
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
};

module.exports = { seedCategories };

