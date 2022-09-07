import Logo from "./Assets/Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="relative px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-grey-600 lg:justify-start font-bold text-lg">
              <Logo />
            </div>

            <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-500 lg:text-left">
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
            </p>
          </div>
        </div>

        <p className="mt-12 text-sm text-center text-gray-500 lg:text-left">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
