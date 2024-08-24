import { useParams } from "react-router-dom";

export default function Kosaras() {
  const id = useParams().id;
  console.log(id);
  return <div>id:{id}</div>;
}
