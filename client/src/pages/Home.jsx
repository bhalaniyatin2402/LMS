import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import HomePageImage from "../assets/homePageMainImage.png";
import Layout from "../components/layouts/Layout";

function Home() {
  const { t } = useTranslation();

  return (
    <Layout className="bg-[#e5e6e6]">
      <main className="min-h-[85vh] flex flex-col lg:flex-row">
        <section className="w-full lg:w-1/2 py-8 sm:py-20 flex flex-col justify-center sm:p-12">
          <h2 className="text-4xl font-semibold mb-8">
            <Trans i18nKey="homePage.titleOne">Find Out best</Trans>&nbsp;
            <span className="text-warning">
              <Trans i18nKey="homePage.titleTwo">Online Courses</Trans>
            </span>
          </h2>
          <p className="text-lg mb-5">
            <Trans i18nKey="homePage.description">
              We have a large library of courses taught by highly skilled and
              qualified faculties at a very affordable cost.
            </Trans>
          </p>
          <div className="explore flex flex-col sm:flex-row gap-4">
            <Link to="/courses">
              <button className="btn btn-warning">
                {t("Explore Courses")}
              </button>
            </Link>
            <a href="mailto:kano24022@gmail.com" className="underline">
              <button className="btn btn-outline btn-warning">
                {t("Contact")}
              </button>
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
