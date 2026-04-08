import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const scanRoots = [
  join(ROOT, 'apps'),
  join(ROOT, 'packages'),
];

const violations = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === 'dist') {
        continue;
      }
      walk(fullPath);
      continue;
    }

    if (!fullPath.endsWith('.ts') && !fullPath.endsWith('.tsx') && !fullPath.endsWith('.js')) {
      continue;
    }

    const normalized = fullPath.replace(/\\/g, '/');

    if (normalized.includes('/apps/') && (normalized.includes('/src/pages/') || normalized.includes('/src/local/'))) {
      violations.push(`Forbidden root app directory usage: ${normalized}`);
    }

    const content = readFileSync(fullPath, 'utf8');

    if (normalized.includes('/packages/lib_shared/')) {
      if (/from\s+['"]@apps\//.test(content) || /from\s+['"][.\/]+apps\//.test(content)) {
        violations.push(`lib_shared must not import app code: ${normalized}`);
      }
    }

    if (/from\s+['"]@repo\/lib_shared\/.+['"]/.test(content)) {
      violations.push(`Deep import from @repo/lib_shared is forbidden: ${normalized}`);
    }
  }
}

for (const root of scanRoots) {
  try {
    walk(root);
  } catch {
    // Ignore missing roots during early scaffold stages.
  }
}

if (violations.length > 0) {
  console.error('Boundary check failed:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Boundary check passed.');
