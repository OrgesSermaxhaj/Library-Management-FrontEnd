import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Service {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  lastChecked: string;
}

const ServiceStatus = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data
        const mockServices: Service[] = [
          {
            name: 'Database',
            status: 'operational',
            lastChecked: new Date().toISOString()
          },
          {
            name: 'Authentication',
            status: 'operational',
            lastChecked: new Date().toISOString()
          },
          {
            name: 'File Storage',
            status: 'degraded',
            lastChecked: new Date().toISOString()
          },
          {
            name: 'Email Service',
            status: 'down',
            lastChecked: new Date().toISOString()
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setServices(mockServices);
      } catch (err) {
        setError('Failed to fetch service status');
        console.error('Error fetching service status:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceStatus();
  }, []);

  const getStatusIcon = (status: Service['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(service.status)}
                <span className="text-sm font-medium">{service.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {format(new Date(service.lastChecked), 'h:mm a')}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatus;
