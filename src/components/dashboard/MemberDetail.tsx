
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  isOverdue: boolean;
  coverImage: string;
  daysOverdue?: number;
}

interface MemberDetailProps {
  member: {
    name: string;
    joinYear: number;
    avatar: string;
    books: Book[];
  };
}

const MemberDetail = ({ member }: MemberDetailProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{member.name}</h4>
            <p className="text-xs text-gray-500">Member since {member.joinYear}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button variant="outline" className="w-full h-10 gap-2">
            <MessageSquare size={16} />
            Send a Message
          </Button>
          <Button variant="outline" className="w-full h-10 gap-2">
            <Phone size={16} />
            Call {member.name.split(" ")[0]}
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold mb-2">Borrowed book <span className="bg-library-primary text-white rounded-full px-1.5 py-0.5 text-xs">{member.books.length}</span></h3>
        
        <div className="space-y-4">
          {member.books.map((book) => (
            <div key={book.id} className="border-b border-gray-100 pb-4 last:border-none last:pb-0">
              <div className="flex gap-3">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-16 h-24 object-cover rounded"
                />
                <div className="flex flex-col">
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-xs text-gray-500">{book.author}</p>
                  {book.isOverdue && (
                    <span className="text-xs text-library-danger mt-1">
                      + {book.daysOverdue} days overdue
                    </span>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Borrowed</span>
                      <span>{book.borrowDate}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Return</span>
                      <span>{book.returnDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 text-xs"
              >
                Return
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Book circulation history</h3>
          <Button variant="link" size="sm" className="text-library-primary text-xs">See all</Button>
        </div>
        
        <div className="space-y-3 mt-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b border-gray-100 pb-3 last:border-none last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h5 className="text-sm font-medium">Book Title {item}</h5>
                  <p className="text-xs text-gray-500">ID: 8756{item}234</p>
                </div>
                <div className="text-right">
                  <p className="text-xs">Apr {10 + item}, 2022</p>
                  <span className="text-xs text-green-500">Returned</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
