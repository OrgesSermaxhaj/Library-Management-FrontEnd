import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useUsers } from "@/hooks/useUsers";
import { User, UserRole } from "@/types/user";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const UserManagement = () => {
  const { users, isLoading, createUser, deleteUser, updateUser } = useUsers();
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [newUser, setNewUser] = useState<Partial<User>>({
    fullName: "",
    email: "",
    password: "",
    role: UserRole.MEMBER,
    address: "",
    phoneNumber: "",
  });

  // Check if current user has admin privileges
  const isAdmin = currentUser?.role === "ADMIN";
  const isLibrarian = currentUser?.role === "LIBRARIAN";

  // Update formData when editingUser changes
  useEffect(() => {
    if (editingUser) {
      const initialFormData = {
        id: editingUser.id,
        fullName: editingUser.fullName,
        email: editingUser.email,
        role: editingUser.role,
        address: editingUser.address,
        phoneNumber: editingUser.phoneNumber,
        version: editingUser.version,
        // Include role-specific fields based on current role
        ...(editingUser.role === "ADMIN" && { adminCode: editingUser.adminCode }),
        ...(editingUser.role === "LIBRARIAN" && {
          department: editingUser.department,
          employeeNumber: editingUser.employeeNumber
        })
      };
      console.log("Setting initial form data:", initialFormData);
      setFormData(initialFormData);
    }
  }, [editingUser]);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateUser = () => {
    createUser(newUser as Omit<User, "id">);
    setIsAddDialogOpen(false);
    setNewUser({
      fullName: "",
      email: "",
      password: "",
      role: UserRole.MEMBER,
      address: "",
      phoneNumber: "",
    });
  };

  const handleEditUser = () => {
    if (!formData.id) return;

    // Only allow admins to change roles
    if (!isAdmin && formData.role !== editingUser?.role) {
      toast.error("Only administrators can change user roles");
      return;
    }

    // Get the current user data to ensure we have all fields
    const currentUserData = users.find(u => u.id === formData.id);
    if (!currentUserData) {
      toast.error("User not found");
      return;
    }

    // Create the update payload with only changed fields
    const updatePayload: Partial<User> & { id: number } = {
      id: formData.id
    };

    // Only include fields that have changed
    if (formData.fullName !== currentUserData.fullName) {
      updatePayload.fullName = formData.fullName;
    }
    if (formData.email !== currentUserData.email) {
      updatePayload.email = formData.email;
    }
    if (formData.address !== currentUserData.address) {
      updatePayload.address = formData.address;
    }
    if (formData.phoneNumber !== currentUserData.phoneNumber) {
      updatePayload.phoneNumber = formData.phoneNumber;
    }

    // Handle role changes and role-specific fields
    if (formData.role !== currentUserData.role) {
      updatePayload.role = formData.role;
      
      // When changing to admin, ensure adminCode is set
      if (formData.role === "ADMIN") {
        updatePayload.adminCode = formData.adminCode;
      }
    }

    // Add role-specific fields based on the current role
    if (formData.role === "ADMIN") {
      if (formData.adminCode !== currentUserData.adminCode) {
        updatePayload.adminCode = formData.adminCode;
      }
    } else if (formData.role === "LIBRARIAN") {
      if (formData.department !== currentUserData.department) {
        updatePayload.department = formData.department;
      }
      if (formData.employeeNumber !== currentUserData.employeeNumber) {
        updatePayload.employeeNumber = formData.employeeNumber;
      }
    }

    // Log the update payload for debugging
    console.log("Update payload:", updatePayload);

    // Send the update
    updateUser(updatePayload);
    setIsEditDialogOpen(false);
    setEditingUser(null);
    setFormData({});
  };

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    if (!isAdmin) {
      toast.error("Only administrators can change user roles");
      return;
    }

    const user = users.find(u => u.id === userId);
    if (user) {
      const updatedUser: Partial<User> & { id: number } = {
        id: userId,
        role: newRole,
        fullName: user.fullName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        version: user.version
      };

      if (newRole === UserRole.ADMIN) {
        updatedUser.adminCode = user.adminCode || "";
      } else if (newRole === UserRole.LIBRARIAN) {
        updatedUser.department = user.department || "";
        updatedUser.employeeNumber = user.employeeNumber || "";
      }

      updateUser(updatedUser);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            User Management
          </h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new user account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={newUser.fullName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newUser.address}
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={newUser.phoneNumber}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, role: value as UserRole })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.MEMBER}>Member</SelectItem>
                      <SelectItem value={UserRole.LIBRARIAN}>Librarian</SelectItem>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newUser.role === UserRole.ADMIN && (
                  <div className="space-y-2">
                    <Label htmlFor="adminCode">Admin Code</Label>
                    <Input
                      id="adminCode"
                      value={newUser.adminCode}
                      onChange={(e) =>
                        setNewUser({ ...newUser, adminCode: e.target.value })
                      }
                    />
                  </div>
                )}
                {newUser.role === UserRole.LIBRARIAN && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={newUser.department}
                        onChange={(e) =>
                          setNewUser({ ...newUser, department: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeNumber">Employee Number</Label>
                      <Input
                        id="employeeNumber"
                        value={newUser.employeeNumber}
                        onChange={(e) =>
                          setNewUser({ ...newUser, employeeNumber: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}
                <Button onClick={handleCreateUser} className="w-full">
                  Create User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {(isAdmin || isLibrarian) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingUser(user);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update the user's information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-fullName">Full Name</Label>
                <Input
                  id="edit-fullName"
                  value={formData.fullName || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, fullName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, address: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phoneNumber">Phone Number</Label>
                <Input
                  id="edit-phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))
                  }
                />
              </div>
              {isAdmin && (
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, role: value as UserRole }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.MEMBER}>Member</SelectItem>
                      <SelectItem value={UserRole.LIBRARIAN}>Librarian</SelectItem>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {formData.role === UserRole.ADMIN && (
                <div className="space-y-2">
                  <Label htmlFor="edit-adminCode">Admin Code</Label>
                  <Input
                    id="edit-adminCode"
                    value={formData.adminCode || ""}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, adminCode: e.target.value }))
                    }
                  />
                </div>
              )}
              {formData.role === UserRole.LIBRARIAN && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Input
                      id="edit-department"
                      value={formData.department || ""}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, department: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-employeeNumber">Employee Number</Label>
                    <Input
                      id="edit-employeeNumber"
                      value={formData.employeeNumber || ""}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, employeeNumber: e.target.value }))
                      }
                    />
                  </div>
                </>
              )}
              <Button onClick={handleEditUser} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default UserManagement; 