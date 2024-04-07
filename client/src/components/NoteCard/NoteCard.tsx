import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentNote } from "../../features/notesSlice";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { INote } from "../../types";
import "./NoteCard.css";
import TimeAgo from "react-timeago";
import { updateNote } from "../../service/notesService";

export default function NoteCard({ note }: { note: INote }) {
     const dispatch = useAppDispatch();
     const { currentNote } = useAppSelector((state) => state.notes);
     function handlePin() {
          dispatch(
               updateNote({
                    note: {
                         title: note.title,
                         note: note.note,
                         isPinned: true,
                    },
                    id: note?._id as string,
               })
          );
     }
     function handleUnpin() {
          dispatch(
               updateNote({
                    note: {
                         title: note.title,
                         note: note.note,
                         isPinned: false,
                    },
                    id: note?._id as string,
               })
          );
     }
     return (
          <div
               className={`note-card px-4 cursor-pointer rounded-md p-2 mb-5 ${
                    note._id === currentNote?._id ? "bg-gray-900" : ""
               } `}
          >
               <div className="date flex justify-between text-sm">
                    {note.isPinned ? (
                         <div className="" onClick={handleUnpin}>
                              <PushPinIcon sx={{ fontSize: 18 }} />
                         </div>
                    ) : (
                         <div className="" onClick={handlePin}>
                              <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
                         </div>
                    )}
                    <TimeAgo
                         date={note.createdAt}
                         minPeriod={6}
                         formatter={(
                              value: number,
                              unit: TimeAgo.Unit,
                              suffix: TimeAgo.Suffix
                         ) => {
                              if (unit === "second") return "just now";
                              const plural: string = value !== 1 ? "s" : "";
                              return `${value} ${unit}${plural} ${suffix}`;
                         }}
                    />
               </div>
               <div
                    className="content"
                    onClick={() => {
                         dispatch(setCurrentNote(note));
                    }}
               >
                    <h1 className="text-lg my-2 font-medium">{note.title}</h1>
                    <div
                         className="text-sm overflow-hidden h-16"
                         dangerouslySetInnerHTML={{ __html: note.note }}
                    ></div>
               </div>
          </div>
     );
}
