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

interface SignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  tenantId: string;
  address: string;
  phoneNumber: string;
}

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  tenantId: Yup.string().required('Tenant ID is required'),
  address: Yup.string().required('Address is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setToken, setUser, setTenantId } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-library-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Sign up to get started with your library account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              tenantId: '',
              address: '',
              phoneNumber: '',
            }}
            validationSchema={signupSchema}
            onSubmit={async (values: SignupValues, { setSubmitting }) => {
              try {
                if (!values.tenantId) {
                  toast.error('Tenant ID is required');
                  return;
                }

                // Store tenant ID in localStorage before making the request
                localStorage.setItem('tenantId', values.tenantId);

                console.log('Attempting registration with:', {
                  fullName: values.name,
                  email: values.email,
                  tenantId: values.tenantId,
                  address: values.address,
                  phoneNumber: values.phoneNumber,
                });

                const res = await api.post('/auth/register', 
                  {
                    fullName: values.name,
                    email: values.email,
                    password: values.password,
                    address: values.address,
                    phoneNumber: values.phoneNumber
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Tenant-ID': values.tenantId
                    }
                  }
                );
                
                console.log('Registration response:', res.data);
                
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
                localStorage.setItem('tenantId', values.tenantId);
                localStorage.setItem('user', JSON.stringify({
                  id: res.data.userId,
                  name: res.data.fullName || '',
                  email: res.data.email,
                  role: res.data.role,
                  tenantId: values.tenantId
                }));
                
                toast.success('Registration successful! Please log in.');
                
                // Navigate to login page instead of dashboard
                navigate('/login');
              } catch (err: any) {
                console.error('Registration error:', err);
                console.error('Error response:', err.response?.data);
                console.error('Error headers:', err.response?.headers);
                console.error('Error status:', err.response?.status);
                
                // Clear tenant ID if registration fails
                localStorage.removeItem('tenantId');
                
                const errorMessage = err.response?.data?.message 
                  || err.response?.data?.error 
                  || err.message 
                  || 'Registration failed';
                
                toast.error(errorMessage);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                  />
                  {errors.name && touched.name && (
                    <div className="text-sm text-red-500">{errors.name}</div>
                  )}
                </div>

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
                  <Label htmlFor="address">Address</Label>
                  <Field
                    as={Input}
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                  />
                  {errors.address && touched.address && (
                    <div className="text-sm text-red-500">{errors.address}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Field
                    as={Input}
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-sm text-red-500">{errors.phoneNumber}</div>
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-sm text-red-500">{errors.confirmPassword}</div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-library-primary hover:underline"
            >
              Log in
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
