import ChatStoreProvider from "@/shared/store/chat-store/ChatStoreProvider";
import ChatHeader from "./_components/ChatHeader";
import ChatInput from "./_components/ChatInput";
import ContactContainer from "./_components/ContactContainer";

interface ChatLayoutProps {
  children: React.ReactNode;
}

function layout({ children }: ChatLayoutProps) {
  return (
    <ChatStoreProvider>
      <main>
        <div className="flex h-dvh">
          {/* contact list container */}
          <div className="w-[350px] border-r border-neutral-200 max-h-full px-3 bg-olive-100">
            <ContactContainer />
          </div>
          {/* chat container */}
          <div className="grow relative h-full py-4 bg-olive-50">
            <section className="absolute top-0 left-0 right-0 px-4 py-4 bg-olive-500 border-olive-300 z-1">
              <ChatHeader />
            </section>
            {children}
            {/* chat input */}
            <section className="w-full py-4 bg-olive-300 absolute bottom-0 left-0 right border-t border-olive-200 px-4">
              <ChatInput />
            </section>
          </div>
        </div>
      </main>
    </ChatStoreProvider>
  );
}

export default layout;
