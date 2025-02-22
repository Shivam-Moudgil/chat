// src/components/ChannelHeader.tsx

interface ChannelHeaderProps {
    channelName: string | null;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName }) => {
    return (
        <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">
                {channelName ? `# ${channelName}` : 'Select a channel'}
            </h2>
        </div>
    );
};

export default ChannelHeader;
