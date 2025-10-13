import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/Home'
import Game from '@/pages/Game'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play/{start_id}/{end_id}" element={<Game />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
