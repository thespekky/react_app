/* eslint-disable react/prop-types */
export default function CostumeSearch({ onsubmit = () => {} }) {
  return (
    <>
      <form onSubmit={senddata} className="flex justify-center">
        <input
          type="text"
          className="w-[80%] flex content-center border-2 border-slate-500 rounded-md p-1"
          name="userfilter"
          id=""
        />
        <button type="submit" className="pl-1">
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
