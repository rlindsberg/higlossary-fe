import { styled } from "../stitches.config";
import { Link } from "react-router-dom";
import useIsDesktop from "../hooks/useIsDesktop";
import { Term, Definition } from "../types/SearchResultTypes";

const StyledCard = styled("div", {
  border: "1px solid #CBCBCB",
  padding: "15px",
  borderRadius: "15px",
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#FFFFFF",
  "@md": { padding: "30px", height: "210px" },
  "&:hover": {
    backgroundColor: "rgba(255, 0 ,150, 0.03)",
    border: "1px solid #FF0096",
  },
});

const StyledTerm = styled("h3", {
  fontSize: "24px",
  fontWeight: 600,
  margin: "0 0 8px",
  color: "#FF0096",
  width: "fit-content",
});

const NumOfDefinitions = styled("span", {
  fontSize: "18px",
  fontWeight: 500,
  color: "#333333",
  width: "fit-content",
});

const TermDefinition = styled("p", {
  fontSize: "18px",
  fontWeight: 300,
  lineHeight: "26px",
  margin: "15px 0 0",
  color: "#333333",
  width: "fit-content",
  overflow: "hidden",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": 3,
});

const Btn = styled(Link, {
  fontSize: "18px",
  fontWeight: 500,
  margin: 0,
  color: "#333333",
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  marginTop: "16px",
});

const StyledListCard = styled(StyledCard, {
  flexDirection: "column",
  maxWidth: "1428px",
  padding: "15px 22px",
  justifyContent: "center",
  "@md": { height: "76px" },
  "@lg": {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  "&:hover": {
    backgroundColor: "rgba(255, 0 ,150, 0.03)",
    border: "1px solid #FF0096",
  },
});

const ListWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  "@lg": {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});

const ListTerm = styled(StyledTerm, {
  marginBottom: "12px",
  "@lg": {
    margin: "0 12px 0 0",
    width: "304px",
  },
});

const ListDefinition = styled(TermDefinition, {
  margin: 0,
  "@lg": {
    maxWidth: "684px",
    marginLeft: "100px",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 1,
  },
});

interface CardProps {
  content: Term;
}

const sortedDefinitions = (definition: Definition[]) => {
  const sorted = definition.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sorted[0];
};

export const Card = ({ content }: CardProps) => {
  const latestDefinition = sortedDefinitions(content.definitions);

  return (
    <StyledCard>
      <div>
        <StyledTerm>{content.term}</StyledTerm>
        {content.definitions.length > 0 && (
          <NumOfDefinitions css={{ flexWrap: "nowrap" }}>
            +{" "}
            {content.definitions.length > 1
              ? `${content.definitions.length} more definitions`
              : `${content.definitions.length} more definition`}
          </NumOfDefinitions>
        )}
        {content.definitions.length > 0 && (
          <TermDefinition>{latestDefinition?.description}</TermDefinition>
        )}
      </div>
      <Btn to="/">Read more</Btn>
    </StyledCard>
  );
};

export const ListCard = ({ content }: CardProps) => {
  const [isDesktop, setIsDesktop] = useIsDesktop();

  const latestDefinition = sortedDefinitions(content.definitions);

  return (
    <StyledListCard>
      <ListTerm>{content.term}</ListTerm>
      <ListWrapper>
        <NumOfDefinitions css={{ flexWrap: "nowrap" }}>
          +{" "}
          {content.definitions.length > 1
            ? `${content.definitions.length} more definitions`
            : `${content.definitions.length} more definition`}
        </NumOfDefinitions>
        {isDesktop && (
          <ListDefinition style={{ marginRight: "auto" }}>
            {latestDefinition?.description}
          </ListDefinition>
        )}
        <Btn css={{ margin: "0 0 0 8px" }} to="/">
          Read more
        </Btn>
      </ListWrapper>
    </StyledListCard>
  );
};
