import React, { useState, useEffect } from "react";
import { User, BookOpen, Trash2, Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../manager/UseFetch";
import { SendApiRequest } from "../component/forms/SendApiRequest";
import { ClassLevel } from "../types";

interface Student {
  id: number;
  admission_number: string;
  user: {
    username: string;
    email: string;
  };
  parent_name: string;
  class_level: number | null;
  academic_year: string;
  profile_picture?: string;
}

interface StudentsResponse {
  results: Student[];
  count?: number;
}

export default function ManageStudents() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [classes, setClasses] = useState<ClassLevel[]>([]);
  const { data: students, loading, error } = useFetch<StudentsResponse>(`admin/get-all-students?refresh=${refresh}`);

  // Fetch classes for display
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await SendApiRequest<{ results: ClassLevel[] }>('admin/get-all-classes', 'GET');
        setClasses(response.results || []);
      } catch (err) {
        console.error('Failed to fetch classes:', err);
      }
    };

    fetchClasses();
  }, []);

  const getClassNameById = (classId: number | null) => {
    if (!classId) return "Not assigned";
    const cls = classes.find(c => c.id === classId);
    return cls ? `${cls.name} - ${cls.academic_year}` : "Unknown class";
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await SendApiRequest(`/admin/delete-student/${id}/`, "DELETE");
      setRefresh(!refresh); // trigger refetch
    } catch (err: any) {
      alert("Failed to delete student: " + err.message);
    }
  };

  if (loading) return <p className="p-6">Loading students...</p>;
  if (error) return <p className="p-6 text-red-500">{error.message}</p>;

  return (
    <div>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Students</h1>
          <button
            onClick={() => navigate("/admin/students/register")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <Plus className="w-5 h-5" /> Register New Student
          </button>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Year
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students?.results?.map((student: Student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {student.profile_picture ? (
                          <img className="h-10 w-10 rounded-full" src={student.profile_picture} alt={student.user.username} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.user.username}</div>
                        <div className="text-sm text-gray-500">{student.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.admission_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.parent_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getClassNameById(student.class_level)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.academic_year}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => alert("TODO: Implement edit student functionality")}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {students?.results?.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by registering a new student.</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/admin/students/register")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Register Student
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}