import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import reload from './assets/reload.png'
import copy from './assets/copy.png'
import generatePassword from './services/generatePassword'
import checkPassword from './services/checkPassword'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass_new = generatePassword(length, numberAllowed, charAllowed);
    setPassword(pass_new);
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
      <div className='md:w-xl sm:w-lg max-sm:w-full shadow-md rounded-lg px-4 py-4 my-6 bg-gray-700 mx-auto text-center'>
        <h1 className='text-3xl font-bold text-white mb-3'>Password Utility</h1>
        <div className='flex max-sm:flex-col max-sm:gap-3 justify-between shadow p-3 rounded-lg overflow-hidden mb-4 bg-gray-600'>
          <input 
            type="text"
            value={password}
            className={`w-full outline-none px-3 py-2 rounded-tl-lg rounded-bl-lg max-sm:rounded-tr-lg max-sm:rounded-br-lg bg-white`}
            placeholder='Password'
            ref={passwordRef}
            readOnly
          />
          
          <button id='btn-copy' className={`bg-blue-400 max-sm:hidden text-white px-3 rounded-tr-lg rounded-br-lg shrink-0 cursor-pointer max-sm:rounded-tl-lg max-sm:rounded-bl-lg`} title='Copy' onClick={copyPasswordToClipboard}><img src={copy} alt="copy" className='w-6'/></button>
          <button id='btn-reload' className='bg-blue-400 max-sm:hidden text-white px-3 rounded-lg shrink-0 ml-2' title='Regenerate' onClick={passwordGenerator}><img src={reload} alt="regenerate" className='w-6'/></button>

          <div className='flex justify-between min-sm:hidden '>
            <h4 className='text-white my-auto'>{checkPassword(password.split("")) ? "✅ Strong" : "❌ Weak"}</h4>
            <div className='flex justify-end-safe'>
              <button id='btn-copy' className={`bg-blue-400 w-fit text-white px-3 py-2.5 rounded-tr-lg rounded-br-lg shrink-0 cursor-pointer max-sm:rounded-tl-lg max-sm:rounded-bl-lg`} title='Copy' onClick={copyPasswordToClipboard}><img src={copy} alt="copy" className='w-6'/></button>
              <button id='btn-reload' className='bg-blue-400 w-fit text-white px-3 py-2.5 rounded-lg shrink-0 ml-2' title='Regenerate' onClick={passwordGenerator}><img src={reload} alt="regenerate" className='w-6'/></button>
            </div>
          </div>
        </div>

        <div className='flex gap-x-4 justify-between text-sm max-md:flex-col max-md:gap-y-4'>
          <div className='max-sm:hidden text-start'>
            <h4 className='text-white my-auto'>{checkPassword(password.split("")) ? "✅ Strong" : "❌ Weak"}</h4>
          </div>
          <div className='flex gap-x-4 max-md:flex-col max-md:gap-y-4'>
            <div className='flex gap-x-2 items-center text-white'>
              <input 
                type="range"
                min={6}
                max={25}
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
      </div>

      <div className='md:w-xl sm:w-lg max-sm:w-full shadow-md rounded-lg px-4 py-4 my-6 bg-gray-700 mx-auto text-left max-sm:text-sm text-white'>
        <h3 className='mb-2 font-bold'>Useful Tips</h3>
        <ul className='ml-4' style={{listStyle: 'outside'}}>
          <li>A password must be at least 8 characters long.</li>
          <li>A strong password should contain at least 1 small and 1 capital Alphabet.</li>
          <li>A strong password should contain at least 1 number and 1 special character.</li>
          <li>The passwords of 16 or more characters are considered more strong and secure.</li>
        </ul>
      </div>
    </div>
  )
}

export default App
