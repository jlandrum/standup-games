import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rye, Diplomata_SC } from '@next/font/google'

const font = Rye({ subsets: ['latin'], weight: "400" })
const font2 = Diplomata_SC({ subsets: ['latin'], weight: "400" })

interface Verdict {
  bounty: number;
  crime: string;
  guilty: boolean;
}

const RandomImage = ({key}: {key: string}) => {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    fetch(`https://fakeface.rest/face/json?seed=${key}&minimum_age=20&maximum_age=40`)
    .then(v => v.json())
    .then(d => setImage(d?.image_url));
  }, [key]);

  return <Image fill className="mix-blend-color-burn opacity-40 saturate-0 contrast-[500] -hue-rotate-30" src={image} alt="Random Photo of a Person" />
}

const actions = ['Stealing', 'Eating', 'Throwing', 'Painting', 'Making', 'Surfing on', 'Dancing on', 'Running from', 'Libel against', 'Designing', 'Coding', 'Deleting', 'Misconfiguring', 'Writing about', 'Installing', 'YEETing'];
const nouns =   ['a Baby', 'a Rock', 'a Hotdog', 'a Cake', 'a Towel', 'a Free Pamphlet', 'a Dog', 'a Clown', 'a Porcupine', 'a Red 1999 Dodge Viper RT/10 Roadster', 'a Router', 'a PHP Update', 'a Central Database', 'Adobe XD', 'a beautifully painted portrait of Keanu Reeves in a fuzzy bath robe', 'Nothing. Absolutely nothing at all.'];
const targets = ['Steve', 'Humanity', 'Tacos', 'Dave Bautista', 'Absolutely Everyone', 'Nature', 'A Lone Field Mouse', 'The Other Steve', 'A Man in a Tie', ''];

const getCrime = () => {
  const actionId = Math.floor(Math.random() * actions.length);
  const nounId = Math.floor(Math.random() * nouns.length);

  return `${actions[actionId]} ${nouns[nounId]}`;
}

const getTarget = () => {
  const targetId = Math.floor(Math.random() * targets.length);
  return `For Crimes Against ${targets[targetId]}`;
}

const getBounty = () => parseInt(`${Math.floor(Math.random()*10000)}00`)

const Crimes = () => {
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);
  const [crime, setCrime] = useState('');
  const [bounty, setBounty] = useState(6000);
  
  const rotation = Math.random() * 20 - 10;

  useEffect(() => { setCrime(getCrime())}, [])
  
  const addVerdict = (guilty: boolean) => {
    const verdict: Verdict = {
      bounty,
      crime,
      guilty
    }
    setVerdicts([...verdicts, verdict]);
    setCrime(getCrime());
    setBounty(getBounty());
  }

  return (
    <>
      <Head>
        <title>Is this a crime?</title>
        <meta name="description" content="Is the crime given really all that bad? You be the judge." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-contain bg-[url('/pexels-photo-164005.jpeg')]">
        <div className="w-screen h-screen flex justify-center items-center">
          <article style={{transform: `rotate(${rotation}deg)`}} className="w-[600px] transition-transform shadow-neutral-800 shadow-xl bg-orange-100 bg-cover bg-paper flex items-center flex-col">
            <h1 className={`${font2.className} mt-8 opacity-60 text-5xl scale-y-150`}>WANTED</h1>
            <h2 className={`${font.className} mt-2 mb-8 opacity-60 text-sm scale-y-150`}>{getTarget()}</h2>
            <div className="relative w-[400px] h-[400px]">
              <RandomImage key={bounty.toLocaleString()} />
            </div>
            <span className={`${font.className} my-4 opacity-60 text-4xl text-center mx-8`}>{crime}</span>
            <span className={`${font.className} opacity-60 text-2xl`}>Bounty: ${bounty.toLocaleString()}</span>
            <span className={`${font.className} mt-8 opacity-60 text-xl`}>Is this a crime?</span>
            <div>
              <button className={`${font.className} text-red-800 m-8 opacity-60 hover:opacity-100 transition-opacity text-4xl`} onClick={() => addVerdict(true)}>
                Guilty!
              </button>
              <button className={`${font.className} text-green-800 m-8 opacity-60 hover:opacity-100 transition-opacity text-4xl`} onClick={() => addVerdict(false)}>
                Not Guilty!
              </button>
            </div>
          </article>
        </div>
        <div className="w-screen h-screen flex justify-center items-center">
          <article className="w-[600px] max-h-[80%] rotate-3 min-h-[500px] shadow-neutral-800 shadow-xl bg-orange-100 bg-paper bg-cover flex items-center flex-col">
            <h1 className={`${font2.className} mt-8 opacity-60 text-xl scale-y-[180%]`}>Case Reports</h1>
            <h2 className={`${font.className} mt-2 mb-8 opacity-60 text-sm scale-y-150`}>County Sheriff&apos;s Office</h2>
            <div className="overflow-y-scroll">
            <table className="border-separate border-spacing-x-4 mx-2 border-spacing-y-1">
            { verdicts.map(it => (
              <tr key={it.bounty} className={`${font.className}`}>
                <td>{it.crime}</td>
                <td>${it.bounty.toLocaleString()}</td>
                <td className=" whitespace-nowrap">{it.guilty ? 'GUILTY' : 'NOT GUILTY'}</td>
              </tr>
            ))}
            </table>
            </div>
            <span className={`${font.className} my-8`}>Total Penalties Awarded: ${verdicts.filter(it=>it.guilty).reduce((p,c) => p+c.bounty, 0).toLocaleString()}</span>
          </article>
        </div>
      </main>
    </>
  )
}

export default Crimes;