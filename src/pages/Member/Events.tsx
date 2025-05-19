
import MemberLayout from "@/components/layout/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPin, Users, CalendarDays, Newspaper } from "lucide-react";

const upcomingEvents = [
  {
    id: "1",
    title: "Author Meet & Greet: Sarah J. Maas",
    date: "2023-06-15",
    time: "6:00 PM - 8:00 PM",
    location: "Main Library, Conference Room A",
    maxAttendees: 75,
    currentAttendees: 62,
    description: "Join us for an evening with bestselling author Sarah J. Maas as she discusses her latest book and answers questions from fans.",
    category: "author",
  },
  {
    id: "2",
    title: "Children's Story Hour",
    date: "2023-06-10",
    time: "10:00 AM - 11:00 AM",
    location: "Children's Reading Room",
    maxAttendees: 30,
    currentAttendees: 18,
    description: "A special reading session for children ages 4-8, featuring stories about adventure and discovery.",
    category: "children",
  },
  {
    id: "3",
    title: "Book Club: 'The Midnight Library'",
    date: "2023-06-20",
    time: "7:00 PM - 8:30 PM",
    location: "Study Room 3",
    maxAttendees: 20,
    currentAttendees: 14,
    description: "This month's book club will discuss Matt Haig's 'The Midnight Library'. New members welcome!",
    category: "book-club",
  },
];

const latestNews = [
  {
    id: "101",
    title: "Extended Summer Hours Starting June 1st",
    date: "2023-05-15",
    summary: "The library will be extending its hours during the summer months. Starting June 1st, we will be open until 8 PM on weekdays and 6 PM on weekends.",
    category: "announcement",
  },
  {
    id: "102",
    title: "New Digital Resources Available",
    date: "2023-05-10",
    summary: "We're excited to announce the addition of three new digital resource collections, including expanded access to academic journals and a new language learning platform.",
    category: "resources",
  },
  {
    id: "103",
    title: "Library Renovation Updates",
    date: "2023-05-05",
    summary: "The second floor renovation is now complete! The new study spaces and technology lab will be available for use starting next week.",
    category: "facility",
  },
];

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "author":
      return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Author Event</Badge>;
    case "children":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Children</Badge>;
    case "book-club":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Book Club</Badge>;
    case "announcement":
      return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Announcement</Badge>;
    case "resources":
      return <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">Resources</Badge>;
    case "facility":
      return <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">Facility</Badge>;
    default:
      return <Badge>{category}</Badge>;
  }
};

const Events = () => {
  return (
    <MemberLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Events & News</h1>
        
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Library News
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <div className="mt-2 flex items-center gap-2">
                        {getCategoryBadge(event.category)}
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.currentAttendees}/{event.maxAttendees}
                        </Badge>
                      </div>
                    </div>
                    <Button className="sm:self-start">Register</Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-8">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="news" className="space-y-6">
            {latestNews.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {getCategoryBadge(item.category)}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {item.date}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default Events;
