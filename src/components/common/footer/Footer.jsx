import { blog } from "../../../dummydata";
import "./footer.css";

const Footer = () => {
  return (
    <>
      {/* ... (other parts of your Footer) */}
      <footer>
        <div className="container padding">
          {/* ... (other boxes in the footer) */}
          <div className="box">
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val) => (
              <div className="items flexSB" key={val.id}> {/* Key prop added */}
                <div className="img">
                  <img src={val.cover} alt="" />
                </div>
                <div className="text">
                  <span>
                    <i className="fa fa-calendar-alt"></i>
                    <label htmlFor="">{val.date}</label>
                  </span>
                  <span>
                    <i className="fa fa-user"></i>
                    <label htmlFor="">{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          {/* ... (rest of the footer) */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
