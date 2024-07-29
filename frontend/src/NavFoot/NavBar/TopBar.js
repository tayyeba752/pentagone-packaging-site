import { ImLocation } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import "./TopBar.css";

const TopBar = () => {

    return (
        <>
            <section className='top-mail' id='to-top'>
                <div className="container">
                    <div className='to-top'>
                        <div className="to-mail1">
                            <a href="https://www.facebook.com/profile.php?id=100090223065841&mibextid=LQQJ4d" target='_rizwan'> <img src="img/facebook.png" style={{ width: "30px" }} alt='Facebook Socail Icon' /></a>
                            &nbsp;&nbsp;  <a href="https://instagram.com/dibig_official?igshid=YmMyMTA2M2Y=" target='_rizwan'><img src="img/instagram.png" style={{ width: "30px" }} alt='instagram Socail Icon' /></a>
                            &nbsp;&nbsp;  <a href="https://www.linkedin.com/company/dibig/" target='_rizwan'><img src="img/linkedin.png" style={{ width: "30px" }} alt='linkedin Socail Icon' /></a>
                        </div>
                        <div className="to-mail"><small>  <ImLocation /> United Kingdom | United States Of America | United Arab Emirates | Australia</small> </div>
                        <div className="to-mail"><AiOutlineMail /> <a href="mailto:services@dibigllc.com">services@dibigllc.com</a> </div>
                        <div className="to-mail"><BsPhone /><a href="tel:+19723470344"> +1 972 347 0344</a></div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default TopBar;