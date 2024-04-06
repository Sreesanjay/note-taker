import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createNote } from "../../service/notesService";
import Loader from "../Loader/Loader";
import { reset } from "../../features/notesSlice";
import { useNavigate } from "react-router-dom";

export default function NewNote() {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { notes, isLoading, isSuccess } = useAppSelector(
          (state) => state.notes
     );
     const [note, setNote] = useState("");
     const [title, setTitle] = useState("");

     useEffect(() => {
          setTitle("untitled note (" + notes.length + ")");
     }, [notes]);

     useEffect(() => {
          if (isSuccess) {
               dispatch(reset());
               navigate("/");
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [isSuccess]);

     function handleSubmit() {
          dispatch(createNote({ title, note }));
     }

     const modules = {
          toolbar: [
               [{ header: [1, 2, false] }],
               ["bold", "italic", "underline", "strike", "blockquote"],
               [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
               ],
               ["link", "image"],
               ["clean"],
          ],
     };

     const formats = [
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
     ];
     return (
          <div className=" h-full p-4 w-full">
               <h1 className="mb-5 text-2xl">New Note</h1>
               <div className="form-group flex flex-col gap-3 mb-5">
                    <label htmlFor="">Title</label>
                    <input
                         type="text"
                         value={title}
                         placeholder="Enter the title"
                         className="bg-primary-bg border p-2"
                         onChange={(e) => setTitle(e.target.value)}
                    />
               </div>
               <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={note}
                    onChange={setNote}
               />
               <div className="btn-group flex gap-5">
                    {isLoading ? (
                         <Loader />
                    ) : (
                         <>
                              <button
                                   className="px-6 py-1 rounded-sm mt-5 bg-red-700"
                                   onClick={() => {
                                        setNote("");
                                        setTitle("");
                                   }}
                              >
                                   Reset
                              </button>
                              <button
                                   className="px-6 py-1 rounded-sm mt-5 bg-tertiary"
                                   onClick={handleSubmit}
                              >
                                   Save
                              </button>
                         </>
                    )}
               </div>
          </div>
     );
}
