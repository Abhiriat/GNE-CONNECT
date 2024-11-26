import { team } from "../../dummydata";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const TeamCard = () => {
  return (
    <>
      {team.map((val, index) => (
        <div className="items shadow" key={index}>
          <div className="img">
            <img src={val.cover} alt={val.name} />
            <div className="overlay">
              {/* LinkedIn icon with unique link */}
              <a
                href={val.linkedin}
                target="_parent"
                rel="noopener noreferrer"
                className="icon"
              >
                <FaLinkedinIn />
              </a>
              {/* Instagram icon with unique link */}
              <a
                href={val.instagram}
                target="_parent"
                rel="noopener noreferrer"
                className="icon"
              >
                <FaInstagram />
              </a>
              {/* GitHub icon with unique link */}
              <a
                href={val.github}
                target="_parent"
                rel="noopener noreferrer"
                className="icon"
              >
                <FaGithub />
              </a>
            </div>
          </div>
          <div className="details">
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TeamCard;