import Link from "next/link";

const Index = () => (
  <div className="flex flex-col m-8 gap-8">
    <h1 className="font-bold text-4xl">Standup Games</h1>
    <div>
      <strong><Link href="/color">Name the Color</Link></strong> 
      <p>A simple game where you are given a random color and must give it a name! Create the world&apos;s worst color scheme for your next website!</p>
      <p className="text-xs mt-2">
        [Quick] Built with no external libraries, demonstrating simple use of next.js.
      </p>
    </div>
    <div>
      <strong><Link href="/crimes">Is This a Crime?</Link></strong>
      <p>Given a random wanted poster, is the crime really a crime? If not - they&apos;re innocent, otherwise they&apos;re GUILTY!</p>
      <p className="text-xs mt-2">
        Demonstrates the new font features of next.js 13 and the power of Tailwind.
      </p>
    </div>
    <div>
      <strong><Link href="/wheel">The Wheel is Right</Link></strong>
      <p>This is absolutely not a clone of a game from a famous gameshow hosted by the great Bob Barker. Nope.</p>
      <p className="text-xs mt-2">
        Demonstrates WebGL with three.js, using react-three-fiber.
      </p>
    </div>
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