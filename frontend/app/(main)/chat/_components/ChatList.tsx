import ChatItems from "./ChatItems";

function ChatList() {
  return (
    <div className="pt-20">
      {Array.from({ length: 30 }).map((_, i: number) => {
        return <ChatItems key={i} />;
      })}
    </div>
  );
}

export default ChatList;
