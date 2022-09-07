export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="relative px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-grey-600 lg:justify-start font-bold text-lg">
              <h1>QuizifyLab</h1>
            </div>

            <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-500 lg:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
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
