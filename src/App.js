import Header from "./layouts/Header";
import Content from "./layouts/Content";
import Footer from "./layouts/Footer";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Header />
      <Content />
      <Footer />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  font-size: 18px;
  display: flex;
  color: black;
  flex-direction: column;
  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
`;
