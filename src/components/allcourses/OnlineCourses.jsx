import React from "react";
import "./courses.css";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";
import { Link } from "react-router-dom"; // Import Link

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
        <div className='container'>
          <Heading subtitle='COURSES' title='Browse Our Online Courses' />
          <div className='content grid3'>
            {online.map((val) => (
              <div className='box' key={val.courseName}> {/* Add key prop */}
                <div className='img'>
                  <img src={val.cover} alt={val.courseName} />
                  <img src={val.hoverCover} alt={`${val.courseName} Hover`} className='show' />
                </div>
                <h1>{val.courseName}</h1>
                
                <Link to={val.readlink}>Read More</Link> {/* Add the link */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineCourses;

