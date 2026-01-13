import { Link } from 'wouter';
import { BBSLayout } from '@/components/BBSLayout';

const NotFound = () => {
  return (
    <BBSLayout>
      <div className="text-center py-20">
        <pre className="text-[var(--primary)] text-xs mb-8 inline-block">
{`
███████╗██████╗ ██████╗  ██████╗ ██████╗     ██╗  ██╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗    ██║  ██║██╔═████╗██║  ██║
█████╗  ██████╔╝██████╔╝██║   ██║██████╔╝    ███████║██║██╔██║███████║
██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗    ╚════██║████╔╝██║╚════██║
███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║         ██║╚██████╔╝     ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝         ╚═╝ ╚═════╝      ╚═╝
`}
        </pre>
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-4 glitch">
          NODE NOT FOUND
        </h1>
        <p className="text-[var(--muted-foreground)] mb-8">
          The requested sephirah does not exist in this reality branch.
        </p>
        <div className="border border-[var(--muted)] inline-block p-4 bg-[var(--overlay-light)]">
          <p className="text-sm text-[var(--foreground)] mb-4">
            ERROR: Path traversal failed. The Abyss has claimed this route.
          </p>
          <Link href="/">
            <span className="text-[var(--primary)] hover:text-[var(--secondary)] cursor-pointer">
              [RETURN TO MALKUTH] ←
            </span>
          </Link>
        </div>
      </div>
    </BBSLayout>
  );
};

export default NotFound;
