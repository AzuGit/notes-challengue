import { FaSave } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function NoteCard({
  title,
  date,
  content,
  tags,
  archived,
  onEdit,
  onDelete,
  onArchive,
}) {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <FaSave
          className={`icon-btn ${
            archived ? "text-blue-500" : "text-orange-300"
          }`}
          onClick={onArchive}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item}`)}
        </div>

        <div className="flex items-center gap-2">
          <IoMdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
