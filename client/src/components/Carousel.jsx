import { Trans, useTranslation } from "react-i18next";

import { celebrities } from "../constants/celebrityData";

function Carousel() {
  const { t } = useTranslation();
  return (
    <>
      <div className="carousel w-full sm:w-9/12 lg:w-6/12 mx-auto py-12">
        {celebrities &&
          celebrities.map((c, i, o) => (
            <div
              id={`slide${i + 1}`}
              className="carousel-item relative w-full flex flex-col"
              key={i}
            >
              <img
                src={c.image}
                className="w-5/12 rounded-full border border-gray-700 mx-auto"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={`#slide${i + 1 === 1 ? o.length : i}`}
                  className="btn btn-circle btn-active btn-neutral"
                >
                  ❮
                </a>
                <a
                  href={`#slide${i + 1 === o.length ? 1 : i + 2}`}
                  className="btn btn-circle btn-active btn-neutral"
                >
                  ❯
                </a>
              </div>
              <p className="text-center mt-8 text-sm sm:text-md lg:text-lg w-8/12 mx-auto">
                <Trans i18nKey={`aboutPage.carousel.${i}.quote`}>
                  {c.description}
                </Trans>
              </p>
              <h2 className="text-center font-semibold text-lg sm:text-xl lg:text-2xl mt-2">
                <Trans i18nKey={`aboutPage.carousel.${i}.name`}>
                  {c.title}
                </Trans>
              </h2>
            </div>
          ))}
      </div>
    </>
  );
}

export default Carousel;
