import "../styles/components/PageButton.css";
import { Page, YELLOW } from "../constants";

interface PageButtonProps {
  page: Page;
  selectedPage: Page;
  handlePageToggle: any;
}

const PageButton = ({
  page,
  selectedPage,
  handlePageToggle,
}: PageButtonProps) => {
  return (
    <button
      className="toggleButton"
      style={{
        backgroundColor: selectedPage === page ? YELLOW : "white",
      }}
      onClick={() => handlePageToggle(page)}
    >
      <span style={{ fontSize: 18 }}>{page}</span>
    </button>
  );
};

export default PageButton;
