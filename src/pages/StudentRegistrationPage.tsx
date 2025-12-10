import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SendApiRequest } from '../component/forms/SendApiRequest';
import { StudentRegistrationData, ClassLevel } from '../types';

const StudentRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<StudentRegistrationData>({
    admission_number: '',
    date_of_birth: '',
    parent_name: '',
    parent_contact: '',
    parent_email: '',
    address: '',
    class_level: null,
    academic_year: '',
  });
  
  const [classes, setClasses] = useState<ClassLevel[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch classes when component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await SendApiRequest<{ results: ClassLevel[] }>('admin/get-all-classes', 'GET');
        setClasses(response.results || []);
      } catch (err) {
        console.error('Failed to fetch classes:', err);
        setErrorMessage('Failed to load classes. Please try again.');
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });
      
      // Append profile picture if selected
      if (profilePicture) {
        formDataToSend.append('profile_picture', profilePicture);
      }

      // Send request to backend
      await SendApiRequest(
        '/api/students/register/',
        'POST',
        formDataToSend,
        {} // No extra headers needed as SendApiRequest handles auth
      );

      setSuccessMessage('Student registered successfully!');
      
      // Reset form
      setFormData({
        admission_number: '',
        date_of_birth: '',
        parent_name: '',
        parent_contact: '',
        parent_email: '',
        address: '',
        class_level: null,
        academic_year: '',
      });
      setProfilePicture(null);
      
      // Optionally redirect after success
      // navigate('/admin/students');
      
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to register student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Student Registration</h1>
        
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admission Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Admission Number *
              </label>
              <input
                type="text"
                name="admission_number"
                value={formData.admission_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
            {/* Parent Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Parent Name *
              </label>
              <input
                type="text"
                name="parent_name"
                value={formData.parent_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
            {/* Parent Contact */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Parent Contact *
              </label>
              <input
                type="text"
                name="parent_contact"
                value={formData.parent_contact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
            {/* Parent Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Parent Email *
              </label>
              <input
                type="email"
                name="parent_email"
                value={formData.parent_email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
            {/* Academic Year */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Academic Year *
              </label>
              <input
                type="text"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 2023/2024"
                required
              />
            </div>
            
            {/* Class Level */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Class Level *
              </label>
              {loadingClasses ? (
                <select
                  name="class_level"
                  value={formData.class_level || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100"
                  disabled
                  required
                >
                  <option>Loading classes...</option>
                </select>
              ) : (
                <select
                  name="class_level"
                  value={formData.class_level || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select a class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id.toString()}>
                      {cls.name} - {cls.academic_year}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            {/* Profile Picture */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            {/* Address */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/students')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || loadingClasses}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationPage;