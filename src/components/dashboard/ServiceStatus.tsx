
import { Badge } from "@/components/ui/badge";
import { useServiceStatus } from "@/hooks/useServiceStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceStatus = () => {
  const { services, isLoading } = useServiceStatus();

  if (isLoading) {
    return (
      <Card className="h-[360px]">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Service Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="flex flex-col gap-4 animate-pulse px-6 pb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[360px]">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Service Status</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-0 pb-4">
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="flex justify-between items-center">
              <p className="text-sm text-gray-700 dark:text-gray-300">{service.name}</p>
              <Badge
                variant={service.status === "Up" ? "default" : "destructive"}
                className={service.status === "Up" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}
              >
                {service.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatus;
