import "./AboutUsImageContent.scss"
import ceoImage from '../Images/company-members/Ceo.jpeg'
import boardDirectorImage from '../Images/company-members/Board-director.jpeg'
import cmdImage from '../Images/company-members/InayatSaitCMD.jpeg'
import { useEffect } from "react";
import "aos/dist/aos.css"
import Aos from "aos"


const AboutUsImageContent = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 }); // Remove `once: true` for continuous animations
        console.log('aos')
    }, []);

    return (
        <div>
            <div>
                <h2>Our Leaders</h2>
            </div>
            <div className="about-company-container">
                <section className="flex-reverse book">
                    <div className="cover">
                        <img src={cmdImage} alt="Inayath Sait CMD" />
                        <h4>INAYAT SAIT - CMD</h4>
                    </div>
                    <div className="message msg-1">
                        <p>At AssetsGlobal, we are committed to crafting transformative living experiences through sustainable, innovative, and high-quality real estate development. My vision as CMD is to lead our company in delivering architecturally stunning properties that are environmentally responsible and socially inclusive. Our dedication to excellence drives us to continuously evolve, embracing the latest technologies and best practices. We measure our success by the lasting value we create for our clients and the communities we serve. Thank you for being part of our journey toward a brighter, more sustainable future.</p>
                        <h4>CMD's Message</h4>
                    </div>
                </section>
                <section className="flex-reverse book" data-aos='flip-right'>
                    <div className="cover">
                        <img src={ceoImage} alt="OMAR CEO" />
                        <h4>OMAR SAIT - CEO</h4>
                    </div>
                    <div className="message msg-1">
                        <p>As the CEO of AssetsGlobal, I am committed to steering our company towards excellence in the real estate sector. Our focus is on delivering top-notch properties that meet and exceed client expectations. By prioritizing quality, integrity, and innovation, we ensure every project reflects our dedication to creating exceptional living spaces. I am proud of our team’s unwavering commitment to providing unparalleled value and service in the real estate market.</p>
                        <h4>CEO's message</h4>
                    </div>
                </section>
                <section className="flex-normal book" data-aos='flip-left'>
                    <div className="cover">
                        <img src={boardDirectorImage} alt="Anees Board Director" />
                        <h4>ANEES ANTAPUR - Business Director</h4>
                    </div>
                    <div className="message msg-2">
                        <p>As the Business Director at AssetsGlobal, I am dedicated to leading our team in delivering exceptional real estate solutions. With a strong focus on quality and client satisfaction, I ensure that our properties meet the highest standards. My role involves overseeing projects, fostering relationships, and driving innovation to provide the best value in the real estate market.</p>
                        <h4>Business Director's message</h4>
                    </div>
                </section>

            </div>
        </div>
    )
}
export default AboutUsImageContent