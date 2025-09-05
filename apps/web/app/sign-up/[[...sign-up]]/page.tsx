import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 flex justify-center">
      <SignUp />
    </div>
  );
}
