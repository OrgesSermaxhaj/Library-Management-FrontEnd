
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverdueBook {
  id: string;
  member: string;
  title: string;
  author: string;
  days: number;
  returnDate: string;
}

const overdueBooks: OverdueBook[] = [
  {
    id: "89824231",
    member: "Danielle Russell",
    title: "The Midnight Line",
    author: "Lee Child",
    days: 2,
    returnDate: "Jun 14, 2022",
  },
  {
    id: "89824232",
    member: "Eleanor Amarlis",
    title: "Henry V",
    author: "William Shakespeare",
    days: 2,
    returnDate: "Jun 10, 2022",
  },
  {
    id: "89824233",
    member: "Eleanor Amarlis",
    title: "Ender's Game",
    author: "Orson Scott Card",
    days: 2,
    returnDate: "Jun 10, 2022",
  },
  {
    id: "89824234",
    member: "Fuchsia Miller",
    title: "Modern Art in America",
    author: "William C. Agee",
    days: 5,
    returnDate: "Jun 11, 2022",
  },
];

export const OverdueTable = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Overdue Book Loans</CardTitle>
        <Button variant="link" size="sm" className="text-primary">See all</Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Overdue</TableHead>
                <TableHead>Return date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdueBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell>{book.member}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.days} days</TableCell>
                  <TableCell>{book.returnDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
