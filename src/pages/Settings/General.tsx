import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';

export default function Component() {
  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">General</h1>
        <Button className="ml-auto text-white">Save</Button>
      </header>
      <section className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-medium">Manage and share your account</h2>
        </div>
      </section>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="account-name">Account Name</Label>
          <Input
            id="account-name"
            placeholder="Enter your account name"
            className="px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="account-id">Account ID</Label>
          <Input
            id="account-id"
            placeholder="Your account ID"
            className="px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Delete your account</h2>
          <Button variant="destructive" className="bg-red-500  text-white">
            Delete
          </Button>
        </div>
      </div>
    </main>
  );
}
