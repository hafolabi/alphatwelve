import { Link } from 'react-router-dom';
import { images } from '../theme';
import { Drawer, Switch } from 'antd';

interface dashboardSidebarProps {
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setColBar: React.Dispatch<React.SetStateAction<boolean>>,
    colBar: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean
}

function DashboardSidebar({setSidebar, sidebar, setColBar, colBar, setDarkMode, darkMode}:dashboardSidebarProps) {

    const url = window.location.pathname
    // console.log('url', url)

    const navItem = [
        {
            name:'Home',
            url: '/',
            icon: images.home,
            count:''
        },
        {
            name:'Events',
            url: '#',
            icon: images.events,
            count:''
        },
        {
            name:'Speakers',
            url: '#',
            icon: images.speakers,
            count:''
        },
        {
            name:'Report',
            url: '#',
            icon: images.report,
            count:''
        },
        {
            name:'Notifications',
            url: '#',
            icon: images.bell,
            count:'3'
        },
        {
            name:'Messages',
            url: '#',
            icon: images.messages,
            count:''
        },
        {
            name:'Settings',
            url: '#',
            icon: images.settings,
            count:''
        },
        
    ]

  return (
    <>
        {/* pc view sidebar */}
        <div className={`hidden ${darkMode ? 'text-[#D1D0D4] bg-[#484554]' : 'text-[#4f4f52]'}  ${colBar ? '2xl:w-[80px] xl:w-[5%]  md:w-[6%]' : '2xl:w-[220px] xl:w-[17%]  md:w-[23%]'} xl:flex fixed h-screen flex-col transition-all`}>
            <div className='flex flex-col relative h-screen'>
                <Link to='/' className={`pb-9 h-[50px] ${colBar ? ' w-[70px] p-2  ' : ' w-full p-6 '} text-[18px] font-semibold`}>
                    <img src={images.logo} alt='logo'/>
                </Link>

                <div className='h-[90%] hover:overflow-y-auto overflow-y-hidden mt-4'>
                    {navItem.map((item, i: number)=>( 
                        <Link 
                            to={item.url}
                            key={i}
                            className={`text-[13px] font-bold flex justify-between item-center ${darkMode ? 'hover:bg-[#8576FF]' : 'hover:bg-[#FCF7FF]'} gap-2 cursor-pointer ${item.url == url && !darkMode ? 'bg-[#FCF7FF] text-[#8576FF]' : item.url == url && darkMode ? 'bg-[#8576FF] text-[#FCF7FF]' : '' } mx-4 p-2 rounded-xl mt-1`}>
                            
                            <div className='flex items-center justify-center gap-4 font-[400] text-[13px]'>
                                <p>
                                    <img src={item.icon} alt='icon' className={`${(i == 0 || i == 4 || i == 5 || i == 6 || i == 7) ? 'w-[20px] h-[20px]' : 'w-[16px] h-[16px]'} `} />
                                </p><span className={`${colBar ? 'hidden' : 'block transition-all'}`}> {item.name}</span>
                            </div>
                            {item.count && 
                                <p className={`${colBar ? 'hidden' : 'block'} bg-[#F43F5E] text-white p-1 rounded-full h-[25px] w-[25px] text-center flex items-center justify-center`}>
                                {item.count}
                                </p>
                            }
                        </Link>
                        ))
                    }
                   <div className={`flex items-center gap-1 pl-6 mt-2 cursor-pointer ${darkMode ? 'text-[#D1D0D4]' : 'text-[#4f4f52]'}`} onClick={()=> setColBar(!colBar)}>
                   {colBar ? <img src={images.collapersRight} alt="" className='w-[20px] h-[20px]' /> :
                    <img src={images.collapersleft} alt="" className='w-[20px] h-[20px]' />
                   }
                    <p className={`${colBar ? 'hidden' : 'block'} text-[13px] ml-3`}>Collapse</p>
                   </div>

                   <div className={`flex items-center gap-1 pl-4 mt-2 cursor-pointer ${darkMode ? 'text-[#D1D0D4]' : 'text-[#4f4f52]'}`}>
                    <Switch  className='small-switch' onChange={()=> setDarkMode(!darkMode)}/>
                    <p className={`${colBar ? 'hidden' : 'block'} text-[13px]`}>Dark Mode</p>
                   </div>

                   <div className={`flex items-center gap-2 pl-4 mt-4 cursor-pointer ${darkMode ? 'text-[#D1D0D4]' : 'text-[#4f4f52]'}`}>
                    <img src={images.avatar} alt="icon" />
                    <div className={`${colBar ? 'hidden' : 'block'}`}>
                        <p className='text-[14px]'>
                        Rudra Devi
                        </p>
                        <p className='text-[12px]'>rudra.devi@gmail.com</p>
                    </div>
                   </div>
                </div>
                
            </div>
        </div>
        <Drawer
                title=""
                placement={"left"}
                width={380}
                onClose={() => setSidebar(false)}
                open={sidebar}
                extra={
                <img
                    src={images.close}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setSidebar(false)}
                />
                }
                closeIcon={null}
            >
                <div className={`flex ${darkMode ? 'text-[#D1D0D4] bg-[#484554]' : 'text-[#4f4f52]'}   w-[100%]  xl:hidden h-screen flex-col transition-all px-4 py-8`}>
                        <div className='flex flex-col relative h-screen'>
                            <Link to='/' className={`pb-9 h-[50px] ${colBar ? ' w-[70px] p-2  ' : ' w-full p-6 '} text-[18px] font-semibold flex justify-between items-center`}>
                                <img src={images.logo} alt='logo'/>

                                <img src={images.close} alt='logo' className='xl:hidden block' onClick={()=> setSidebar(false)}/>
                            </Link>

                            <div className='h-[90%] hover:overflow-y-auto overflow-y-hidden mt-4'>
                                {navItem.map((item, i: number)=>( 
                                    <Link 
                                        to={item.url}
                                        key={i}
                                        className={`text-[13px] font-bold flex justify-between item-center ${darkMode ? 'hover:bg-[#8576FF]' : 'hover:bg-[#FCF7FF]'} gap-2 cursor-pointer ${item.url == url && !darkMode ? 'bg-[#FCF7FF] text-[#8576FF]' : item.url == url && darkMode ? 'bg-[#8576FF] text-[#FCF7FF]' : '' } mx-4 p-2 rounded-xl mt-1`}>
                                        
                                        <div className='flex items-center justify-center gap-4 font-[400] text-[13px]'>
                                            <p>
                                                <img src={item.icon} alt='icon' className={`${(i == 0 || i == 4 || i == 5 || i == 6 || i == 7) ? 'w-[20px] h-[20px]' : 'w-[16px] h-[16px]'} `} />
                                            </p><span className={`${colBar ? 'hidden' : 'block transition-all'}`}> {item.name}</span>
                                        </div>
                                        {item.count && 
                                            <p className={`${colBar ? 'hidden' : 'block'} bg-[#F43F5E] text-white p-1 rounded-full h-[25px] w-[25px] text-center flex items-center justify-center`}>
                                            {item.count}
                                            </p>
                                        }
                                    </Link>
                                    ))
                                }
                            <div className={`flex items-center gap-1 pl-6 mt-2 cursor-pointer ${darkMode ? 'text-[#D1D0D4]' : 'text-[#4f4f52]'}`} onClick={()=> setColBar(!colBar)}>
                            {colBar ? <img src={images.collapersRight} alt="" className='w-[20px] h-[20px]' /> :
                                <img src={images.collapersleft} alt="" className='w-[20px] h-[20px]' />
                            }
                                <p className={`${colBar ? 'hidden' : 'block'} text-[13px] ml-3`}>Collapse</p>
                            </div>

                            <div className={`flex items-center gap-1 pl-4 mt-2 cursor-pointer ${darkMode ? 'text-[#D1D0D4]' : 'text-[#4f4f52]'}`}>
                                <Switch  className='small-switch' onChange={()=> setDarkMode(!darkMode)}/>
                                <p className={`${colBar ? 'hidden' : 'block'} text-[13px]`}>Dark Mode</p>
                            </div>

                            <div className={`flex items-center gap-2 pl-4 mt-4 cursor-pointer ${darkMode ? 'text-[#D1D0D4]' : 'text-[#4f4f52]'}`}>
                                <img src={images.avatar} alt="icon" />
                                <div className={`${colBar ? 'hidden' : 'block'}`}>
                                    <p className='text-[14px]'>
                                    Rudra Devi
                                    </p>
                                    <p className='text-[12px]'>rudra.devi@gmail.com</p>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                    </div>
            </Drawer>
    </>
  )
}

export default DashboardSidebar