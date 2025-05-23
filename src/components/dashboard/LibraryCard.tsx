import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface LibraryCardProps {
  card: {
    id: number;
    issuedDate: string;
    expiryDate: string;
    status: string;
    fullName: string;
    membershipId: string;
  };
}

const LibraryCard = ({ card }: LibraryCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Library Card</h2>
              <p className="text-sm text-blue-200">Membership ID: {card.membershipId}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs ${
                card.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {card.status}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">{card.fullName}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-blue-200">Issued Date</p>
              <p className="font-medium">{format(new Date(card.issuedDate), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-blue-200">Expiry Date</p>
              <p className="font-medium">{format(new Date(card.expiryDate), 'MMM dd, yyyy')}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-400">
            <p className="text-xs text-blue-200">
              This card is the property of the Library and must be presented when borrowing materials.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LibraryCard; 