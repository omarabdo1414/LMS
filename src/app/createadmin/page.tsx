
import CreateAdminForm from "@/components/CreateAdminForm/CreateAdminForm";

export default function CreateAdminPage() {
  return (
   
      <div className="p-8 min-h-screen bg-background text-foreground">
        <h1 className="text-3xl font-bold text-center text-base-color">
          Create Admin
        </h1>
        <div className="mx-auto mt-10 max-w-3xl xl:max-w-5xl 4k:max-w-7xl">
          <CreateAdminForm />
        </div>
      </div>
  
  );
}
