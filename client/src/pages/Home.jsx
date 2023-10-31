import { Link } from "react-router-dom";

import HomePageImage from "../assets/homePageMainImage.png";
import Layout from "../components/layouts/Layout";
import { useGetAllCorsesMutation } from "../redux/services/lmsCourseApi";

function Home() {
  const [getAllCourses] = useGetAllCorsesMutation()

  window.addEventListener('load', async () => {
    const response = await getAllCourses()
    console.log(response);
    console.log('document loaded');
  })

  return (
    <Layout className="bg-[#e5e6e6]">
      <main className="min-h-[85vh] flex flex-col lg:flex-row">
        <section className="w-full lg:w-1/2 py-8 sm:py-20 flex flex-col justify-center sm:p-12">
          <h2 className="text-4xl font-semibold mb-8">
            Find Out best&nbsp;
            <span className="text-warning">Online Courses</span>
          </h2>
          <p className="text-lg mb-5">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>
          <div className="explore flex flex-col sm:flex-row gap-4">
            <Link to="/courses">
              <button className="btn btn-warning">Explore courses</button>
            </Link>
            <a href="mailto:kano24022@gmail.com" className="underline">
              <button className="btn btn-outline btn-warning">contact</button>
            </a>
          </div>
        </section>
        <section className="w-full lg:w-1/2 flex justify-center items-center border p-2">
          <img src={HomePageImage} className="" />
        </section>
      </main>
    </Layout>
  );
}

export default Home;
