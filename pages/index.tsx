import Link from "next/link";

const Index = () => (
  <div className="flex flex-col m-8 gap-4">
    <h1 className="font-bold text-4xl">Standup Games</h1>
    <Link href="/crimes">
      <div className="hover:bg-neutral-200 p-2 rounded-md transition-colors">
        <strong><Link href="/color">Name the Color</Link></strong>
        <span className="inline-flex gap-1 mx-2">
          <span className="bg-green-400 px-2 py-0.5 rounded-full text-xs">Quick</span>
          <span className="bg-blue-400 px-2 py-0.5 rounded-full text-xs">Creative</span>
        </span>
        <p>A simple game where you are given a random color and must give it a name! Create the world&apos;s worst color scheme for your next website!</p>
        <p className="text-xs mt-2">
          Built with no external libraries, demonstrating simple use of next.js.
        </p>
      </div>
    </Link>
    <Link href="/crimes">
      <div className="hover:bg-neutral-200 p-2 rounded-md transition-colors">
        <strong>Is This a Crime?</strong>
        <span className="inline-flex gap-1 mx-2">
          <span className="bg-green-400 px-2 py-0.5 rounded-full text-xs">Quick</span>
          <span className="bg-blue-400 px-2 py-0.5 rounded-full text-xs">Random</span>
        </span>
        <p>Given a random wanted poster, is the crime really a crime? If not - they&apos;re innocent, otherwise they&apos;re GUILTY!</p>
        <p className="text-xs mt-2">
          Demonstrates the new font features of next.js 13 and the power of Tailwind.
        </p>
      </div>
    </Link>
    <Link href="/wheel">
      <div className="hover:bg-neutral-200 p-2 rounded-md transition-colors">
        <strong>The Wheel is Right</strong>
        <span className="inline-flex gap-1 mx-2">
          <span className="bg-green-400 px-2 py-0.5 rounded-full text-xs">Slow</span>
          <span className="bg-blue-400 px-2 py-0.5 rounded-full text-xs">Competitive</span>
        </span>
        <p>This is absolutely not a clone of a game from a famous gameshow hosted by the great Bob Barker. Nope.</p>
        <p className="text-xs mt-2">
          Demonstrates WebGL with three.js, using react-three-fiber.
        </p>
      </div>
    </Link>
    <div>
      <h2 className="font-bold text-2xl">About</h2>
      <p>
        This is a collection of games made quickly using Next.js, so quickly that they might just be full of bugs.
      </p>
      <p>
        Feel free to use them at your next stand-up!
      </p>
    </div>   
  </div>
)

export default Index;