import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { sendChatMessage } from '../services/aiChatService';
import type { ChatMessage } from '../services/aiChatService';

interface AIChatContextType {
  messages: ChatMessage[];
  loading: boolean;
  activeSection: string;
  activeSectionTitle: string;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  setActiveSectionContext: (id: string, title: string) => void;
  sendMessage: (text: string) => Promise<void>;
  clearHistory: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const AIChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: '🤖 ¡Hola! Soy **RISKO Copilot**, el Asistente Agéntico de Inteligencia para Gestión y Medición del Riesgo Inmobiliario. Estoy conectado con los 16 módulos operacionales de la plataforma (GeoRisk GIS, Evidence Vault, RAG Extractor, NFPA Fire, Continuidad BI y Motor de Riesgo AAL/PML). ¿En qué expediente o análisis de cartera puedo asistirte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('command-center');
  const [activeSectionTitle, setActiveSectionTitle] = useState('Command Center Ejecutivo');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const setActiveSectionContext = (id: string, title: string) => {
    setActiveSection(id);
    setActiveSectionTitle(title);
  };

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const responseText = await sendChatMessage(text, activeSectionTitle);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <AIChatContext.Provider
      value={{
        messages,
        loading,
        activeSection,
        activeSectionTitle,
        isChatOpen,
        setIsChatOpen,
        setActiveSectionContext,
        sendMessage,
        clearHistory
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error('useAIChat debe usarse dentro de un AIChatProvider');
  }
  return context;
};
