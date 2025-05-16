
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  borrowedBooks: number;
  overdueBooks: number;
  memberSince: string;
  status: "Active" | "Inactive" | "Suspended";
}

const membersData: Member[] = [
  {
    id: "MEM-5623",
    name: "Eleanor Amarlis",
    email: "eleanor@example.com",
    phone: "+1 234-567-8901",
    borrowedBooks: 2,
    overdueBooks: 2,
    memberSince: "Jun 15, 2020",
    status: "Active",
  },
  {
    id: "MEM-2134",
    name: "Danielle Russell",
    email: "danielle@example.com",
    phone: "+1 234-567-8902",
    borrowedBooks: 1,
    overdueBooks: 1,
    memberSince: "Aug 23, 2020",
    status: "Active",
  },
  {
    id: "MEM-7845",
    name: "Fuchsia Miller",
    email: "fuchsia@example.com",
    phone: "+1 234-567-8903",
    borrowedBooks: 3,
    overdueBooks: 1,
    memberSince: "Mar 12, 2021",
    status: "Active",
  },
  {
    id: "MEM-9087",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1 234-567-8904",
    borrowedBooks: 0,
    overdueBooks: 0,
    memberSince: "Jan 5, 2022",
    status: "Inactive",
  },
  {
    id: "MEM-3456",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 234-567-8905",
    borrowedBooks: 5,
    overdueBooks: 0,
    memberSince: "Feb 18, 2022",
    status: "Active",
  },
  {
    id: "MEM-6789",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 234-567-8906",
    borrowedBooks: 1,
    overdueBooks: 0,
    memberSince: "Mar 27, 2022",
    status: "Active",
  },
  {
    id: "MEM-1234",
    name: "Jessica Davis",
    email: "jessica@example.com",
    phone: "+1 234-567-8907",
    borrowedBooks: 2,
    overdueBooks: 0,
    memberSince: "Apr 14, 2022",
    status: "Active",
  },
];

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMembers = membersData.filter((member) => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: Member["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      case "Suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-library-background">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <Header />
        
        <div className="mb-6 flex justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search members..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-library-primary hover:bg-library-secondary gap-2">
            <Plus size={16} />
            Add Member
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Member ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Borrowed
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Overdue
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Member Since</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{member.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>{member.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{member.email}</span>
                        <span className="text-xs text-gray-500">{member.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.borrowedBooks}</TableCell>
                    <TableCell>
                      {member.overdueBooks > 0 ? (
                        <span className="text-library-danger font-medium">{member.overdueBooks}</span>
                      ) : (
                        member.overdueBooks
                      )}
                    </TableCell>
                    <TableCell>{member.memberSince}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No members found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Members;
