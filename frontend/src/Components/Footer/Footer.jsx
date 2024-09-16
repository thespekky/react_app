export default function Footer() {
  return (
    <>
      <footer className="relative w-full bg-backgroundcolor py-4 text-coloroftext">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-sm">
            Készítette <b>Bodnár András</b> © {new Date().getFullYear()}
          </h2>
        </div>
      </footer>
    </>
  );
}
