import AboutMainImage from "../assets/aboutMainImage.png";
import Carousel from "../components/Carousel";

function About() {
  return (
    <main className="min-h-[90vh] bg-[#e5e6e6]">
      <section className="flex flex-col lg:flex-row">
        <div className="w-[100%] lg:w-1/2 flex p-8 pb-0 sm:p-20 sm:pb-0 justify-center items-center">
          <div className="content">
            <h2 className="text-2xl sm:text-4xl text-warning font-semibold mb-7 sm:mb-10">
              Affordable and Quality Education
            </h2>
            <p className="text-sm sm:text-lg font-medium">
              Our goal is to provide the affordable and quality eduction in the
              world.We are providing the platform for the aspiring techers and
              students to share their skils, creativity and knowlwdge to each
              other to empower and contribute in the growth and wellness of
              makind.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-20 pt-0 py-10 sm:px-52 sm:py-1 lg:p-24 flex justify-center items-center">
          <img src={AboutMainImage} className="w-full" />
        </div>
      </section>

      <section className="carousel flex justify-center items-center">
        <Carousel />
      </section>
    </main>
  );
}

export default About;
