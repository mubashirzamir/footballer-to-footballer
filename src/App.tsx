import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import { ThemeProvider } from '@/components/theme/theme-provider.tsx'
import { ModeToggle } from '@/components/theme/mode-toggle.tsx'

function App() {
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    )
}

const Main = () => {
    const { pathname } = useLocation()

    return (
        <ThemeProvider>
            <div>
                <nav className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-4">
                        {pathname !== '/' && (
                            <a href="/" className="text-lg font-semibold">
                                Footballer to Footballer
                            </a>
                        )}
                    </div>
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play/{start_id}/{end_id}" element={<Game />} />
                </Routes>
            </div>
        </ThemeProvider>
    )
}

export default App
