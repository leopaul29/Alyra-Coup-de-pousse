"use client";
import Project from "@/components/project/Project";

export default function Page({ params }) {
	return <Project projectIndex={params.id} />;
}
