
import UserTable from "@/components/UserTable/UserTable";

export default function UserTablePage() {
  return (
    
      <div className="p-8 min-h-screen bg-background text-foreground">
        <h1 className="text-3xl font-bold text-center text-base-color">
          User Table
        </h1>
        <div className="mx-auto mt-10 max-w-7xl 4k:max-w-[1800px]">
          <UserTable />
        </div>
      </div>
    
  );
}
