import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NoteCard from "../NoteCard/NoteCard";
import "./Sidebar.css";
import { setCurrentNote } from "../../features/notesSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { logout } from "../../features/authSlice";
import { getNotes } from "../../service/notesService";

export default function Sidebar() {
     const dispatch = useAppDispatch();
     const [isOpenList, setIsOpenList] = useState(false);
     const { user } = useAppSelector((state) => state.auth);
     const { notes } = useAppSelector((state) => state.notes);
     const [searchKey, setSearchKey] = useState("");

     useEffect(() => {
          const delayDebounceFn = setTimeout(() => {
               dispatch(getNotes(searchKey));
          }, 1000);
          return () => clearTimeout(delayDebounceFn);
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [searchKey]);

     return (
          <div className="sidebar  bg-secondary-bg p-5 pe-14 h-screen">
               <div className="header flex items-center justify-between">
                    <h1 className="text-2xl">Notes</h1>
                    <div className="profile-icon relative">
                         <div
                              className="profile-icon text-3xl p-2 px-4 rounded-full bg-black cursor-pointer"
                              onClick={() => setIsOpenList(!isOpenList)}
                         >
                              {user?.email[0].toUpperCase()}
                         </div>
                         {isOpenList && (
                              <div className="absolute bg-gray-800 right-4 mt-1 rounded-md">
                                   <List>
                                        <ListItem disablePadding>
                                             <ListItemButton>
                                                  <p
                                                       className="px-5 pe-10"
                                                       onClick={() => {
                                                            dispatch(logout());
                                                       }}
                                                  >
                                                       Logout
                                                  </p>
                                             </ListItemButton>
                                        </ListItem>
                                   </List>
                              </div>
                         )}
                    </div>
               </div>
               <button
                    className="w-full bg-tertiary py-2 rounded-md text-white text-xl mt-5"
                    onClick={() => {
                         dispatch(setCurrentNote(null));
                    }}
               >
                    New Note
               </button>
               <div className="search-bar">
                    <input
                         type="text"
                         className="bg-secondary-bg border mt-4 w-full h-12 rounded-md ps-3"
                         onChange={(e) => {
                              setSearchKey(e.target.value);
                         }}
                         placeholder="Search"
                    />
               </div>
               <div className="note-cards mt-9 overflow-y-scroll h-5/6">
                    {notes.map((item) => {
                         return <NoteCard note={item} key={item._id} />;
                    })}
               </div>
          </div>
     );
}
