import { useState } from "react";
import { Toaster } from "react-hot-toast";
import ColorInput from "./components/ColorInput/ColorInput";
import "./App.css";
import GenerateContrastGridColors from "./components/ContrastChecker/GenerateContrastGridColors";

function App() {
  const [color, setColor] = useState("#4512ab");

  const [generatedColor, setGeneratedColor] = useState(color);

  const handleGenerateColors = () => {
    setGeneratedColor(color);
  };

  return (
    <div>
      <Toaster />
      <main className="mx-auto max-w-5xl lg:max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-medium text-center">
          GHW | Color Palette Generator
        </h1>
        <section className="p-1 border-2 border-slate-300 rounded-xl mt-10">
          <ColorInput colorValue={color} onChangeColor={setColor} />
          <div className="text-center mx-auto mt-6">
            <button
              onClick={handleGenerateColors}
              className="px-4 py-2 border rounded-md border-slate-200 text-slate-500"
              style={{ backgroundColor: color }}
            >
              Generate Colors
            </button>
            <div className="my-6">
              <GenerateContrastGridColors baseColor={generatedColor} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
