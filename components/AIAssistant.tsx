
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { getAIRecommendation } from '../services/geminiService';
import { Movie } from '../types';

interface AIAssistantProps {
  inventory: Movie[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ inventory }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const response = await getAIRecommendation(userMsg, inventory);
    setMessages(prev => [...prev, { role: 'bot', content: response }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
      <div className="bg-slate-800 p-6 border-b border-slate-700 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center shadow-lg">
          <Sparkles className="text-slate-900 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">CineMaster AI</h2>
          <p className="text-sm text-slate-400">Recomendaciones personalizadas basadas en tu catálogo</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Bot className="w-16 h-16" />
            <p className="text-lg">Pregúntame algo sobre tu catálogo.<br/>Ejemplo: "¿Qué película me recomiendas similar a Interstellar?"</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-amber-500'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' ? 'bg-amber-500 text-slate-900 rounded-tr-none font-medium' : 'bg-slate-800 border border-slate-700 rounded-tl-none text-slate-200'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center text-slate-400 italic text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              CineMaster está pensando...
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-800/50 border-t border-slate-700">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Escribe tu consulta aquí..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-2 p-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 rounded-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
