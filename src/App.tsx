import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import { ThemeProvider } from '@/components/theme/theme-provider.tsx'
import NavBar from '@/components/NavBar.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import Fallback from '@/components/Fallback.tsx'
import NotFound from '@/pages/NotFound'

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary fallback={<Fallback />}>
                <ThemeProvider>
                    <NavBar />
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/play/{start_id}/{end_id}" element={<Game />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default App
