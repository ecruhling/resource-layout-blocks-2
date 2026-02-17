import chokidar from "chokidar";
import path from "node:path";
import fs from "node:fs";
import { build } from "vite";
import * as sass from 'sass';

const root = process.cwd();
const dist = path.join(root, "dist");
const blocks = ["container", "row", "column"];

const WP_SCRIPT_DEPS = [
    "wp-blocks",
    "wp-element",
    "wp-i18n",
    "wp-block-editor",
    "wp-components",
];

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function writeAssetPhp(outDir, filename, deps) {
    const jsPath = path.join(outDir, filename);
    const version = fs.existsSync(jsPath) ? String(fs.statSync(jsPath).mtimeMs) : String(Date.now());

    const php = `<?php
return array(
  'dependencies' => array(${deps.map((d) => `'${d}'`).join(", ")}),
  'version' => '${version}',
);
`;
    fs.writeFileSync(path.join(outDir, filename.replace(/\.js$/, ".asset.php")), php);
}

function copyBlockJson(block) {
    const from = path.join(root, `src/blocks/${block}/block.json`);
    const toDir = path.join(dist, `blocks/${block}`);
    ensureDir(toDir);
    fs.copyFileSync(from, path.join(toDir, "block.json"));
}

function compileScss(inFileAbs, outFileAbs) {
    if (!fs.existsSync(inFileAbs)) return false;
    const result = sass.compile(inFileAbs, {
        style: "compressed",
        loadPaths: [path.dirname(inFileAbs), path.join(root, "src")],
    });
    fs.writeFileSync(outFileAbs, result.css);
    return true;
}

function buildBlockCss(block, outDir) {
    const styleIn = path.join(root, `src/blocks/${block}/style.scss`);
    const editorIn = path.join(root, `src/blocks/${block}/editor.scss`);
    compileScss(styleIn, path.join(outDir, "style.css"));
    compileScss(editorIn, path.join(outDir, "editor.css"));
}

async function buildBlockJs(block, outDir, emptyOutDir) {
    await build({
        configFile: path.join(root, "vite.block.config.js"),
        root,
        build: {
            outDir,
            emptyOutDir,
            sourcemap: true,
            cssCodeSplit: false,
            rollupOptions: {
                input: path.join(root, `src/blocks/${block}/index.jsx`),
                output: { entryFileNames: "index.js" },
            },
        },
    });
}

async function rebuildBlock(block, { clean = false } = {}) {
    const outDir = path.join(dist, `blocks/${block}`);
    ensureDir(outDir);

    const start = Date.now();
    try {
        await buildBlockJs(block, outDir, clean);
        writeAssetPhp(outDir, "index.js", WP_SCRIPT_DEPS);
        copyBlockJson(block);
        buildBlockCss(block, outDir);

        const ms = Date.now() - start;
        console.log(`[dev] rebuilt ${block} in ${ms}ms`);
    } catch (err) {
        console.error(`[dev] build failed for ${block}`);
        console.error(err);
    }
}

async function buildAll() {
    ensureDir(dist);
    for (const b of blocks) {
        await rebuildBlock(b, { clean: true });
    }
}

// --- Debounce per block ---
const timers = new Map();
function scheduleRebuild(block) {
    if (!blocks.includes(block)) return;

    if (timers.has(block)) clearTimeout(timers.get(block));
    timers.set(
        block,
        setTimeout(() => {
            timers.delete(block);
            rebuildBlock(block, { clean: true });
        }, 100)
    );
}

function blockFromFile(filePath) {
    const rel = path.relative(path.join(root, "src/blocks"), filePath);
    const top = rel.split(path.sep)[0];
    return top;
}

(async () => {
    await buildAll();

    const watchGlobs = [
        path.join(root, "src/blocks/**/index.jsx"),
        path.join(root, "src/blocks/**/block.json"),
        path.join(root, "src/blocks/**/style.scss"),
        path.join(root, "src/blocks/**/editor.scss"),
        path.join(root, "src/blocks/**/*.jsx"),
    ];

    const watcher = chokidar.watch(watchGlobs, {
        ignoreInitial: true,
    });

    watcher.on("all", (event, filePath) => {
        const b = blockFromFile(filePath);
        console.log(`[dev] ${event}: ${path.relative(root, filePath)} → ${b}`);
        scheduleRebuild(b);
    });

    console.log("[dev] watching block sources…");
})();
