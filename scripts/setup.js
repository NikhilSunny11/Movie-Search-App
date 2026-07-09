/**
 * Project Setup Script
 * 
 * Run from the project root:
 *   node scripts/setup.js
 * 
 * This script:
 * 1. Installs npm dependencies for both client/ and server/
 * 2. Copies .env.example → .env if .env doesn't exist (server only)
 * 3. Prints a success message with next steps
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function run(cmd, cwd) {
  console.log(`\n📦 Running: ${cmd}`);
  console.log(`   in: ${cwd}\n`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function copyEnvIfNeeded(dir) {
  const envExample = path.join(dir, '.env.example');
  const envFile = path.join(dir, '.env');

  if (fs.existsSync(envExample) && !fs.existsSync(envFile)) {
    fs.copyFileSync(envExample, envFile);
    console.log(`✅ Copied .env.example → .env in ${path.basename(dir)}/`);
  }
}

console.log('🎬 Movie Search App — Project Setup\n');
console.log('════════════════════════════════════════');

try {
  // Install server dependencies
  run('npm install', path.join(ROOT, 'server'));
  copyEnvIfNeeded(path.join(ROOT, 'server'));

  // Install client dependencies
  run('npm install', path.join(ROOT, 'client'));
  copyEnvIfNeeded(path.join(ROOT, 'client'));

  console.log('\n════════════════════════════════════════');
  console.log('✅ Setup complete!\n');
  console.log('Next steps:');
  console.log('  1. Open server/.env and add your TMDB API key');
  console.log('  2. Start the backend:  cd server && npm run dev');
  console.log('  3. Start the frontend: cd client && npm run dev');
  console.log('  4. Open http://localhost:5173\n');
} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}
