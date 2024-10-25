import { useCallback, useEffect, useState,useRef } from "react";


function App() {

  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setpassword] = useState("");


  //useREF

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()";

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setpassword(pass);
   

  }, [length, numberAllowed, characterAllowed, setpassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed])


  return (
    
      
      <div className="w-full max-w-md mx-auto shadown-md rounded-lg  px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className=" text-4xl text-center text-slate-50">
        
        Password Generator
      </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
           type="text"
           value={password}
           className="outline-none w-full py-1 px-3 text-black"
           placeholder="password"
           readOnly
           ref={passwordRef}
          
          />
          <button  onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setlength(e.target.value)}}
            />
           <label > Length:{length} </label>
          </div>
          <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setnumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                  setcharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
      </div>

   
  );
}

export default App;
