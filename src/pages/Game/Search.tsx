import { Input } from '@/components/ui/input.tsx'

interface SearchProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ onChange }: SearchProps) => {
    return <Input name="search" placeholder="Filter:" onChange={onChange} />
}

export default Search
