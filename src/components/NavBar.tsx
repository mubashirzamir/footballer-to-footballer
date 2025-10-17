import { ModeToggle } from '@/components/theme/mode-toggle.tsx'
import { useLocation } from 'react-router'

const NavBar = () => {
    const { pathname } = useLocation()

    return (
        <nav className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
                {pathname !== '/' && (
                    <a href="/">
                        <img className="w-8 h-8" src="/ball.svg" alt="Footballer to Footballer" />{' '}
                    </a>
                )}
            </div>
            <div>
                <ModeToggle />
            </div>
        </nav>
    )
}

export default NavBar
