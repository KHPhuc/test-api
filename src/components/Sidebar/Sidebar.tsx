import {
  setAuth,
  setAuthBearer,
  setAuthCustom,
  setAuthType,
  setPassword,
  setUsername,
} from "@/store/authorization/authorization";
import { setContent, setContentType } from "@/store/content/content";
import { setHeaders } from "@/store/headers/headers";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setMethod, setUrl } from "@/store/request/request";
import { setListSaved } from "@/store/save/save";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {
  const dispatch = useAppDispatch();

  const saved = useAppSelector((state) => state.save.listSaved);

  return (
    <div className="w-[250px] h-screen bg-[#272b31] box-border flex flex-col pt-[10px] px-[5px] fixed">
      <h2 className="text-center text-[25px] font-[400] text-[#ffdd40]">
        List request
      </h2>
      <div className="flex flex-col gap-[10px] mt-[10px]">
        {saved.length ? (
          saved.map((e: any, i: any) => {
            return (
              <div
                key={i}
                className="bg-[#4c4c4c] w-full h-[30px] flex items-center px-[10px] py-[5px] box-border rounded-[6px] card-list justify-between"
              >
                <div
                  className="flex info-saved gap-[10px] cursor-pointer"
                  onClick={() => {
                    dispatch(setMethod(e.method));
                    dispatch(setUrl(e.url));
                    dispatch(setContentType(e.contentType));
                    dispatch(setContent(e.content));
                    dispatch(setAuthType(e.authType));
                    dispatch(setAuth(e.auth));
                    dispatch(setAuthBearer(e.authBearer));
                    dispatch(setUsername(e.username));
                    dispatch(setPassword(e.password));
                    dispatch(setAuthCustom(e.authCustom));
                    dispatch(setHeaders(e.headers));
                  }}
                >
                  <div
                    className={` ${
                      e.method === "get"
                        ? "text-[#6BDD9A]"
                        : e.method === "post"
                        ? "text-[#FFE47E]"
                        : e.method === "put"
                        ? "text-[#74AEF6]"
                        : e.method === "patch"
                        ? "text-[#C0A8E1]"
                        : e.method === "delete"
                        ? "text-[#F79A8E]"
                        : e.method === "head"
                        ? "text-[#6BDD9A]"
                        : "text-[#F15EB0]"
                    }`}
                  >
                    {e.method.toUpperCase()}
                  </div>
                  <div className="text-[#fff] text-ellipsis overflow-hidden">
                    {e.url}
                  </div>
                </div>
                <IoClose
                  className="cursor-pointer icon-close"
                  color="#ff4444"
                  size={25}
                  onClick={() => {
                    const newList = [...saved];
                    newList.splice(i, 1);
                    dispatch(setListSaved(newList));
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="bg-[#4c4c4c] w-full h-[30px] flex items-center gap-[10px] px-[10px] py-[5px] box-border rounded-[6px] card-list">
            {/* Get - 5AFF15
        POST - 4BB3FD
        PUT - E0479E
        PATCH -F78764
        DELETE - do */}
            <div className="text-[#fff] w-full text-ellipsis overflow-hidden">
              Empty
            </div>
          </div>
        )}
        {/* <div className="bg-[#4c4c4c] w-full h-[30px] flex items-center gap-[10px] px-[10px] py-[5px] box-border rounded-[6px] card-list">
          Get - 5AFF15
            POST - 4BB3FD
            PUT - E0479E
            PATCH -F78764
            DELETE - do
          <div className="w-[51px]">PATCH</div>
          <div className="text-[#fff] w-full text-ellipsis overflow-hidden">
            https://123e232322333434
          </div>
          <IoClose
            className="cursor-pointer icon-close"
            color="#ff4444"
            size={25}
          />
        </div> */}
        {/* <div className="bg-[#4c4c4c] w-full h-[30px] flex items-center justify-center gap-[5px] px-[10px] py-[5px] box-border rounded-[6px] cursor-pointer card-list">
          <IoAdd color="#ffffff" size={25} />
          <span className="text-[#fff]">New request</span>
        </div> */}
      </div>
    </div>
  );
}
