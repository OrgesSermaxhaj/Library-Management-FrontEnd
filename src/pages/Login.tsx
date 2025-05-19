import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";

interface LoginValues {
  email: string;
  password: string;
  tenantId: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  tenantId: Yup.string().required('Tenant ID is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUser, setTenantId } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-library-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your library account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              email: '',
              password: '',
              tenantId: '',
            }}
            validationSchema={loginSchema}
            onSubmit={async (values: LoginValues, { setSubmitting }) => {
              try {
                if (!values.tenantId) {
                  toast.error('Tenant ID is required');
                  return;
                }

                // Store tenant ID in localStorage before making the request
                localStorage.setItem('tenantId', values.tenantId);

                console.log('Attempting login with:', {
                  email: values.email,
                  tenantId: values.tenantId,
                });

                const res = await api.post('/auth/login', {
                  email: values.email,
                  password: values.password,
                });
                
                console.log('Login response:', res.data);
                
                // Store auth data
                setToken(res.data.token);
                setTenantId(values.tenantId);
                setUser({
                  id: res.data.userId,
                  name: res.data.fullName,
                  email: res.data.email,
                  role: res.data.role,
                  tenantId: values.tenantId
                });
                
                // Store in localStorage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify({
                  id: res.data.userId,
                  name: res.data.fullName,
                  email: res.data.email,
                  role: res.data.role,
                  tenantId: values.tenantId
                }));
                
                toast.success('Login successful');
                
                // Redirect based on role
                switch (res.data.role) {
                  case 'ADMIN':
                    navigate('/admin/dashboard');
                    break;
                  case 'LIBRARIAN':
                    navigate('/librarian/dashboard');
                    break;
                  case 'MEMBER':
                    navigate('/member/dashboard');
                    break;
                  default:
                    navigate('/dashboard');
                }
              } catch (err: any) {
                console.error('Login error:', err);
                console.error('Error response:', err.response?.data);
                console.error('Error headers:', err.response?.headers);
                console.error('Error status:', err.response?.status);
                
                // Clear tenant ID if login fails
                localStorage.removeItem('tenantId');
                
                const errorMessage = err.response?.data?.message 
                  || err.response?.data?.error 
                  || err.message 
                  || 'Login failed';
                
                toast.error(errorMessage);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tenantId">Tenant ID</Label>
                  <Field
                    as={Input}
                    id="tenantId"
                    name="tenantId"
                    placeholder="Enter your tenant ID"
                  />
                  {errors.tenantId && touched.tenantId && (
                    <div className="text-sm text-red-500">{errors.tenantId}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-sm text-red-500">{errors.password}</div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-library-primary hover:underline"
            >
              Sign up
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login; 