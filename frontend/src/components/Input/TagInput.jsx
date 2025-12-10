import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { useState } from "react";

function TagInput({ tags, setTags }) {
  const [inputValue, setinputValue] = useState("");

  const handleInputChange = (e) => {
    setinputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setinputValue("");
    }
    console.log(tags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm flex items-center gap-2 text-slate-900 bg-slate-100 py-1 rounded"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1"
              >
                <IoMdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700h hover:bg-orange-500"
          onClick={() => {
            addNewTag();
          }}
        >
          <IoMdAddCircle className="text-2xl text-blue-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
