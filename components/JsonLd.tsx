// Renders a JSON-LD structured-data block. Data is authored by us (catalog
// JSON), not user input, so serializing into a script tag is safe here.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
