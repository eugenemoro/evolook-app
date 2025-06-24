// scripts/checkEnv.js
require('dotenv').config();

const required = [
  'MONGODB_URI',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'HF_API_TOKEN',
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error('🚫 Missing environment variables:', missing.join(', '));
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set.');
}
