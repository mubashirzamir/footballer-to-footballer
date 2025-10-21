import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import { ThemeProvider } from '@/components/theme/theme-provider.tsx'
import NavBar from '@/components/NavBar.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import Fallback from '@/components/Fallback.tsx'
import NotFound from '@/pages/NotFound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Help from '@/pages/Help'
import About from '@/pages/About'
import ContextsProviders from '@/contexts-providers'

const queryClient = new QueryClient()

const App = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={Fallback}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                        <NavBar />
                        <div>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/play/:start_player_id/:end_player_id"
                                    element={
                                        <ContextsProviders>
                                            <Game />
                                        </ContextsProviders>
                                    }
                                />
                                <Route path="/help" element={<Help />} />
                                <Route path="/about" element={<About />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </div>
                    </ThemeProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default App
