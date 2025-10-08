import HighlightText from "@/app/components/HighlightText";

// tiny renderer for "Rich text (Blocks)" paragraphs and lists
export function Blocks({ nodes }: { nodes: any[] }) {
  return (
    <div className="prose max-w-none">
      {nodes.map((n: any, i: number) => {
        if (n.type === "paragraph") {
          return (
            <p key={i}>
              {(n.children ?? []).map((c: any) => c.text ?? "").join("")}
            </p>
          );
        } else if (n.type === "list") {
          const ListTag: any = n.format === "ordered" ? "ol" : "ul";
          return (
            <ListTag key={i} className="list-disc list-inside space-y-1">
              {(n.children ?? []).map((item: any, itemIndex: number) => (
                <li key={itemIndex}>
                  {(item.children ?? []).map((c: any) => c.text ?? "").join("")}
                </li>
              ))}
            </ListTag>
          );
        } else {
          return (
            <pre key={i} className="text-xs bg-gray-50 p-2 rounded">
              {JSON.stringify(n, null, 2)}
            </pre>
          );
        }
      })}
    </div>
  );
}
