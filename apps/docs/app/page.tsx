import { redirect } from "next/navigation";

export default function HomePage() {
	// Redirect to the docs core page when accessing the root
	redirect("/docs/core");
}
