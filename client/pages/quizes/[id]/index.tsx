import NavBar from "../../../components/NavBar";

export default function QuizDetails() {
  return (
    <div>
      <NavBar />
      <section>
        <div className="relative px-4 py-8 mx-auto max-w-screen-xl">
          <div className="items-start grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  alt="Mobile Phone Stand"
                  className="object-cover rounded-xl"
                  src="https://images.unsplash.com/photo-1627844541143-a561a1a9b72a"
                />
              </div>
            </div>

            <div className="sticky top-0">
              <div className="flex justify-between mt-8">
                <div className="max-w-[35ch]">
                  <h1 className="text-2xl font-bold">
                    Fun Product That Does Something Cool
                  </h1>
                </div>

                <p className="text-lg font-bold">$119.99</p>
              </div>

              <details className="relative mt-4 group">
                <summary className="block">
                  <div>
                    <div className="prose max-w-none">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa veniam dicta beatae eos ex error culpa delectus rem
                        tenetur, architecto quam nesciunt, dolor veritatis nisi
                        minus inventore, rerum at recusandae?
                      </p>
                    </div>
                  </div>
                </summary>
              </details>

              <form className="mt-8">
                <fieldset>
                  <div className="flow-root">
                    <div className="flex flex-wrap -m-0.5">
                      <strong className="mr-3 inline-flex items-center border border-rose-500 text-rose-500 bg-rose-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                        Paid
                      </strong>
                      <strong className="mr-3 inline-flex items-center border border-sky-500 text-sky-500 bg-sky-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                        10 Questions
                      </strong>
                      <strong className="mr-3 inline-flex items-center border border-teal-500 text-teal-500 bg-teal-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                        25 Participants
                      </strong>
                      <strong className="mr-3 inline-flex items-center border border-amber-500 text-amber-500 bg-amber-100 uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                        40 sec/question
                      </strong>
                    </div>
                  </div>
                </fieldset>

                <div className="flex mt-8">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-5 py-3  bg-teal-600 text-white hover:bg-teal-700 rounded-lg sm:w-auto"
                  >
                    <span className="font-medium"> Take This Quiz </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
