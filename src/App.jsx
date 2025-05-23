import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import reload from './assets/reload.png'
import generatePassword from './services/generatePassword'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null);
  const mobileScreen = "min-[320px]:max-[480px]";

  const passwordGenerator = useCallback(() => {
    let pass_new = generatePassword(length, numberAllowed, charAllowed)
    setPassword(pass_new)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(passwordRef.current?.value)
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className='w-full h-fit flex flex-col justify-center-safe pt-6 px-2'>
      <div className='md:w-xl md:mx-auto shadow-md rounded-lg px-4 py-4 my-6 bg-gray-700 text-center max-sm:max-w-sm'>
        <h1 className='text-3xl font-bold text-white mb-3'>Password Generator</h1>
        <div className='flex max-sm:flex-col max-sm:gap-3 justify-between shadow p-3 rounded-lg overflow-hidden mb-4 bg-gray-600'>
          <input 
            type="text"
            value={password}
            className={`w-full outline-none px-3 py-2 rounded-tl-lg rounded-bl-lg max-sm:rounded-tr-lg max-sm:rounded-br-lg bg-white`}
            placeholder='Password'
            ref={passwordRef}
            readOnly
          />
          <button id='btn-copy' className={`bg-blue-400 max-sm:hidden text-white px-3 rounded-tr-lg rounded-br-lg shrink-0 cursor-pointer max-sm:rounded-tl-lg max-sm:rounded-bl-lg`} title='Copy' onClick={copyPasswordToClipboard}>Copy</button>
          <button id='btn-reload' className='bg-blue-400 max-sm:hidden text-white px-3 rounded-lg shrink-0 ml-2' title='Regenerate' onClick={passwordGenerator}>
            <img src={reload} alt="regenerate" className='w-6'/>
          </button>

          <div className='flex justify-end md:hidden'>
            <button id='btn-copy' className={`bg-blue-400 w-fit text-white px-3 py-2 rounded-tr-lg rounded-br-lg shrink-0 cursor-pointer max-sm:rounded-tl-lg max-sm:rounded-bl-lg`} title='Copy' onClick={copyPasswordToClipboard}>Copy</button>
            <button id='btn-reload' className='bg-blue-400 w-fit text-white px-3 py-2 rounded-lg shrink-0 ml-2' title='Regenerate' onClick={passwordGenerator}>
              <img src={reload} alt="regenerate" className='w-6'/>
            </button>
          </div>
        </div>

        <div className='flex gap-x-4 text-sm max-sm:flex-col max-sm:gap-y-4'>
          <div className='flex gap-x-2 items-center text-white'>
            <input 
              type="range"
              min={6}
              max={24}
              value={length}
              className='cursor-pointer max-sm:min-w-56'
              onChange={(e)=>setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex gap-x-1.5 items-center text-white'>
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed(prev => !prev)
              }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex gap-x-1.5 items-center text-white'>
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed(prev => !prev)
              }}
            />
            <label>Special Characters</label>
          </div>
        </div>
      </div>

      <div className='md:w-xl shadow-md rounded-lg px-4 py-4 my-6 bg-gray-700 text-left max-sm:max-w-sm mx-auto max-sm:text-sm text-white'>
        <h3 className='mb-2 font-bold'>Useful Tips</h3>
        <ul className='ml-4' style={{listStyle: 'outside'}}>
          <li>An ideal password must be at least 8 characters long.</li>
          <li>An ideal password must be at most 15 characters long.</li>
          <li>An ideal password must contain at least 1 small and 1 capital Alphabet.</li>
          <li>An ideal password must contain at least 1 number and 1 special character.</li>
        </ul>
      </div>
    </div>
  )
}

export default App
