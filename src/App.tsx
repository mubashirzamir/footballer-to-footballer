import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import { ThemeProvider } from '@/components/theme/theme-provider.tsx'
import { ModeToggle } from '@/components/theme/mode-toggle.tsx'

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <div className="p-4">
                    <ModeToggle />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/play/{start_id}/{end_id}" element={<Game />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
