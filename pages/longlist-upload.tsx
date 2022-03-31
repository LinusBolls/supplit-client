import { useForm } from "react-hook-form";
import CsvInput from "../components/CsvInput";

function Page() {
  const { register, handleSubmit } = useForm();

  const onSubmita = (d: any) => alert(JSON.stringify(d, null, 2));

  return (
    <form
      className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800 h-80 space-y-4"
      method="post"
      encType="multipart/form-data" // required to upload any file through a form
      onSubmit={handleSubmit(onSubmita)}
    >
      <h1 className="text-3xl font-bold underline text-white w-66">
        Hello world!
      </h1>
      <CsvInput {...register("file")} />
      <button
        type="submit"
        className="rounded-md bg-slate-900 text-white px-12 py-4 text-md"
      >
        Upload
      </button>
    </form>
  );
}
export default Page;
