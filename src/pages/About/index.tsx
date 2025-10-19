import { __ } from '@/lang/lang.ts'
import Text from '@/components/Text.tsx'

const About = () => {
    const { about_disclaimer } = __.messages
    const parts = about_disclaimer.split('{link}')

    return (
        <div className="flex flex-col min-h-screen gap-4 p-2     md:p-8">
            <Text className="text-start text-3xl">{__.messages.about_heading}</Text>
            <Text className="text-start">
                {__.messages.about_contact}:&nbsp;
                <a className="underline" href="mailto:">
                    {__.messages.about_email}
                </a>
            </Text>
            <Text className="text-start">
                {parts[0]}
                <a
                    href="https://www.transfermarkt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    transfermarkt.com
                </a>
                {parts[1]}
            </Text>
        </div>
    )
}

export default About
