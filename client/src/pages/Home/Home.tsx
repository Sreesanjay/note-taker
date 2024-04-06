import { useAppSelector } from "../../app/hooks";
import NewNote from "../../components/NewNote/NewNote";
import Sidebar from "../../components/Sidebar/Sidebar";
import ViewNote from "../../components/ViewNote/ViewNote";

export default function Home() {
     const { currentNote } = useAppSelector((state) => state.notes);
     return (
          <div className="text-white grid grid-cols-12 fixed w-screen">
               <div className="side-bars col-span-4">
                    <Sidebar />
               </div>
               <div className="main col-span-8">
                    {currentNote ? <ViewNote /> : <NewNote />}
               </div>
          </div>
     );
}
