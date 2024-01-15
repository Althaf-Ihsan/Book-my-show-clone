import React from 'react'

function EventSection() {
    const liveList = [
        { id: 1, path: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/workshop-and-more-web-collection-202211140440.png" },
        { id: 2, path: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-NiBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/comedy-shows-collection-202211140440.png" },
        { id: 3, path: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-OCBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/music-shows-collection-202211140440.png" },
        { id: 4, path: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00358814-qdsvqrzdkc-portrait.jpg", title: "Painter", genre: "Punjabi" },
        { id: 5, path: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00328344-azdqbdyvgp-portrait.jpg", title: "Mahi Mera Nikka Jeha", genre: "Punjabi" },
        { id: 6, path: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00377403-mbpagsclmm-portrait.jpg", title: "winter tide", genre: "English" },
        { id: 7, path: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00378434-btbevcfynp-portrait.jpg", title: "Miracle Club", genre: "English" },
        { id: 8, path: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_exclusive_v1.png,t-false,lfo-bottom_left,l-end/et00378647-raywygtcah-portrait.jpg", title: "Leila's Brotthers", genre: "persian" }
    ]
    return (
        <>
            <div className='flex flex-col px-[63px] pb-[66px]'>
                <h2 className='live-text'>The Best Of Live Events</h2>
                <div className=' mt-[15px] event-card'>
                    {liveList.slice(0, 3).map(({ id, path }) => <div key={id} className='cursor-pointer '><img className="" src={path} /></div>)}
                </div>
            </div>
            <div className='bg-premiere pl-[63px]'>
                <div>
                    <img className='' src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-banner-web-collection-202208191200.png" />
                </div>
                <div className='flex flex-col pt-[43px]'>
                    <h2 className="premiere-text font-Roboto">Premieres</h2>
                    <div className="font-Roboto brand-text">Brand new releases every Friday</div>
                </div>
                <div className='premiere-card pb-[22px]'>
                    {liveList.slice(3, 8).map(({ id, path ,genre,title}) => <div key={id} className='cursor-pointer '><img className="" src={path} />
                    <div className='premiere-title font-Roboto pt-1 capitalize'>
                         {title}
                    </div>
                    <div className='font-Roboto text-white capitalize text-[16px]'>
                    {genre}
                    </div>
                    </div>)}
                </div>
            </div>
        </>


    )
}

export default EventSection