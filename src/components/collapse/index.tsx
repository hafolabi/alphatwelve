import { images } from "../../theme";
import React from "react";
// import CustomImage from "../customImage";

const CollapseComponent = ({
  openedTabId,
  setOpenedtabId,
  theObject,
  setOpenModal,
  setTableItem,
  darkMode
}: any) => {
  return (
    <div className={`w-full`}>
      <div
        className={`transtion duration-1000  ${
          openedTabId ? "pb-1" : "pb-0"
        }`}
      >
        <div className={`flex justify-between items-start  `}>
        {openedTabId === theObject?.id ? (
            <div
              className="lg:w-[48px] w-6 h-6 lg:h-[48px] cursor-pointer "
              onClick={() => setOpenedtabId(undefined)}
            >
            {darkMode ? <img src={images.chevronDownWhite} alt='' /> : <img src={images.chevronDown} alt='' />}
            </div>
          ) : (
            <div
              className="lg:w-[48px] w-6 h-6 lg:h-[48px] cursor-pointer "
              onClick={() => setOpenedtabId(theObject?.id)}
            >
              {darkMode ? <img src={images.chevronRightWhite} alt='' /> : <img src={images.chevronRight} alt='' /> }
            </div>
          )}

          <div className="flex flex-col  w-[100%]  xl:w-[80%]">
            <div className="flex items-center justify-between">
            <p className={`${darkMode ? '!text-white' : 'text-[#111216]'} lg:text-[24px]  text-[16px] font-[200] `}>
              {theObject?.name}
            </p>
            <div
                className={`${
                  theObject?.status?.toLowerCase() == "completed"
                    ? "text-[#10B981] bg-[#D1FAE5]"
                    : theObject?.status?.toLowerCase() == "in progress"
                    ? "text-[#3B82F6] bg-[#DBEAFE]"
                    : ""
                } capitalize xl:px-1 px-2 py-1 rounded-2xl flex items-center gap-2 justify-center text-[13px] w-[30%]`}
              >
               <p>{theObject?.status?.toLowerCase()}</p>
              </div>
            </div>
            
            {openedTabId === theObject?.id &&
              (typeof theObject?.content === "string" ? (
                <div className="flex items-center justify-between pt-6">
                  <p className="text-[#383A47] font-[500] lg:text-[18px] text-[16px] ">
                    {theObject?.speaker}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2"
                onClick={()=>{
                  setOpenModal(true)
                  setTableItem(theObject)
                }}
                >
                  <p className={`${darkMode ? '!text-white' : 'text-[#383A47]'} font-[500] lg:text-[18px] text-[16px] `}>
                    {theObject?.speaker}
                  </p>
                  <p className={`${darkMode ? '!text-white' : 'text-[#383A47]'} font-[500] lg:text-[18px] text-[16px] `}>
                    {theObject?.dateCreated}
                  </p>
                </div>
              ))}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default CollapseComponent;
