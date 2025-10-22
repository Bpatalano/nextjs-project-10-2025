# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.0.0 application using the App Router architecture, React 19.2.0, TypeScript, and Tailwind CSS v4.

## Development Commands

- **Development server**: `npm run dev` - Starts the Next.js development server on http://localhost:3000
- **Production build**: `npm run build` - Creates an optimized production build
- **Production server**: `npm start` - Runs the production build
- **Linting**: `npm run lint` - Runs ESLint to check code quality

## Architecture

### App Router Structure

This project uses Next.js App Router (not Pages Router). All routes are defined in the `app/` directory:

- `app/layout.tsx` - Root layout component that wraps all pages
- `app/page.tsx` - Home page (route: `/`)
- `app/globals.css` - Global styles and Tailwind directives

### TypeScript Configuration

- Path alias `@/*` maps to the project root, allowing imports like `@/app/...`
- Strict mode is enabled
- Target: ES2017 with modern ESNext modules
- JSX mode: `react-jsx` (React 19 automatic runtime)

### Styling

- **Tailwind CSS v4** is configured via `@tailwindcss/postcss`
- Global styles are in `app/globals.css`
- Font configuration uses `next/font/google` with Geist Sans and Geist Mono fonts
- CSS variables for fonts are defined: `--font-geist-sans` and `--font-geist-mono`

### Linting

ESLint is configured using the modern flat config format (`eslint.config.mjs`) with:
- `eslint-config-next/core-web-vitals` for Next.js best practices
- `eslint-config-next/typescript` for TypeScript-specific rules
- Build artifacts (`.next/`, `out/`, `build/`) are ignored

## Important Notes

- This uses React 19, which has breaking changes from React 18 (new JSX runtime, async components)
- Tailwind CSS v4 has a different configuration approach than v3
- The App Router uses Server Components by default; add `"use client"` directive for Client Components
- Static assets go in the `public/` directory and are served from the root path
