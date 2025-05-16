
import { Badge } from "@/components/ui/badge";
import { useServiceStatus } from "@/hooks/useServiceStatus";

const ServiceStatus = () => {
  const { services, isLoading } = useServiceStatus();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Service Status</h3>
        <div className="flex flex-col gap-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Service Status</h3>
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="flex justify-between items-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">{service.name}</p>
            <Badge
              variant={service.status === "Up" ? "success" : "destructive"}
              className={service.status === "Up" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}
            >
              {service.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceStatus;
