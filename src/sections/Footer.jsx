import React from 'react'
import FooterBlinker from '../utils/FooterBlinker'

const Footer = () => {
  return (
    <section className='w-screen  h-[70vh] relative z-50 py-4 rounded-t-[4%] bg-black text-white'>
        <div className=' mx-24 max-tablet:mx-5 pt-10 flex justify-between'>
            <div className='republica tracking-wider text-7xl  flex  flex-col max-tablet:text-5xl max-phone:text-4xl'>
                <span>UBED</span>
                <span>KHAN</span>
            </div>
            <div className='flex gap-5 max-phone:gap-2'>
            <div className='flex h-full justify-between gap-3 text-sm max-tablet:text-xs flex-col max-phone:text-xs'>
                <div>
                <h4 className='text-lg republica max-tablet:text-sm max-phone:text-xs'>Socials</h4>
                </div> 
                <div className='flex gap-2 flex-col max-tablet:gap-1'>
                <span><a href="https://www.instagram.com/not.ur_ubed/">Instagram</a></span>
                <span><a href="https://www.linkedin.com/in/ubed-khan-93220a22a/">LinkedIn</a></span>
                <span><a href="">X</a></span>
                <span><a href="https://github.com/khanubed">Github</a></span>
                </div>
                
            </div>
            <div className='flex h-full justify-between w-40 text-sm max-tablet:text-xs flex-col '>
                <div>
                <h4 className='text-lg republica max-tablet:text-sm max-phone:text-xs '>Contact</h4>
                </div> 
                <div className='flex gap-2 flex-col'>
                <span>ubedkhan7529@gmail.com</span>
                <span>9589547529</span>
                <span>📍 Navlakhka , Indore (452001) , India</span>
                
                </div>
                
            </div>
            </div>
            
        </div>
        <div className='bg-black mt-8'>
            <FooterBlinker></FooterBlinker>
        </div>
    </section>
  )
}

export default Footer