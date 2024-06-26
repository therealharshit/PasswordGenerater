import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);

  const generatePassword = () => {
    let Password = "";
    let str = "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm";
    if (number) str += "1234567890";
    if (specialCharacter) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      Password += str.charAt(index);
    }
    setPassword(Password);
    console.log(Password);
  };

  // useCallback is a hook used to optimize the function everytime there is a change in the dependencies
  const passwordGenerator = useCallback(generatePassword, [
    length,
    number,
    specialCharacter,
    setPassword,
  ]);

  // here useEffect is a hook used to run the function everytime there is a change in the dependencies and when the page is load
  useEffect(() => {
    passwordGenerator();
  }, [length, number, specialCharacter, passwordGenerator]);

  // useRef is used to create a ref variable
  const passwordRef = useRef();

  const copyToClipboard = () => {
    passwordRef.current?.select(); //will highligth the selected password
    passwordRef.current?.setSelectionRange(0, length); //will set the range of selection
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-10 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={specialCharacter}
              id="characterInput"
              onChange={() => setSpecialCharacter((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
