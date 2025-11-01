import { ArrowLeft, Send, Search, MoreVertical, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface MessagesPageProps {
  onBack: () => void;
}

const conversations = [
  {
    id: '1',
    name: 'Alex Turner',
    lastMessage: 'Thanks! I\'ll pick up the drill tomorrow morning.',
    time: '2h ago',
    unread: true,
    toolName: 'DeWalt Cordless Drill',
    avatar: 'AT',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    lastMessage: 'Is the saw still available for this weekend?',
    time: '5h ago',
    unread: true,
    toolName: 'Circular Saw',
    avatar: 'MG',
  },
  {
    id: '3',
    name: 'John Smith',
    lastMessage: 'Looking forward to the pickup!',
    time: '1d ago',
    unread: false,
    toolName: 'Table Saw 10"',
    avatar: 'JS',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    lastMessage: 'Great! The ladder worked perfectly.',
    time: '2d ago',
    unread: false,
    toolName: 'Extension Ladder 24ft',
    avatar: 'SJ',
  },
];

const messages = [
  {
    id: '1',
    sender: 'them',
    content: 'Hi! I\'m interested in renting your DeWalt drill for this weekend.',
    time: '10:30 AM',
  },
  {
    id: '2',
    sender: 'me',
    content: 'Hi Alex! The drill is available. When would you like to pick it up?',
    time: '10:35 AM',
  },
  {
    id: '3',
    sender: 'them',
    content: 'Would Saturday morning around 9 AM work?',
    time: '10:38 AM',
  },
  {
    id: '4',
    sender: 'me',
    content: 'Perfect! I\'ll have it ready for you. My address is 123 Main St.',
    time: '10:40 AM',
  },
  {
    id: '5',
    sender: 'them',
    content: 'Thanks! I\'ll pick up the drill tomorrow morning.',
    time: '11:15 AM',
  },
];

export function MessagesPage({ onBack }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.toolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="bg-white border-b sticky top-0 z-40 md:hidden">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl">Messages</h1>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-96 bg-white border-r flex flex-col">
          {/* Desktop Header */}
          <div className="hidden md:block p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl">Messages</h2>
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations */}
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                    selectedConversation.id === conv.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                  }`}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={selectedConversation.id === conv.id ? 'bg-blue-600 text-white' : ''}>
                      {conv.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-medium truncate">{conv.name}</div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">{conv.time}</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-1 truncate">{conv.toolName}</div>
                    <div className={`text-sm truncate ${conv.unread ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                      {conv.lastMessage}
                    </div>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Message Thread */}
        <div className="hidden md:flex flex-1 flex-col bg-white">
          {/* Thread Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{selectedConversation.name}</div>
                <div className="text-sm text-gray-600">{selectedConversation.toolName}</div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Tool</DropdownMenuItem>
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Report User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md ${message.sender === 'me' ? 'order-2' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 px-2 ${message.sender === 'me' ? 'text-right' : ''}`}>
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                  </Button>
                  <Textarea
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="resize-none border-0 focus-visible:ring-0 min-h-0"
                    rows={1}
                  />
                  <Button
                    size="icon"
                    className="shrink-0 bg-blue-600 hover:bg-blue-700"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Message Thread (shown when conversation selected) */}
        <div className="md:hidden flex-1 flex-col bg-white hidden">
          {/* This would be shown on mobile when a conversation is selected */}
        </div>
      </div>
    </div>
  );
}
