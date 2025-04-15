import "./AboutSection.css";
import headshot from "../../../assets/headshot-temp.jpeg";

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-section__text-content">
        <h2 className="about-section__heading">About the author</h2>
        <p className="about-section__body">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
          <br /> <br />
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
      <img
        className="about-section__headshot"
        src={headshot}
        alt="picture of author"
      />
    </section>
  );
}

export default AboutSection;
