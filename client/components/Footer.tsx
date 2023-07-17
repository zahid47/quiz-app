export default function Footer() {
  return (
    <footer className="fixed bg-white bottom-0 w-screen flex flex-col gap-2 text-slate-600 items-center justify-center p-4">
      <div>
        Developed by{" "}
        <a href="https://github.com/zahid47" target="_blank" rel="noreferrer">
          Zahid47
        </a>{" "}
        in 2022 &#x2022;{" "}
        <span>
          <a
            href="https://iconscout.com/icons/quiz"
            target="_blank"
            rel="noreferrer"
          >
            Quiz Icon
          </a>{" "}
          by{" "}
          <a href="https://iconscout.com/contributors/yogswpy">
            Widyatmoko P.Y
          </a>{" "}
          on <a href="https://iconscout.com">IconScout</a>
        </span>
      </div>
    </footer>
  );
}
