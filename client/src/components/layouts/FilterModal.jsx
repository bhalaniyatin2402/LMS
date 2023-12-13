import { BsFilter } from "react-icons/bs";
import { useTranslation } from "react-i18next";

function FilterModal({ onSubmit, children, setShow }) {
  const { t } = useTranslation()

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-[#EAEAEC]">
        <h3 className="font-bold text-lg">
          <BsFilter />
          {t('Filter')}
        </h3>

        <form onSubmit={onSubmit}>
          {children}

          <button type="submit" className="btn btn-info btn-sm">
            {t('Apply')}
          </button>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            {/* if there is a button in form, it will close the modal */}
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default FilterModal;
