import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
};

type Call = {
  id: number;
  name: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  time: string;
  avatar: string;
};

type Message = {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const mockChats: Chat[] = [
    {
      id: 1,
      name: 'Алексей Смирнов',
      lastMessage: 'Привет! Как дела? 👋',
      time: '12:45',
      avatar: '',
      unread: 3,
      online: true,
    },
    {
      id: 2,
      name: 'Дизайн Команда',
      lastMessage: 'Мария: Отличная идея!',
      time: '11:20',
      avatar: '',
      unread: 0,
      online: false,
      isGroup: true,
    },
    {
      id: 3,
      name: 'Ольга Петрова',
      lastMessage: 'Созвонимся в 3?',
      time: 'Вчера',
      avatar: '',
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: 'Проект 2024',
      lastMessage: 'Иван: Документы готовы',
      time: 'Вчера',
      avatar: '',
      unread: 0,
      online: false,
      isGroup: true,
    },
  ];

  const mockCalls: Call[] = [
    {
      id: 1,
      name: 'Алексей Смирнов',
      type: 'incoming',
      duration: '12:34',
      time: '14:30',
      avatar: '',
    },
    {
      id: 2,
      name: 'Ольга Петрова',
      type: 'outgoing',
      duration: '05:12',
      time: '11:15',
      avatar: '',
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      type: 'missed',
      duration: '—',
      time: 'Вчера',
      avatar: '',
    },
  ];

  const mockMessages: Message[] = [
    {
      id: 1,
      text: 'Привет! Как проект продвигается?',
      time: '12:30',
      isMine: false,
    },
    {
      id: 2,
      text: 'Отлично! Завтра покажу результаты',
      time: '12:32',
      isMine: true,
    },
    {
      id: 3,
      text: 'Супер! Жду с нетерпением 🚀',
      time: '12:33',
      isMine: false,
    },
    {
      id: 4,
      text: 'Кстати, нашел интересное решение для анимаций',
      time: '12:35',
      isMine: true,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <div className="w-20 bg-sidebar flex flex-col items-center py-6 space-y-8 border-r border-sidebar-border">
        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-xl animate-pulse-glow">
          C
        </div>

        <nav className="flex-1 flex flex-col space-y-6">
          <button
            onClick={() => setActiveTab('chats')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover-lift ${
              activeTab === 'chats'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            <Icon name="MessageCircle" size={24} />
          </button>

          <button
            onClick={() => setActiveTab('calls')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover-lift ${
              activeTab === 'calls'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            <Icon name="Phone" size={24} />
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover-lift ${
              activeTab === 'contacts'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            <Icon name="Users" size={24} />
          </button>
        </nav>

        <button
          onClick={() => setSettingsOpen(true)}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-all hover-lift"
        >
          <Icon name="Settings" size={24} />
        </button>
      </div>

      <div className="w-96 flex flex-col border-r border-border bg-card">
        <div className="p-6 space-y-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {activeTab === 'chats' && 'Чаты'}
              {activeTab === 'calls' && 'Звонки'}
              {activeTab === 'contacts' && 'Контакты'}
            </h1>
            {activeTab === 'chats' && (
              <Button
                onClick={() => setCreateGroupOpen(true)}
                size="icon"
                className="rounded-full gradient-primary hover:opacity-90 transition-opacity"
              >
                <Icon name="Plus" size={20} />
              </Button>
            )}
          </div>

          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl bg-muted border-0"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {activeTab === 'chats' && (
            <div className="divide-y divide-border">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 flex items-start gap-3 transition-all hover:bg-muted/50 animate-fade-in ${
                    selectedChat?.id === chat.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="gradient-card">
                        {chat.isGroup ? (
                          <Icon name="Users" size={20} />
                        ) : (
                          chat.name[0]
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <Badge className="ml-2 gradient-primary border-0 text-white">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'calls' && (
            <div className="divide-y divide-border">
              {mockCalls.map((call) => (
                <div
                  key={call.id}
                  className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-all animate-fade-in"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={call.avatar} />
                    <AvatarFallback className="gradient-card">
                      {call.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {call.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon
                        name={
                          call.type === 'incoming'
                            ? 'PhoneIncoming'
                            : call.type === 'outgoing'
                            ? 'PhoneOutgoing'
                            : 'PhoneMissed'
                        }
                        size={14}
                        className={
                          call.type === 'missed' ? 'text-destructive' : ''
                        }
                      />
                      <span>{call.duration}</span>
                      <span>•</span>
                      <span>{call.time}</span>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon name="Phone" size={18} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="p-6 space-y-4">
              <Button className="w-full gradient-primary text-white hover:opacity-90 transition-opacity rounded-xl">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Добавить контакт
              </Button>

              <div className="space-y-2">
                {mockChats
                  .filter((c) => !c.isGroup)
                  .map((contact) => (
                    <div
                      key={contact.id}
                      className="p-3 rounded-xl hover:bg-muted transition-all animate-fade-in"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="gradient-card">
                            {contact.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">
                            {contact.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {contact.online ? 'В сети' : 'Не в сети'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-6 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback className="gradient-card">
                    {selectedChat.isGroup ? (
                      <Icon name="Users" size={18} />
                    ) : (
                      selectedChat.name[0]
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? 'В сети' : 'Не в сети'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="Phone" size={20} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="Video" size={20} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-muted"
                >
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4 max-w-3xl mx-auto">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex animate-fade-in ${
                      message.isMine ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.isMine
                          ? 'gradient-primary text-white rounded-br-md'
                          : 'bg-muted text-foreground rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.isMine
                            ? 'text-white/70'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border bg-card">
              <div className="flex gap-3 items-end max-w-3xl mx-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-muted flex-shrink-0"
                >
                  <Icon name="Paperclip" size={20} />
                </Button>

                <div className="flex-1 relative">
                  <Input
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="rounded-2xl pr-12 bg-muted border-0"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-background"
                  >
                    <Icon name="Smile" size={20} />
                  </Button>
                </div>

                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="rounded-full gradient-primary hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-32 h-32 mx-auto rounded-full gradient-primary opacity-20 animate-pulse-glow" />
              <h2 className="text-2xl font-bold text-muted-foreground">
                Выберите чат
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Выберите существующий чат или создайте новый, чтобы начать
                общение
              </p>
            </div>
          </div>
        )}
      </div>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Настройки</DialogTitle>
            <DialogDescription>
              Персонализируйте ваше приложение
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="theme">Тема</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="gradient-primary text-white text-2xl">
                    Я
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <Label>Имя пользователя</Label>
                  <Input placeholder="Ваше имя" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Телефон</Label>
                <Input placeholder="+7 (___) ___-__-__" />
              </div>

              <div className="space-y-2">
                <Label>О себе</Label>
                <Input placeholder="Расскажите о себе" />
              </div>
            </TabsContent>

            <TabsContent value="theme" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Фиолетовый', class: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                  { name: 'Синий', class: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
                  { name: 'Зелёный', class: 'bg-gradient-to-r from-green-500 to-emerald-500' },
                  { name: 'Оранжевый', class: 'bg-gradient-to-r from-orange-500 to-red-500' },
                ].map((theme) => (
                  <button
                    key={theme.name}
                    className={`h-20 rounded-xl ${theme.class} hover:scale-105 transition-transform flex items-center justify-center text-white font-semibold`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Звук уведомлений</p>
                    <p className="text-sm text-muted-foreground">
                      Воспроизводить звук при новых сообщениях
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Volume2" size={16} />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Вибрация</p>
                    <p className="text-sm text-muted-foreground">
                      Включить вибрацию при уведомлениях
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Smartphone" size={16} />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Предпросмотр</p>
                    <p className="text-sm text-muted-foreground">
                      Показывать текст сообщения в уведомлении
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={16} />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={createGroupOpen} onOpenChange={setCreateGroupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать группу</DialogTitle>
            <DialogDescription>
              Создайте новую группу для общения с друзьями
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Название группы</Label>
              <Input placeholder="Введите название группы" />
            </div>

            <div className="space-y-2">
              <Label>Добавить участников</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {mockChats
                  .filter((c) => !c.isGroup)
                  .map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="gradient-card text-xs">
                          {contact.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{contact.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            <Button className="w-full gradient-primary text-white hover:opacity-90 transition-opacity">
              Создать группу
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;