import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx'

interface SeasonSelectorProps {
    seasonId: string
    seasons: { id: string; text: string }[]
    onChange: (seasonId: string) => void
}

const SeasonSelector = ({ seasonId, seasons, onChange }: SeasonSelectorProps) => {
    return (
        <Select value={seasonId} onValueChange={onChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a season" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Season</SelectLabel>
                    {seasons.map((season) => {
                        return (
                            <SelectItem key={season.id} value={season.id}>
                                {season.text}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SeasonSelector
