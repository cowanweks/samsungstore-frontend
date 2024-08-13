import { FaEnvelope, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi2"



export default function Footer() {

	const email = "samsungphonesandspairecentre@gmail.com"
	const message = `mailto:${email}?subject=Interested in Samsung Phones&body=Hello%20Can%20I%20get%20to%20kow%20about%20the%20Phones%20please!`


	return (
		<section id='Footer'
			className='
			flex justify-around
		p-16 bg-gradient-to-r
		 bg-gray-950 flex-col md:flex-row md:justify-center gap-y-6
		 '>
			<div className="categories flex-1">
				<h2 className="text-lg text-white">PRODUCT CATEGORIES</h2>
				<ul className='flex flex-col gap-2 pt-2'>
					<li className=""><a style={{ textDecoration: 'none' }} href="/shop?category=phone" className='text-[#ff7701] hover:text-white'>SmartPhones</a></li>
					<li className=""><a style={{ textDecoration: 'none' }} href="/shop?category=accessory" className='text-[#ff7701] hover:text-white'>Accessories</a></li>
					<li><a style={{ textDecoration: 'none' }} href="/shop?category=covers_protectors" className='text-[#ff7701] hover:text-white'>Covers & Protectors</a></li>
					<li><a style={{ textDecoration: 'none' }} href="/shop?category=lifestyle" className='text-[#ff7701] hover:text-white'>Lifestyle</a></li>
				</ul>
			</div>
			<div className="contact flex-1">
				<h2 className="text-lg text-white">CONTACT US</h2>
				<ul className='flex flex-col gap-2 pt-2'>
					<li className="">
						<a target='_blank' href="tel:+254724000144" style={{ textDecoration: 'none' }} className='flex items-center gap-x-2 text-[#ff7701] hover:text-white'>
							< HiPhone />
							<span className="">+254 724 000 144</span>
						</a>
					</li>
					<li >
						<a target='_blank' href={message}
							style={{ textDecoration: 'none' }} className='flex items-center gap-x-2 text-[#ff7701] hover:text-white'>
							<FaEnvelope />
							<span className="">samsungphonesandspairecentre@gmail.com</span>
						</a>
					</li>
					<li>
						<a target='_blank' href="https://facebook.com" style={{ textDecoration: 'none' }} className='flex items-center gap-x-2 text-[#ff7701] hover:text-white'>
							<FaXTwitter />
							<span className="">@samsungphoneandsparecenter</span>
						</a>
					</li>
					<li>
						<a target='_blank' href="https://instagram.com" style={{ textDecoration: 'none' }} className='flex items-center gap-x-2 text-[#ff7701] hover:text-white'>
							<FaInstagram />
							<span className="">Instagram</span>
						</a>
					</li>
					<li>
						<a target='_blank' href="https://linkedin.com" style={{ textDecoration: 'none' }} className='flex items-center gap-x-2 text-[#ff7701] hover:text-white'>
							<FaLinkedin />
							<span className="">LinkedIn</span>
						</a>
					</li>
				</ul>
			</div>
		</section>);
}