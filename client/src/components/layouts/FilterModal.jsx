import { BsFilter } from "react-icons/bs";

function FilterModal({ onSubmit, children, setShow }) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          <BsFilter />
          Filter
        </h3>

        <form onSubmit={onSubmit}>
          {children}

          <button type="submit" className="btn btn-info btn-sm">
            Apply
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
