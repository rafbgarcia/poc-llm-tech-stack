export default function Home() {
  return (
    <>
      <div className="w-[40rem] mx-auto mt-4 ">
        <p className="text-sm font-semibold">Tech stack</p>
        <div className="flex flex-col gap-2">
          <select className="select select-bordered select-xs w-72">
            <option>NextJS 15.1.2 app router</option>
            <option>NextJS 15.1.2 pages router</option>
            <option>NextJS 14.2.21 - app router</option>
            <option>NextJS 14.2.21 - pages router</option>
            <option>NextJS 13.5.8 - app router</option>
            <option>NextJS 13.5.8 - pages router</option>
          </select>

          <div className="flex items-center gap-2">
            <select className="select select-bordered select-xs w-72" disabled>
              <option>Tailwind CSS v4.0 Beta</option>
            </select>
            <span className="badge badge-neutral badge-sm">Coming soon</span>
          </div>

          <div className="flex items-center gap-2"></div>
        </div>
      </div>

      <div className="w-[40rem] mx-auto mt-10 flex items-end gap-2">
        <textarea
          className="textarea textarea-bordered w-full"
          rows={3}
          placeholder={`Implement a POST route handler. Parse the body with Zod.
body: { title?: string, content: string, publishDate: string (coerce date) }`}
          autoComplete="off"
        />
        <button className="btn btn-success">Ask</button>
      </div>
    </>
  );
}
