import { useEffect, useRef, useState } from "react";
import DashboardSidebar from "../components/dashboardSidebar";
import { cards, chartData, dataTable } from "../utliz";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Carousel } from "antd";
import carousel1 from '../assets/icons/Carousel1.svg'
import carousel2 from '../assets/icons/Carousel2.svg'
import carousel3 from '../assets/icons/Carousel3.svg'
import { images } from "../theme";
import CustomTable from "../components/table";
import { ColumnsType } from "antd/es/table";
import Modals from "../components/modal";
import { TableItem, TableMobileItem } from "../utliz/interface";
import { useReactToPrint } from "react-to-print";
import { tableMobiledata } from "../utliz/helper";
import CollapseComponent from "../components/collapse";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [sidebar, setSidebar] =  useState<boolean>(false);
    const [colBar, setColBar] =  useState(false);
    const [darkMode, setDarkMode] =  useState(false);
    const [openModal, setOpenModal] =  useState(false);
    const [tableItem, setTableItem]=  useState<TableItem | undefined>(undefined)
    const [serachParams, setSerachParams] =  useState('')
    const [filteredData, setFilteredData] =  useState([])
    const [openedTabId, setOpenedtabId] = useState<undefined | number>(undefined);
    const [width, setWidth] = useState(window.innerWidth);

    const componentRef: React.MutableRefObject<HTMLTableElement | null> = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const componentRef2: React.MutableRefObject<HTMLTableElement | null> = useRef(null);
    const handlePrint2 = useReactToPrint({
      content: () => componentRef2.current,
    });

    const divStyle1 = {
      backgroundImage: `url(${carousel1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: `${darkMode ? '400px' : '300px'}`, 
      width: '100%',   
    };

    const divStyle2 = {
      backgroundImage: `url(${carousel2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: `${darkMode ? '400px' : '300px'}`, 
      width: '100%',   
    };

    const divStyle3 = {
      backgroundImage: `url(${carousel3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: `${darkMode ? '400px' : '300px'}`, 
      width: '100%',   
    };
    
    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div
            style={{
              backgroundColor: "#fff",
              color: "#000000",
              fontSize: "13px",
              fontWeight: "600",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          >
            <p style={{ margin: 0 }}>{`${payload[0].value
              ?.toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>{" "}
            {/* Display only the Y-axis value */}
          </div>
        );
      }
      return null;
    };

  // Logic to search through the recipient list
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchText = e.target.value;
    setSerachParams(searchText);

    const searchedData: any =  width < 1280 ? tableMobiledata.filter(
      (item: TableMobileItem, i: number) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ) : dataTable.filter(
        (item: TableItem, i: number) =>
          Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );

    setFilteredData(searchedData);
  };
  const tableRecordList = serachParams ? filteredData : dataTable;
  const tableRecordListMobile = serachParams ? filteredData : tableMobiledata;
  
    const columns: ColumnsType<any> = [
      {
        title: (
          <p className="text-[#121220] text-[14px] font-[400] leading-[19.2px] ">
            Name
          </p>
        ),
        dataIndex: "name",
        key: "name",
        render: (item, record) => {
          return {
            children: (
              <div className="capitalize">
                {item}
              </div>
            ),
          };
        },
      },
      {
        title: (
          <p className="text-[#121220] text-[14px] font-[400] leading-[19.2px] capitalize ">
            Date
          </p>
        ),
        dataIndex: "dateCreated",
        key: "dateCreated",
        render: (item, record) => {
          return {
            children: (
              <div className="">
                {item}
              </div>
            ),
          };
        },
      },
  
      {
        title: (
          <p className="text-[#121220] text-[14px] font-[400] leading-[19.2px] ">
            Speaker
          </p>
        ),
        dataIndex: "speaker",
        key: "speaker",
        render: (item, record) => {
          return {
            children: (
              <div className=" capitalize">
               {item}
              </div>
            ),
          };
        },
      },
      {
        title: (
          <p className="text-[#121220] text-[14px] font-[400] leading-[19.2px] ">
            Status
          </p>
        ),
        dataIndex: "status",
        key: "status",
        render: (item, record) => {
          return {
            children: (
              <div
                className={`${
                  item?.toLowerCase() == "completed"
                    ? "text-[#10B981] bg-[#D1FAE5]"
                    : item?.toLowerCase() == "in progress"
                    ? "text-[#3B82F6] bg-[#DBEAFE]"
                    : ""
                } capitalize xl:px-1 px-2 py-1 rounded-2xl flex items-center gap-2 justify-center xl:w-[60%] w-full`}
              >
                <p
                  className={`w-[10px] h-[10px] rounded-full ${
                    item?.toLowerCase() == "completed"
                      ? "bg-[#10B981]"
                      : item?.toLowerCase() == "in progress"
                      ? "bg-[#3B82F6]"
                      : ""
                  }`}
                ></p>
                <p>{item?.toLowerCase()}</p>
              </div>
            ),
          };
        },
      },
    ];
  
    const onRowClick = (record: any) => {
      setOpenModal(true)
      setTableItem(record)
     
    };

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    <div className={`2xl:w-[1440px] flex justify-between mx-auto`}>
        <DashboardSidebar 
          setSidebar={setSidebar} 
          sidebar={sidebar} 
          setColBar={setColBar} 
          colBar={colBar} 
          setDarkMode={setDarkMode}
          darkMode={darkMode}
        />
        <div className={`flex flex-col justify-between ${darkMode ? 'bg-[#383544] text-white' : 'bg-white'} ${colBar ? 'xl:w-[96%] w-full xl:ml-[4%]' : 'xl:w-[85%] w-full xl:ml-[15%]'} transition-all`}>
          <div className='lg:pl-14 lg:pr-20 p-4 pt-8 pb-16'>
            <div className=''>
                  <Link to='/' className={`pb-9 h-[50px] ${colBar ? ' w-[70px] ' : ' w-full '} text-[18px] font-semibold flex justify-between items-center xl:hidden`}>
                     <img src={images.logo} alt='logo'/>

                    {!sidebar && <img src={images.hamburger} alt='logo' className='xl:hidden block' onClick={()=> setSidebar(true)}/>}
                 </Link>
              <p className='text-[24px] font-[400]'>Welcome! here’s your summary</p>
            </div>
            <div className="flex gap-4 md:flex-row flex-col ">
              {cards.map((item, i) =>(
                <div className={`${darkMode ? 'bg-[#484554]' : 'bg-white'} p-4 shadow h-[90px] md:w-[25%] w-full mt-6`} key={i}>
                  <div className="flex items-center gap-1">
                  <p className={`text-[15px] ${darkMode ? 'text-[#D1D0D4]' : 'text-[#64748B]'} font-semibold`}>{item.title}</p>
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`text-[19px] ${darkMode ? 'text-[#D1D0D4]' : 'text-[#64748B]'} font-semibold`}>{item.amount}</p>
                    <div className="flex gap-1.5 items-center">
                      <img src={item.percIcon} alt="" />
                      <p className="text-[11px]">{item.perc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart and the slider */}
            <p className="text-[22px] font-medium py-4 mt-10">Event Registrations per month</p>
            <div className="flex md:flex-row flex-col gap-4 w-full mt-4">
              <div className={` md:w-[50%] w-full ${darkMode ? 'bg-[#484554] pt-6 pr-6' : ''}`}>
                <ResponsiveContainer width="100%" height={330}>
                  <BarChart
                    data={chartData}
                    className="!text-[11px] 2xl:!text-[13px] font-[100]"
                  >
                    <XAxis
                      dataKey="name"
                      stroke={`${darkMode ? '#ededee' : '#64748B'} `}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis axisLine={false} tickLine={false} stroke={`${darkMode ? '#ededee' : '#64748B'} `}/>
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid
                      strokeDasharray="3 6"
                      vertical={false}
                      stroke="#ededee"
                    />
                    <Bar dataKey="amount" fill="#8576FF" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="md:w-[50%] w-full">
              <Carousel arrows infinite={true} autoplay>
                <div className="flex flex-col items-center"  >
                  <h3 className="flex flex-col" style={divStyle1}>
                    <p className={`${darkMode ? 'mt-64 ' : 'mt-44 '} text-white font-[500] text-[14px] px-4`}>Latest News & Updates</p>
                    <p className="mt-1 text-white font-[300] text-[13px] px-4">
                      Turpis interdum nunc varius ornare dignissim pretium. 
                      Massa ornare quis aliquet sed vitae. Sed velit nisi, 
                      fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. 
                      Pellentesque in ut tellus.
                    </p>
                  </h3>
                </div>
                <div className="flex flex-col items-center"  >
                  <h3 className="flex flex-col" style={divStyle2}>
                    <p className={`${darkMode ? 'mt-64 ' : 'mt-44 '} text-white font-[500] text-[14px] px-4`}>Latest News & Updates</p>
                    <p className="mt-1 text-white font-[300] text-[13px] px-4">
                      Turpis interdum nunc varius ornare dignissim pretium. 
                      Massa ornare quis aliquet sed vitae. Sed velit nisi, 
                      fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. 
                      Pellentesque in ut tellus.
                    </p>
                  </h3>
                </div>
                <div className="flex flex-col items-center"  >
                  <h3 className="flex flex-col" style={divStyle3}>
                    <p className={`${darkMode ? 'mt-64 ' : 'mt-44 '} text-white font-[500] text-[14px] px-4`}>Latest News & Updates</p>
                    <p className="mt-1 text-white font-[300] text-[13px] px-4">
                      Turpis interdum nunc varius ornare dignissim pretium. 
                      Massa ornare quis aliquet sed vitae. Sed velit nisi, 
                      fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. 
                      Pellentesque in ut tellus.
                    </p>
                  </h3>
                </div>
              </Carousel>
              </div>
            </div>

            <p className="text-[22px] font-medium py-4 mt-10">Event History</p>
            <div className="flex xl:flex-row flex-col w-full  justify-between">
              <div className="flex xl:flex-row flex-col gap-2 xl:items-center xl:w-[70%] w-full">
                <div className="flex items-center gap-2 xl:w-[25%] w-full p-2 border">
                  <img src={images.search} alt="" />
                  <input 
                    type="search" 
                    placeholder="Search..." 
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    className=" w-full placeholder:text-[15px] border-none bg-transparent focus:ring-0 focus-visible:ring-0 focus:outline-none" />
                </div>

                <select className={`border xl:w-[15%] w-full p-2 ${darkMode ? 'bg-[#484554]' : ''}`}>
                  <option value="">Date</option>
                </select>

                <select className={`border xl:w-[15%] w-full p-2 ${darkMode ? 'bg-[#484554]' : ''}`}
                  onChange={(e: any)=> onChangeHandler(e)}
                >
                  <option value="">Status</option>
                  <option value="completed">completed</option>
                  <option value="in progress">inprogress</option>
                </select>

                <select className={`border xl:w-[15%] w-full p-2 ${darkMode ? 'bg-[#484554]' : ''}`}>
                  <option value="">Name</option>
                </select>

                <p className="text-[14px] font-semibold">Displaying 100 results</p>
              </div>

              <div className="flex xl:flex-row flex-col xl:items-center gap-2 xl:w-[30%] w-full">
                <div className="flex justify-between gap-2 xl:justify-start items-center ">
                  <p className="text-[14px] font-semibold">Sort:</p>
                  <select className={`border p-2 ${darkMode ? 'bg-[#484554]' : ''}`}>
                      <option value="">Most Recent</option>
                  </select>
                </div>
                <div className="flex justify-between gap-2 xl:justify-start items-center ">
                <div className="border p-2">
                  <img src={!darkMode ? images.dotVertical : images.dotVerticalWhite} alt="" />
                </div>

                <div className="flex gap-2 border py-2 px-4 cursor-pointer"  onClick={()=> (width >1280 ) ? handlePrint() : handlePrint2()}>
                  <img src={!darkMode ? images.export : images.exportWhite} alt="" />
                 <p className="text-[14px] font-medium">Export</p> 
                </div>
                </div>
              </div>
            </div>

            {width >=1280 && 
              <div className="xl:px-0 px-4 mt-8 block " ref={componentRef}>
              <CustomTable data={tableRecordList} columns={columns} onRowClick={onRowClick}/>
               </div>
            }

             <div className="flex xl:hidden flex-col justify-center items-center gap-8 mx-auto  mt-8" ref={componentRef2}>
                {tableRecordListMobile
                  .map((value, index) => (
                    <CollapseComponent
                      theObject={value}
                      setOpenedtabId={setOpenedtabId}
                      openedTabId={openedTabId as number}
                      key={index}
                      setTableItem={setTableItem}
                      setOpenModal={setOpenModal}
                      darkMode={darkMode}
                    />
                  ))}
                  
                  <div className="flex justify-between cursor-pointer">
                    <div className="flex items-center gap-4 mr-16">
                      <img src={images.leftpagination} alt="" />
                      <p className="p-2 rounded-full flex items-center justify-center text-white bg-[#8576FF] h-[25px] w-[25px]">1</p>
                      <p className="p-2 rounded-full flex items-center justify-center h-[25px] w-[25px]">2</p>
                      <p className="p-2 rounded-full flex items-center justify-center h-[25px] w-[25px]">3</p>
                      <img src={images.rightpagination} alt="" />
                    </div>
                      <div>
                        <select name="" id="" className={`${darkMode ? 'bg-[#484554]' : ''} p-2 border`}>
                          <option value="">10 rows</option>
                        </select>
                      </div>
                  </div>
              </div>
          </div>

          {/* bottom mobile navigator */}
          <div className="border-t xl:hidden flex items-center justify-between">
            <div className="flex items-center flex-col p-3 pb-6 border-t-2 border-[#8576FF] ">
              <img src={images.home} alt=""  className="w-[25px]"/>
              <p className="text-[#8576FF] text-[14px]">Home</p>
            </div>

            <div className="flex items-center flex-col p-3 pb-6">
              <img src={images.events} alt=""  className="w-[25px]"/>
              <p className="text-[14px]">Events</p>
            </div>

            <div className="flex items-center flex-col p-3 pb-6">
              <img src={images.speakers} alt=""  className="w-[25px]"/>
              <p className="text-[14px]">Speakers</p>
            </div>

            <div className="flex items-center flex-col p-3 pb-6">
              <img src={images.report} alt=""  className="w-[25px]"/>
              <p className="text-[14px]">Reports</p>
            </div>

            <div className="flex items-center flex-col p-3 pb-6">
              <img src={images.profile} alt=""  className="w-[30px]"/>
              <p className="text-[14px]">Profile</p>
            </div>
          </div>
        </div>

        <Modals
          open={openModal}
          setOpen={setOpenModal}
        >
          <div className={`${darkMode ? 'bg-[#484554] text-white ' : 'text-[#334155]'} px-[24px] pt-[28px]`}>
            <div className="flex justify-between">
                <div>
                  <p className="text-[20px] font-semibold">{tableItem?.name}</p>
                  <p className="text-[16px] font-[200]">{tableItem?.dateCreated}</p>
                </div>
                <div>
                   <img src={images.close} alt=""  className=" cursor-pointer" onClick={()=> setOpenModal(false)}/>
                </div>
              </div>

              <p className="my-4 font-[200] text-[16px] xl:w-[90%]  w-full">
                {tableItem?.desc}
              </p>

              <div className="mt-8 pb-4">
                <img src={images.aavatar} alt="" className="py-2" />
                <p className="text-[16px] font-[200]">
                  Guest Speakers: {tableItem?.speaker}
                </p>
                <p className="text-[16px] font-[200]">{tableItem?.attendees} Attendees</p>
              </div>
          </div>
          
          <div className={`flex xl:flex-row flex-col justify-between xl:items-center p-6 ${darkMode ? 'bg-[#ADA9BB]' : 'bg-[#F8FAFC]'}`}>
                <p className="px-6 py-2 border cursor-pointer">
                  Edit
                </p>

                <div className="flex xl:flex-row flex-col gap-4 xl:items-center mt-4 xl:mt-0">
                  <p className="px-6 py-2 border cursor-pointer bg-[#F43F5E] text-white">
                    Delete
                  </p>

                  <p className="px-6 py-2 border cursor-pointer bg-[#8576FF] text-white">
                     Mark as completed
                  </p>
                </div>
              </div>
        </Modals>
    </div>
  )
}

export default Dashboard