
import AdminTable from "@/components/AdminTable/AdminTable";

export default function AdminTablePage() {
  return (
    
      <div className="p-8 min-h-screen bg-background text-foreground">
        <h1 className="text-3xl font-bold text-center text-base-color">
          Admin Table
        </h1>
        <div className="mx-auto mt-10 max-w-7xl 4k:max-w-[1800px]">
          <AdminTable />
        </div>
      </div>
    
  );
}
