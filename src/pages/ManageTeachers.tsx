import { useState } from "react";
import { User, BookOpen, Trash2, Edit, Plus } from "lucide-react";
import useFetch from "../manager/UseFetch";
import { SendApiRequest } from "../component/forms/SendApiRequest";
import { TeachersResponse, Teacher } from "../types";

export default function ManageTeachers() {
  const { data: teachers, loading, error } = useFetch<TeachersResponse>("admin/get-all-teachers");
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await SendApiRequest(`/admin/delete-teacher/${id}/`, "DELETE");
      setRefresh(!refresh); // trigger refetch
    } catch (err: any) {
      alert("Failed to delete teacher: " + err.message);
    }
  };

  const handleAssign = async (id: number) => {
    const subject = prompt("Enter subject to assign:");
    if (!subject) return;
    try {
      await SendApiRequest(`/admin/assign-subject/${id}/`, "POST", { subject });
      setRefresh(!refresh);
    } catch (err: any) {
      alert("Failed to assign subject: " + err.message);
    }
  };

  if (loading) return <p className="p-6">Loading teachers...</p>;
  if (error) return <p className="p-6 text-red-500">{error.message}</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Teachers</h1>
        <button
          onClick={() => alert("TODO: Open Create Teacher Form")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus className="w-5 h-5" /> New Teacher
        </button>
      </div>

      {/* Teacher Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers?.results?.map((teacher: Teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200"
          >
            {/* Card Header */}
            <div className="p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                {teacher.photo ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.full_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <h2 className="text-lg font-semibold">{teacher.full_name}</h2>
              <p className="text-sm text-gray-500">{teacher.email}</p>
              <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {teacher.subject || "No subject"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-around border-t border-gray-100 p-3 text-sm">
              <button
                onClick={() => handleAssign(teacher.id)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <BookOpen className="w-4 h-4" /> Assign
              </button>
              <button
                onClick={() => alert("TODO: Edit form for " + teacher.full_name)}
                className="flex items-center gap-1 text-green-600 hover:text-green-800"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleDelete(teacher.id)}
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
