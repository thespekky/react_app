export default function CostumeSearch({ onsubmit = () => {} }) {
  return (
    <>
      <form onSubmit={senddata} className="flex justify-center pt-2 pb-2">
        <input
          type="text"
          placeholder="Keresés"
          className="w-[80%] flex content-center border-2 border-slate-500 rounded-2xl p-1"
          name="userfilter"
          id=""
        />
        <button
          type="submit"
          className="ml-2 p-2 font-semibold tracking-wider border-2 bg-green-700 rounded-full hover:bg-green-600 text-white"
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
