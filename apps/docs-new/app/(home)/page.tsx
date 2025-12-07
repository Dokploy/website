import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 px-4">
      <h1 className="text-4xl font-bold mb-4">Dokploy Documentation</h1>
      <p className="text-lg text-fd-muted-foreground mb-8 max-w-2xl mx-auto">
        Open Source Alternative to Vercel, Netlify and Heroku. Deploy your applications with ease.
      </p>
      <div className="flex gap-4 justify-center">
        <Link 
          href="/docs" 
          className="px-6 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
        <Link 
          href="https://github.com/Dokploy/dokploy" 
          className="px-6 py-3 border border-fd-border rounded-lg font-medium hover:bg-fd-accent transition-colors"
          target="_blank"
        >
          View on GitHub
        </Link>
      </div>
    </div>
  );
}
