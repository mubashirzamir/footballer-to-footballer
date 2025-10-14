import { Spinner } from '@/components/ui/spinner.tsx'

interface BaseSpinnerProps {
    className?: string
}

const BaseSpinner = ({ className }: BaseSpinnerProps) => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <Spinner className={className} />
        </div>
    )
}

export default BaseSpinner
