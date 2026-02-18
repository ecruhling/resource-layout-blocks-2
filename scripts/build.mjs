import { build } from "vite";
import path from "node:path";
import fs from "node:fs";
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

    const styleOut = path.join(outDir, "style.css");
    const editorOut = path.join(outDir, "editor.css");

    const didStyle = compileScss(styleIn, styleOut);
    const didEditor = compileScss(editorIn, editorOut);

    if (!didStyle) {
        console.warn(`[WARN] Missing style.scss for ${block}: ${styleIn}`);
    }
    if (!didEditor) {
        console.warn(`[WARN] Missing editor.scss for ${block}: ${editorIn}`);
    }
}

function buildGlobalEditorCss() {
	const inFile = path.join(root, "src/editor.scss");
	const outFile = path.join(dist, "editor.css");

	ensureDir(dist);

	const ok = compileScss(inFile, outFile);
	if (!ok) console.warn(`[WARN] Missing global editor.scss: ${inFile}`);
}

async function buildBlockJs(block, outDir) {
    await build({
        configFile: path.join(root, "vite.block.config.js"),
        root,
        build: {
            outDir,
            emptyOutDir: true,
            sourcemap: true,
            // We are not relying on Vite CSS output at all.
            cssCodeSplit: false,
            rollupOptions: {
                input: path.join(root, `src/blocks/${block}/index.jsx`),
                output: {
                    entryFileNames: "index.js",
                },
            },
        },
    });
}

async function buildBlock(block) {
    const outDir = path.join(dist, `blocks/${block}`);
    ensureDir(outDir);

    await buildBlockJs(block, outDir);
    writeAssetPhp(outDir, "index.js", WP_SCRIPT_DEPS);
    copyBlockJson(block);
    buildBlockCss(block, outDir);
}

(async () => {
    ensureDir(dist);

	buildGlobalEditorCss();

	for (const b of blocks) {
        await buildBlock(b);
    }
})();
