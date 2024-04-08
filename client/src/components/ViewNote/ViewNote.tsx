import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteNote } from "../../service/notesService";
import "./ViewNote.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect } from "react";
import { reset } from "../../features/notesSlice";

export default function ViewNote() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const { currentNote, isSuccess } = useAppSelector((state) => state.notes);
     useEffect(() => {
          if (isSuccess) {
               dispatch(reset());
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [isSuccess]);
     return (
          <div className="p-10 text-2xl">
               <div className="header grid grid-cols-12">
                    <h1 className="mb-10 col-span-10">{currentNote?.title}</h1>
                    <div className="manage flex gap-5 justify-between sm:justify-end col-span-2">
                         <div
                              className="edit-icon cursor-pointer"
                              onClick={() =>
                                   navigate(`/edit/${currentNote?._id}`)
                              }
                         >
                              <ModeEditIcon />
                         </div>
                         <div
                              className="icon cursor-pointer"
                              onClick={() =>
                                   dispatch(
                                        deleteNote(currentNote?._id as string)
                                   )
                              }
                         >
                              <DeleteIcon />
                         </div>
                    </div>
               </div>
               <hr />
               <div
                    className="current-note mt-10 prose lg:prose-xl"
                    dangerouslySetInnerHTML={{
                         __html: currentNote ? currentNote.note : "",
                    }}
               ></div>
          </div>
     );
}
