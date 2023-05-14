const Menu = ({ page }) => {
  if (page === "welcome")
    return (
      <Section>
        <h1>Welcome</h1>
        <p>
          Leap into the meme madness with FrogZilla! Our token is all about
          laughter, memes, and a wild crypto ride.
        </p>
      </Section>
    );
  if (page === "about")
    return (
      <Section>
        <h1>About</h1>
        <p>
          FrogZilla: a meme token with zero utility and infinite fun. Join our
          whimsical adventure in the crypto universe.
        </p>
      </Section>
    );
  if (page === "tokenomics")
    return (
      <Section>
        <h1>tokenomics</h1>
        <p>
          Our simple and fun tokenomics: <br />
          Total Supply: 1 Quadrillion FrogZilla tokens Distribution: 60% Burned,
          30% for Liquidity, 10% for Community Transaction Tax: 5% (4% to
          holders, 1% to community events)
        </p>
      </Section>
    );
  if (page === "Join the Voyage")
    return (
      <Section>
        <h1>Join the Voyage</h1>
        <p>
          Hop aboard the FrogZilla boat! We're here for the laughs, camaraderie,
          and shared meme madness.
        </p>
      </Section>
    );
  if (page === "Connect with Us")
    return (
      <Section>
        <h1>Connect with Us</h1>
        <p>
          Stay updated on our wild ride. Follow us on [social media logos/links
          here] and join the FrogZilla family!
        </p>
      </Section>
    );
};

export default Menu;

const Section = ({ children }) => {
  return <section className={""}>{children}</section>;
};
