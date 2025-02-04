import { useState } from "react";

function App() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [filePath, setFilePath] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const scriptPath = import.meta.env.VITE_SCRIPT_PATH;
  const ocFinderPath = import.meta.env.VITE_OC_FINDER_PATH;
  const condaActivatePath = import.meta.env.VITE_CONDA_ACTIVATE_PATH;

  const handleRun = async (e) => {
    e.preventDefault();
    setError("");
    setOutput("");
    setIsLoading(true);
    try {
      if (window.electron === undefined) {
        setError("window.electron is undefined");
        return;
      }

      const result = await window.electron.runScript(
        width,
        height,
        filePath,
        scriptPath,
        ocFinderPath,
        condaActivatePath
      );
      setOutput(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form
        className="flex flex-col gap-4 max-w-[800px] mx-auto"
        onSubmit={handleRun}
      >
        <h1 className="text-xl font-bold">OC_Finder GUI</h1>

        <p>
          After submitting the form by pressing the "Run" button expect to see a
          spinner within the "Run" button for a bit. This represents a loading
          state, meaning OC_Finder is currently running.
        </p>
        <p>
          After the spinner disappears expect to see program logs. If the
          program finishes successfully the output will be available at:
          <br />
          {ocFinderPath}/Predict_Result/[Name of the original photo]
        </p>
        <p>
          If running a program on the same photo, it's advised to delete/move
          previous output if any:
          <br />
          {ocFinderPath}/Predict_Result/[Name of the original photo]
        </p>

        <div className="flex flex-col gap-1">
          <label>Width</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="rounded-md border px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="rounded-md border px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Full path to the photo</label>
          <input
            type="text"
            placeholder='Including quotes, for e.g: "/path/to the/photo"'
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="rounded-md border px-3 py-2"
            required
          />
        </div>
        <div className="flex">
          <button
            className={`flex items-center gap-4 bg-black text-white py-2 rounded-md px-24 ml-auto font-bold text-lg ${
              isLoading
                ? "opacity-80 hover:cursor-not-allowed"
                : "hover:opacity-80"
            }`}
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            Run
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-12 flex flex-col">
          <small>Runtime error:</small>
          <textarea
            disabled
            className="min-h-[200px] rounded-md bg-gray-100 px-3 py-2"
          >
            {error}
          </textarea>
        </div>
      )}

      {output && (
        <div className="mt-12 flex flex-col">
          <small>Program logs:</small>
          <textarea
            disabled
            className="min-h-[200px] rounded-md bg-gray-100 px-3 py-2"
          >
            {output}
          </textarea>
        </div>
      )}
    </div>
  );
}

export default App;
