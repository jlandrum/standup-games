import Head from 'next/head'
import { useState } from 'react';

interface SelectedColor {
  color: string;
  name: string;
}

const randomColor = () => {
  const red = Math.floor(Math.random() * 0xff).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 0xff).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 0xff).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

export default function Home() {
  const [activeTitle, setActiveTitle] = useState('');
  const [activeColor, setActiveColor] = useState(randomColor());
  const [selectedColors, setSelectedColors] = useState<SelectedColor[]>([]);
  const [editor, setEditor] = useState(true);

  const addColor = () => {
    setSelectedColors([...selectedColors, {
      color: activeColor,
      name: activeTitle
    }]);
    setActiveTitle('');
    setActiveColor(randomColor());
  }

  const restart = () => {
    setEditor(true);
    setActiveTitle('');
    setActiveColor(randomColor());
    setSelectedColors([]);
  }

  const done = () => {
    setEditor(false);
  }

  return (
    <>
      <Head>
        <title>Name That Color</title>
        <meta name="description" content="A simple random color game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex justify-center items-center w-screen h-screen' style={{backgroundColor: activeColor}}>
        { editor ? (
          <>
            <div className='flex gap-4'>
              <input className='rounded-md px-2' value={activeTitle} onChange={(e) => setActiveTitle(e.target.value)} />
              <button onClick={addColor} className='rounded-md bg-white px-4 py-2'>Submit</button>
            </div>
            <button onClick={done} className='rounded-md bg-white px-4 py-2 absolute top-2 right-2'>Done</button>
          </>
        ) : (
          <>
            <div className='flex gap-2 flex-wrap justify-center'>
              {
                selectedColors.map(it => (
                  <div key={it.name} className='w-32 h-32 rounded-md overflow-clip flex justify-center items-end' style={{ backgroundColor: it.color }}>
                    <div className='bg-white w-full text-center'>
                      {it.name}
                    </div>
                  </div>
                ))
              }
              <button onClick={restart} className='bg-white px-4 py-2 absolute top-2 right-2 rounded-md'>Restart</button>
            </div>
          </>
        ) }
      </main>
    </>
  )
}
