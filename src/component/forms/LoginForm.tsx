import { useState, useEffect } from "react";
import { SendApiRequest } from "./SendApiRequest";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { LoginFormData, LoginResponse } from "../../types";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [school_accronym, setSchool_accronym] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Load saved school_accronym
  useEffect(() => {
    const savedSchool = localStorage.getItem("school_accronym");
    if (savedSchool) {
      setSchool_accronym(savedSchool);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response: LoginResponse = await SendApiRequest<LoginResponse>(
        `http://${school_accronym}.localhost:8000/api-tenant/token/`,
        "POST",
        {
          username: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("school_accronym", school_accronym);
      localStorage.setItem("token", response.access);
      localStorage.setItem("refreshToken", response.refresh);

      setSuccessMessage("✅ Login successful! Redirecting...");
      setErrorMessage(""); // clear any previous error

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      setErrorMessage("❌ Login failed. Please check your credentials.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>
        {successMessage && (
        <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
          {errorMessage}
        </div>
      )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Only show input if no saved school_accronym */}
          <label className="text-sm font-medium text-gray-700">
                
              </label>
          {!localStorage.getItem("school_accronym") && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                School Acronym
              </label>
              <input
                type="text"
                name="school_accronym"
                value={school_accronym}
                onChange={(e) => setSchool_accronym(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white"
                placeholder="Enter school acronym"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white"
                placeholder="Enter your password"
                required
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
