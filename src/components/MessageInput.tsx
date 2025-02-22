import React, { useState, useRef } from 'react';
import { Paperclip, Smile, Send, Bold, Italic, Link as LinkIcon, Code, X } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, attachments: File[]) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFiles.length > 0) {
      onSendMessage(message.trim(), selectedFiles);
      setMessage('');
      setSelectedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const files: File[] = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }

    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-center space-x-2 mb-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Bold className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Italic className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <LinkIcon className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Code className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-lg px-3 py-1"
            >
              <span className="text-sm truncate max-w-xs">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 bg-gray-100 rounded-lg">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPaste={handlePaste}
            placeholder="Type a message..."
            className="w-full p-3 bg-transparent resize-none focus:outline-none min-h-[80px]"
          />
          <div className="flex items-center px-3 py-2 border-t border-gray-200">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1 hover:bg-gray-200 rounded mr-2"
            >
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded">
              <Smile className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim() && selectedFiles.length === 0}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;