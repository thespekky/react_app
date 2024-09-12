export default function Footer() {
  return (
    <>
      <footer className="relative w-full bg-backgroundcolor py-4 text-gray-600">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-sm">
            Készítette Bodnár András © {new Date().getFullYear()}
          </h2>
        </div>
      </footer>
    </>
  );
}
