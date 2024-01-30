import { IoClose } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div className="w-[250px] h-screen bg-[#272b31] box-border flex flex-col pt-[10px] px-[5px] fixed">
      <h2 className="text-center text-[25px] font-[400] text-[#ffdd40]">
        List request
      </h2>
      <div className="flex flex-col gap-[10px] mt-[10px]">
        <div className="bg-[#4c4c4c] w-full h-[30px] flex items-center gap-[10px] px-[10px] box-border rounded-[6px] card-list">
          {/* Get - 5AFF15
            POST - 4BB3FD
            PUT - E0479E
            PATCH -F78764
            DELETE - do */}
          <div className="w-[51px]">PATCH</div>
          <div className="text-[#fff] w-full text-ellipsis overflow-hidden">
            https://123e232322333434
          </div>
          <IoClose
            className="cursor-pointer icon-close"
            color="#ff4444"
            size={25}
          />
        </div>
      </div>
    </div>
  );
}
