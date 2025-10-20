import { __ } from '@/lang/lang.ts'
import Text from '@/components/Text.tsx'

const About = () => {
    const { title, contact, email, disclaimer, credits } = __.messages.about
    const disclaimerParts = disclaimer.split('{link}')
    const credit_parts = credits.split('{link}')

    return (
        <div className="flex flex-col min-h-screen gap-4 p-2     md:p-8">
            <Text className="text-start text-3xl">{title}</Text>
            <Text className="text-start">
                {contact}:&nbsp;
                <a className="underline" href="mailto:">
                    {email}
                </a>
            </Text>
            <Text className="text-start">
                {disclaimerParts[0]}
                <a
                    href="https://www.transfermarkt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    transfermarkt.com
                </a>
                {disclaimerParts[1]}
            </Text>
            <Text className="text-start">
                {credit_parts[0]}
                <a
                    href="https://movietomovie.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    movietomovie.com
                </a>
                {credit_parts[1]}
            </Text>
        </div>
    )
}

export default About
