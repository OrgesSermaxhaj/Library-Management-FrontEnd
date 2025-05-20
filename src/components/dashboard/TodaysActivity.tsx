import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, AlertCircle, User } from "lucide-react";
import { format } from "date-fns";

interface Activity {
  id: number;
  type: 'LOAN' | 'RETURN' | 'RESERVATION' | 'FINE';
  description: string;
  timestamp: string;
  memberName: string;
}

const TodaysActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data
        const mockActivities: Activity[] = [
          {
            id: 1,
            type: 'LOAN',
            description: 'Book borrowed',
            timestamp: new Date().toISOString(),
            memberName: 'John Doe'
          },
          {
            id: 2,
            type: 'RETURN',
            description: 'Book returned',
            timestamp: new Date().toISOString(),
            memberName: 'Jane Smith'
          },
          {
            id: 3,
            type: 'RESERVATION',
            description: 'Book reserved',
            timestamp: new Date().toISOString(),
            memberName: 'Mike Johnson'
          },
          {
            id: 4,
            type: 'FINE',
            description: 'Late return fine',
            timestamp: new Date().toISOString(),
            memberName: 'Sarah Wilson'
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setActivities(mockActivities);
      } catch (err) {
        setError('Failed to fetch today\'s activities');
        console.error('Error fetching today\'s activities:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'LOAN':
        return <Book className="h-4 w-4" />;
      case 'RETURN':
        return <Clock className="h-4 w-4" />;
      case 'RESERVATION':
        return <User className="h-4 w-4" />;
      case 'FINE':
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Activity</CardTitle>
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
          <CardTitle>Today's Activity</CardTitle>
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
        <CardTitle>Today's Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-gray-500 text-center">No activities today</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {activity.memberName} • {format(new Date(activity.timestamp), 'h:mm a')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysActivity;
