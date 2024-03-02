import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { useGetLectureProgressQuery } from "../../redux/services/lmsMyCourseApi";
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
} from "../../redux/services/lmsMyCourseApi";

function LectureNotes({ lectures, courseId, currentLecture }) {
  const { t } = useTranslation();
  const [textNote, setTextNote] = useState("");
  const { data, isLoading, error } = useGetLectureProgressQuery(courseId);
  const [addNote, { isLoading: addNoteLoading, error: addNoteError }] =
    useAddNoteMutation();
  const [deleteNote, { isLoading: deleteNoteLoading, error: deleteNoteError }] =
    useDeleteNoteMutation();

  if (isLoading) {
    return;
  }

  if (error) console.log(error);

  async function addNoteToLecture() {
    const res = await addNote({
      courseId,
      lectureId: lectures[currentLecture]._id,
      note: textNote,
    });
    if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      setTextNote("");
    }
  }

  async function deleteNoteToLecture(i) {
    const res = await deleteNote({
      courseId,
      lectureId: lectures[currentLecture]._id,
      noteIndex: i,
    });
    if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }
  }

  const lectureIds = [];
  data?.courseProgress?.lectureProgress?.map((l) => {
    lectureIds.push(l.lectureId);
  });

  return (
    <div className="relative h-[165px]">
      <div className="h-[60%] overflow-auto">
        {!lectureIds.includes(lectures[currentLecture]._id) && (
          <span className="text-md opacity-60">{t("Add some notes")}...</span>
        )}
        {data?.courseProgress?.lectureProgress?.map((l) => {
          if (lectures[currentLecture]._id === l.lectureId) {
            if (l?.notes && l?.notes?.length !== 0) {
              return l?.notes?.map((note, i) => {
                return (
                  <ul
                    className="relative w-[90%] sm:w-[92%] text-md list-disc list-inside"
                    key={i}
                  >
                    <li className="mb-1">
                      <span className="text-sm opacity-7">
                        {note}
                        <MdDelete
                          className={`absolute top-0 -right-5 text-error text-md cursor-pointer ${
                            deleteNoteLoading && "btn-disabled"
                          }`}
                          onClick={() => deleteNoteToLecture(i)}
                        />
                      </span>
                    </li>
                  </ul>
                );
              });
            } else {
              return (
                <span className="text-md opacity-60" key={l.lectureId}>
                  {t("Add some notes")}...
                </span>
              );
            }
          }
        })}
      </div>
      <div className="absolute bottom-0 left-0 w-full hidden sm:flex justify-center mt-auto gap-4">
        <textarea
          placeholder={`${t("write note")}`}
          value={textNote}
          onChange={(e) => setTextNote(e.target.value)}
          className="textarea textarea-info bg-white textarea-xs w-full max-w-xs resize-none text-[13px] tracking-wider"
        ></textarea>
        <button
          className={`mt-auto btn btn-sm btn-primary ${
            addNoteLoading && "btn-disabled"
          }`}
          onClick={() => addNoteToLecture()}
          disabled={textNote.length === 0}
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
}

export default LectureNotes;
