"use client";
import React, { useEffect } from "react";
import { getUserData, saveUserData } from "./user";
export default function Modal({ showModalInit }) {
  const [showModal, setShowModal] = React.useState(showModalInit);
  const [userData, setUserData] = React.useState({});

  const handleSave = () => {
    saveUserData(userData);
    setShowModal(false);
  };
  useEffect(() => {
    setUserData(getUserData());
  }, []);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold capitalize text-blue-400">
                    masukkan data anda agar hasil lebih personal
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="relative z-0">
                      <input
                        type="number"
                        id="bb"
                        value={userData?.bb || ""}
                        onChange={(e) =>
                          setUserData({ ...userData, bb: e.target.value })
                        }
                        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                        placeholder=" "
                      />
                      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                        Berat Badan (Kg)
                      </label>
                    </div>
                    <div className="relative z-0">
                      <input
                        type="number"
                        id="tb"
                        onChange={(e) =>
                          setUserData({ ...userData, tb: e.target.value })
                        }
                        value={userData?.tb || ""}
                        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                        placeholder=" "
                      />
                      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                        Tinggi Badan (cm)
                      </label>
                    </div>
                    <div className="relative z-0">
                      <input
                        type="number"
                        id="umur"
                        onChange={(e) =>
                          setUserData({ ...userData, umur: e.target.value })
                        }
                        value={userData?.umur || ""}
                        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                        placeholder=" "
                      />
                      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                        Umur (Tahun)
                      </label>
                    </div>
                    <div className="relative z-0 flex">
                      <div className="flex items-center me-4">
                        <input
                          type="radio"
                          value="pria"
                          name="jk"
                          onChange={(e) => {
                            setUserData({ ...userData, jk: e.target.value });
                          }}
                          checked={userData?.jk === "pria"}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Pria
                        </label>
                      </div>
                      <div className="flex items-center me-4">
                        <input
                          type="radio"
                          value="wanita"
                          onChange={(e) => {
                            setUserData({ ...userData, jk: e.target.value });
                          }}
                          name="jk"
                          checked={userData?.jk === "wanita"}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Wanita
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
