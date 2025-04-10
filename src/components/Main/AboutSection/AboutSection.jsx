import "./AboutSection.css";

function AboutSection() {
  return (
    <section className="about-section">
      <h2 className="about-section__heading">About the author</h2>
      <p className="about-section__body">
        This block describes the project author. Here you should indicate your
        name, what you do, and which development technologies you know.
        <br /> <br />
        You can also talk about your experience with TripleTen, what you learned
        there, and how you can help potential customers.
      </p>
    </section>
  );
}

export default AboutSection;
