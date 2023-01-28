import { useEffect, useState } from 'react';
import script from './python/main.py';
import './App.css';

const runScript = async (code) => {
  const pyodide = await window.loadPyodide({
    indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
  });

  return await pyodide.runPythonAsync(code);
}

const App = () => {
  const [image, setImage] = useState();
  const [walletkeys, setWalletKeys] = useState()
  const [output, setOutput] = useState("(loading...)");

  function onImageChange(e) {
    setImage(e.target.files);
}

function onTextInput(e){
    setWalletKeys(e.target.value)
}

function onEncodeButtonClick(){
    alert('Encode Button Clicked')
}

  useEffect(() => {
    const run = async () => {
      const scriptText = await (await fetch(script)).text();
      const out = await runScript(scriptText);
      setOutput(out);
    }
    run();

  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <p className='text-4xl'>Encode Screen</p>
        <input className="m-4 w-1/4" type="file" accept="image/*" onChange={onImageChange}/>
        <input className="w-1/4 m-4" type="text" onChange={onTextInput}/>
        <p className='mx-4'>{walletkeys}</p>
        <div className="bg-black w-2/12 rounded-md flex justify-center mx-4">
            <button className="text-white" onClick={onEncodeButtonClick}>Encode Image</button>
        </div>
        <p>
          5 + 7 = {output}
        </p>
      </header>
    </div>
  );
}

export default App;
