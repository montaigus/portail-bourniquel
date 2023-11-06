export default function Regles(): JSX.Element {
  return (
    <>
      <div className="regle_container"></div>
    </>
  );
}

type SingleRegleProps = {
  title: string;
  content: string;
};

function SingleRegle(props: SingleRegleProps): JSX.Element {
  return (
    <>
      <div className="regle_title">{props.title}</div>
      <div className="regle_content">{props.content}</div>
    </>
  );
}
