import { ModeToggle } from '@/components/theme/mode-toggle.tsx'
import { useLocation } from 'react-router'
import Text from '@/components/Text.tsx'

const NavBar = () => {
    const { pathname } = useLocation()

    return (
        <nav className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
                {pathname !== '/' && (
                    <a href="/">
                        <Text text="Footballer to Footballer" className="text-lg font-extrabold" />
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
