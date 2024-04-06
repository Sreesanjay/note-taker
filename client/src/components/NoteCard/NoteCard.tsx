import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentNote } from "../../features/notesSlice";
import { INote } from "../../types";
import "./NoteCard.css";
import TimeAgo from "react-timeago";

export default function NoteCard({ note }: { note: INote }) {
     const dispatch = useAppDispatch();
     const { currentNote } = useAppSelector((state) => state.notes);
     return (
          <div
               className={`note-card px-4 cursor-pointer rounded-md p-2 mb-5 ${
                    note._id === currentNote?._id ? "bg-gray-900" : ""
               } `}
               onClick={() => {
                    dispatch(setCurrentNote(note));
               }}
          >
               <div className="date flex justify-end text-sm">
                    {" "}
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
               <h1 className="text-lg mb-2 font-medium">{note.title}</h1>
               <div
                    className="text-sm overflow-hidden h-16"
                    dangerouslySetInnerHTML={{ __html: note.note }}
               ></div>
          </div>
     );
}
