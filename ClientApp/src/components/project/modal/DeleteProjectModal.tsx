import { ModalProps } from '../../../types/ModalProps';
import React from 'react';

export const DeleteProjectModal = (props: ModalProps) => {
    const { submitModal, closeModal, entity } = props;
    
    const submitForm = (event: React.FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            event.preventDefault();
            closeModal()

            submitModal(entity);
        }
    }

    return (
        <div id="DeleteProjectModal" className="flex justify-center items-center bg-overlay overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto modal-mw-desktop">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex justify-between align-items p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font-normal">Delete Project</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => closeModal()}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form className="relative w-full max-h-full" onSubmit={(event) => submitForm(event)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full text-center text-xl">
                            <p><span className='text-red-500'>Delete</span> Project - "{entity.name}"</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full text-center text-lg">
                            <p className='font-normal'>Are you sure you want to delete this project?</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center pl-6 pt-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="background-transparent font-bold w-24 uppercase mx-6 px-6 py-2 text-sm outline-none text-gray-500 hover:text-gray-800 focus:outline-none"
                        type="submit"
                        onClick={() => closeModal()}
                      >
                        No
                      </button>
                      <button
                        className="ml-4 bg-red-400 hover:bg-red-500 w-24 text-white font-bold mx-6 py-2 px-4 border rounded disabled:bg-gray-400 disabled:opacity-50 disabled:hover:bg-gray-400"
                        type="submit"
                      >
                        Yes
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
}