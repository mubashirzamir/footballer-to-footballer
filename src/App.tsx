import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import { ThemeProvider } from '@/components/theme/theme-provider.tsx'
import NavBar from '@/components/NavBar.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import Fallback from '@/components/Fallback.tsx'
import NotFound from '@/pages/NotFound'
import NoGame from '@/pages/NoGame'

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={Fallback}>
                <ThemeProvider>
                    <NavBar />
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/play/:start_player_id/:end_player_id" element={<Game />} />
                            <Route path="/no-game" element={<NoGame />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default App
