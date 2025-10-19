import { ModeToggle } from '@/components/theme/mode-toggle.tsx'
import HamburgerMenu from '@/components/hamburger-menu'

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-2">
            <HamburgerMenu />
            <ModeToggle />
        </nav>
    )
}

export default NavBar
