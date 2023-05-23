import { FC, useState, useEffect } from "react";
import { styled } from "../stitches.config";
import Dropdown from "../components/Dropdown";
import { ReactComponent as ListView } from "../assets/icons/ListView.svg";
import { ReactComponent as CardView } from "../assets/icons/CardView.svg";
import { Card, ListCard } from "../components/Card";
import useIsDesktop from "../hooks/useIsDesktop";
import SearchForm from "../components/SearchForm";
import { Term } from "../types/SearchResultTypes";
import AddTerm from "../components/AddTerm";

const sortingOption = [
  { value: "all", option: "All" },
  { value: "term", option: "Latest term" },
  { value: "definition", option: "Latest definition" },
];

const Container = styled("div", {
  padding: "0 16px",
  "@md": {
    maxWidth: "1428px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const HeadingWrapper = styled("div", {
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  marginTop: "65px",
  "@md": { marginTop: "111px" },
});

const Heading = styled("h1", {
  fontWeight: 600,
  fontSize: "40px",
  margin: "0 0 16px",
});

const SubHeading = styled("h2", {
  fontWeight: 400,
  fontSize: "18px",
  margin: 0,
  width: "200px",
  lineHeight: "27px",
  "@md": { width: "387px" },
});

const SearchWrapper = styled("div", {
  marginBottom: "117px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@md": { width: "559px" },
});

const SortWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  width: "100%",
});

const ViewButton = styled("button", {
  all: "unset",
  cursor: "pointer",
});

const CardContainer = styled("ul", {
  flexWrap: "wrap",
  width: "100%",
  listStyle: "none",
  margin: 0,
  padding: 0,
  justifyContent: "center",
});

const ViewWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
});

const ViewText = styled("span", {
  margin: "0 16px",
  fontSize: "21px",
});

const ListItem = styled("li", {
  marginRight: "14px",
  width: "440px",
});

const StyledSearchResult = styled("p", {
  color: "#333333",
  fontSize: "24px",
  fontWeight: "500",
});

const StyledSearchResultNotFound = styled("p", {
  color: "#333333",
  fontSize: "21px",
  fontWeight: "300",
});

const AddTermButton = styled("button", {
  border: "none",
  background: "none",
  fontSize: "21px",
  fontWeight: "300",
  textDecoration: "underline",
  cursor: "pointer",
});

const Main: FC<any> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Term[]>([]);
  const [listView, setListView] = useState(false);
  const [showAddNewTermDialog, setShowAddNewTermDialog] = useState(false);
  const [isDesktop] = useIsDesktop();
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchClicked(true);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetch(`http://test.higlossary.site:8080/term/search?term=${searchTerm}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.status === 200 ? response.json() : [];
        })
        .then((res: Array<Term>) => {
          setSearchResult(res);
        })
        .catch((error: any) => console.log(error));
    }
  }, [searchTerm]);

  return (
    <Container>
      <HeadingWrapper>
        <Heading>Search term</Heading>
        <SubHeading>Explore and understand new terminology</SubHeading>
      </HeadingWrapper>
      <SearchWrapper>
        <SearchForm onSubmit={handleSearch} />
      </SearchWrapper>
      {searchClicked &&
        (searchResult.length === 0 ? (
          <StyledSearchResultNotFound>
            No term with exact match, do you want to
            <AddTermButton onClick={() => setShowAddNewTermDialog(true)}>
              add a new term?
            </AddTermButton>
            <AddTerm
              isOpen={showAddNewTermDialog}
              onClose={() => setShowAddNewTermDialog(false)}
              term={searchTerm}
            />
          </StyledSearchResultNotFound>
        ) : (
          <StyledSearchResult>
            Found {searchResult.length} definition
            {searchResult.length > 1 && <span>s</span>} with "{searchTerm}"
          </StyledSearchResult>
        ))}
      {searchResult.length > 0 && (
        <SortWrapper>
          <Dropdown
            variant="sorting"
            options={sortingOption}
            defaultValue="term"
          />
          <ViewButton onClick={() => setListView(!listView)}>
            <ViewWrapper>
              {listView ? <ListView /> : <CardView />}
              {isDesktop && (
                <ViewText>{listView ? "List view" : "Card view"}</ViewText>
              )}
            </ViewWrapper>
          </ViewButton>
        </SortWrapper>
      )}
      <CardContainer
        style={{
          display: listView ? "flex" : "block",
          flexDirection: listView ? "row" : "column",
        }}
      >
        {searchResult.slice(0, 6).map((item) => {
          return listView ? (
            <ListItem key={item.uuid}>
              <Card content={item} />
            </ListItem>
          ) : (
            <li key={item.uuid}>
              <ListCard content={item} />
            </li>
          );
        })}
      </CardContainer>
    </Container>
  );
};

export default Main;
