
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodaysActivity } from "@/hooks/useTodaysActivity";
import { Badge } from "@/components/ui/badge";

const TodaysActivity = () => {
  const { activities, isLoading } = useTodaysActivity();

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "due":
        return "destructive";
      case "reservation":
        return "secondary";
      case "fine":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          Today's Activity
          <Badge>{activities.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">Loading activities...</div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {activities.map((activity) => (
              <li 
                key={activity.id}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{activity.description}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <Badge variant={getBadgeVariant(activity.type)}>
                    {activity.type}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysActivity;
