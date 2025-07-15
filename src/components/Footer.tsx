export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} MyBlog. All Rights Reserved.</p>
      </div>
    </footer>
  );
}