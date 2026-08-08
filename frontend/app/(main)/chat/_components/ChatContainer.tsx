import ChatList from "./ChatList";

function ChatContainer() {
  return (
    <section className="max-h-full overflow-auto pt-20">
      {/* heading section on top */}
      <section className="flex flex-col items-center gap-4  px-4">
        <div>
          <h3 className="text-neutral-600 text-3xl font-bold">John Doe</h3>
        </div>
        <div>
          <p className="text-olive-500 text-xs">
            This is the very beginning you are chatting with John Doe
          </p>
        </div>
      </section>

      {/* chat list section */}
      <section className="px-4 pb-10">
        <ChatList />
      </section>
    </section>
  );
}

export default ChatContainer;
