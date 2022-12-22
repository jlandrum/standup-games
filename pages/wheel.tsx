import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Mesh, TextureLoader } from "three";

const sides = 20;
const tickPoint = Math.PI * 2 / sides;
const values = [80, 35, 60, 20, 40, 75, 55, 95, 5, 100, 15, 90, 25, 70, 45, 10, 65, 30, 85, 50];

interface WheelProps {
  onLanded: (val: number) => void;
  disabled?: boolean;
}

const Ticker = () => {
  const mesh = useRef<Mesh>(null);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.rotation.x = 0;      
      mesh.current.rotation.z = -Math.PI / 2;      
      mesh.current.rotation.y = -Math.PI / 2;   
      mesh.current.position.x = 0.5;      
      mesh.current.position.y = 0;      
      mesh.current.position.z = 3;
      mesh.current.scale.x = 0.1;     
      mesh.current.scale.y = 0.1;     
      mesh.current.scale.z = 0.2;     
    }
  }, [mesh]);  

  return (
    <mesh ref={mesh}>
      <cylinderGeometry args={[1,1,1,3]} />
      <meshLambertMaterial 
          color="#990000" />
    </mesh>
  )
}

const Wheel = ({onLanded, disabled}: WheelProps) => {
  const mesh = useRef<Mesh>(null);

  const textureMap = useLoader(TextureLoader, '/wheel.png');

  const [speed, _setSpeed] = useState(0);
  const [settled, setSettled] = useState(false);

  const setSpeed = (newSpeed: number) => {
    _setSpeed(Math.min(10, newSpeed));
    setSettled(false);
  }

  useEffect(() => {
    if (mesh.current) {
      mesh.current.rotation.z = Math.PI / 2;      
    }
  }, [mesh]);  
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += (delta * 2) * speed;
      if (speed > 0) {
        const newSpeed = Math.max(0, speed - delta);
        setSpeed(newSpeed);
      } else {
        if (!settled) {
          const val = Math.floor(mesh.current.rotation.x % (Math.PI * 2) / tickPoint);
          onLanded(values[val]);
          setSettled(true)
        }
      }
    }  
  })

  return (
    <mesh ref={mesh} onClick={() => { if (!disabled) setSpeed(speed + 0.5) }}>
      <cylinderGeometry args={[2.5,2.5,1,sides]} />
      <meshLambertMaterial map={textureMap} specularMap={textureMap} bumpScale={0.01} bumpMap={textureMap} />      
    </mesh>
  )
}

interface Player {
  name: string;
  score: number;
}

const Madquips = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState(-1);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [lastScore, setLastScore] = useState(0);

  const topScore = players.filter(it => it.score <= 100).reduce((p,c) => p>c.score?p:c.score, 0);

  const addPlayer = () => {
    setPlayers([...players, { name: newPlayerName, score: 0 }])
    setNewPlayerName('');
    if (activePlayer === -1) {
      setActivePlayer(0);
    }
  }

  const addScore = (score: number) => {
    setLastScore(score);
    if (activePlayer === -1) return;
    const newPlayers = [...players];
    const player = newPlayers[activePlayer];  
    player.score += score;
    setPlayers(newPlayers);
  }

  return (
    <>
      <Head>
        <title>The Wheel is Right</title>
        <meta name="description" content="Spin it to win, just don't go over 100!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen bg-black">
        <Canvas>
          <pointLight intensity={1} position={[20,0,20]} />
          <Wheel onLanded={addScore} />
          <Ticker />
        </Canvas>
        <div className="absolute inset-0 pointer-events-none">
          <div className=" pointer-events-auto m-4 w-auto inline-block p-2 text-white bg-neutral-800">
            <h1>Players</h1>
            <div className="my-2 p-2 flex flex-col gap-2 bg-black rounded-md">
              {players.map((it, i) => (
                <div className={`flex p-1 rounded-md ${it.score === topScore ? 'text-green-500' : ''} ${it.score > 100 ? 'text-red-500' : ''} ${i===activePlayer?'bg-neutral-700 font-bold':''}`} key={i} onClick={() => setActivePlayer(i)}>
                  <span className="mr-auto max-w-[20vw] overflow-clip text-ellipsis">{it.name}</span>
                  <span className="ml-4">{it.score > 100 ? 'OVER' : it.score}</span>
                </div>
              ))}
              {players.length === 0 && (
                <span>No Players; Add to Start!</span>
                )}
            </div>
            <div className="flex flex-col gap-2 p-2">
              <span>Landed on {lastScore || ''}!</span>
              <input className="text-white bg-neutral-600 rounded-md px-2" value={newPlayerName} onChange={(v) => setNewPlayerName(v.target.value)} />
              <button className="bg-blue-400 text-black border-2 border-blue-900 rounded-md" onClick={addPlayer}>Add Player</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Madquips;