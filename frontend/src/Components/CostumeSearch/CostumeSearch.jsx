export default function CostumeSearch({ onsubmit = () => {} }) {
  return (
    <>
      <form onSubmit={senddata} className="flex justify-center pb-2 pt-2">
        <input
          type="text"
          placeholder="Keresés"
          className="flex w-[80%] content-center rounded-2xl border-2 border-slate-500 p-1"
          name="userfilter"
          id=""
        />
        <button
          type="submit"
          className="ml-2 rounded-full border-2 bg-green-700 p-2 font-semibold tracking-wider text-white hover:bg-green-600"
        >
          Search
        </button>
      </form>
    </>
  );
  function senddata(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    onsubmit(formData.get("userfilter"));
  }
}
