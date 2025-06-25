import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="flex justify-center mb-8">
                <a href="https://vite.dev" target="_blank" className="mx-2">
                    <img src={viteLogo} className="h-24 w-auto hover:scale-110 transition-transform" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" className="mx-2">
                    <img src={reactLogo} className="h-24 w-auto hover:scale-110 transition-transform" alt="React logo" />
                </a>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Vite + React + Tailwind</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setCount((count) => count + 1)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        count is {count}
                    </button>
                </div>
                <p className="text-gray-600 text-center">
                    Edit <code className="bg-gray-100 px-1 rounded">src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="mt-8 text-gray-500 text-sm">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default App
