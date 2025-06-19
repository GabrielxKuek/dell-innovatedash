const MessageOptions = ({ options, onOptionSelect }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="bg-pink-accent border-t border-pink-muted p-4">
      <div className="space-y-3">
        <p className="text-xs text-pink-primary mb-3 text-center font-medium">Choose a response:</p>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option)}
            className="w-full text-left p-4 text-sm text-white bg-pink-primary hover:bg-pink-secondary rounded-xl transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessageOptions;