import clsx from "clsx"

const Radio = ({ checked }: { checked: boolean }) => {
  return (
    <div
      className={clsx(
        "h-3 w-3 rounded-full border border-slate-6 bg-cyan-2 flex items-center justify-center",
        {
          "border-slate-11": checked,
        }
      )}
    >
      {checked && <div className="w-2 h-2 rounded-full dark:bg-cyan-10 bg-cyan-12" />}
    </div>
  )
}

export default Radio
