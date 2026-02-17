import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const wpExternals = {
    "@wordpress/blocks": "wp.blocks",
    "@wordpress/block-editor": "wp.blockEditor",
    "@wordpress/components": "wp.components",
    "@wordpress/element": "wp.element",
    "@wordpress/i18n": "wp.i18n",
};

export default defineConfig({
    plugins: [react({ jsxRuntime: "classic" })],
    esbuild: {
        jsxFactory: "wp.element.createElement",
        jsxFragment: "wp.element.Fragment",
    },
    build: {
        rollupOptions: {
            external: Object.keys(wpExternals),
            output: {
                format: "iife",
                globals: wpExternals,
            },
        },
    },
});
