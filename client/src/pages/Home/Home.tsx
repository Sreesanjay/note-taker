import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NewNote from "../../components/NewNote/NewNote";
import Sidebar from "../../components/Sidebar/Sidebar";
import ViewNote from "../../components/ViewNote/ViewNote";
import { getNotes } from "../../service/notesService";

export default function Home() {
     const { currentNote } = useAppSelector((state) => state.notes);
     const dispatch = useAppDispatch();
     useEffect(() => {
          dispatch(getNotes(""));
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
     return (
          <div className="text-white grid grid-cols-12 fixed w-screen">
               <div className={`side-bars ${currentNote && 'hidden'} sm:block col-span-12 sm:col-span-4`}>
                    <Sidebar />
               </div>
               <div className="main col-span-12 sm:col-span-8 ">
                    {currentNote ? <ViewNote /> : <NewNote />}
               </div>
          </div>
     );
}
