# Modern Blog Frontend (Next.js & Tailwind CSS)

A sleek, responsive, and feature-rich frontend for the Blog API, built with Next.js 14 (App Router) and styled with Tailwind CSS.

[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-%23151515.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[**Live Demo**](https://your-vercel-deployment-link.vercel.app) ✨

## ✨ Features

- ⚡️ **Next.js 14 App Router**: Modern architecture for top-tier performance, SEO, and developer experience.
- 🔒 **Full Authentication Flow**: Client-side logic for registration, login (email & Google), and secure session handling.
- ✍️ **Dynamic Content Management**: Seamlessly create, update, and delete posts from a polished user interface.
- 🛡️ **Conditional UI**: Edit/delete controls are intelligently displayed only to the post's author.
- 📱 **Responsive First**: Beautifully crafted with Tailwind CSS for a perfect look on any device.
- 🔔 **Instant Feedback**: User-friendly toast notifications for all actions with `react-hot-toast`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router), React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand (or other)
- **Data Fetching**: `fetch` API / SWR
- **UI Feedback**: `react-hot-toast`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [Git](https://git-scm.com/)
- A **running instance** of the [Backend API](https://github.com/your-username/blog-api-nodejs).

### Local Setup

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/blog-frontend-nextjs.git](https://github.com/your-username/blog-frontend-nextjs.git)
    cd blog-frontend-nextjs
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env.local` file in the root of the project.
    - Add the URL of your running backend API. By default, it runs on port 4000.

        ```env
        NEXT_PUBLIC_API_URL=http://localhost:4000
        ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.
# blog-frontend-nextjs
