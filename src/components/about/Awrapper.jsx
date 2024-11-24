import { awrapper } from "../../dummydata";

const Awrapper = () => {
  return (
    <>
      <section className="awrapper">
        <div className="container grid">
          {awrapper.map((val) => ( // Add index parameter
            <div className="box flex" key={val.id}> {/* Add key prop here */}
              <div className="img">
                <img src={val.cover} alt="" />
              </div>
              <div className="text">
                <h1>{val.data}</h1>
                <h3>{val.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Awrapper;
